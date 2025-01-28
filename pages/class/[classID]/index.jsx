"use client"

import { useState, useEffect, useRef } from 'react'
import { useUser, useSession } from '@supabase/auth-helpers-react'
import Head from 'next/head';
import Navbar from "@/components/navbar.jsx"
import Headstuff from "@/components/headstuff.jsx"
import "flowbite"
import { supabase } from '@/components/utils/supabase';
import SideBarHome from "@/components/classes/SideBarHome.tsx"
import findStudentClasses from '@/components/utils/findStudentClasses.js'
import { Input, Button } from '@chakra-ui/react'
import { format as timeagoFormat } from 'timeago.js';

 export default function ClassPage({ classData }) {
  const [classes, setClasses] = useState([])

  const user = useUser()
  const session = useSession()
  const [assignments, setAssignments] = useState([])
  const [isTeacher, setIsTeacher] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const handleChange = (event) => setInputValue(event.target.value)

  useEffect(() => {

    async function getAssignments() {
      let { data, error, status } = await supabase
        .from('assignments')
        .select(`*`)
        .eq('classID', classData[0].classID)

        setAssignments(data);
  }
    getAssignments()
    async function getInitial() {
      if (user && user.id) {
        if (user.id === classData[0].user_id) {
          setIsTeacher(true)
        }
      }
    }
    getInitial()
  }, [classData, user]);

  useEffect(() => {
    async function getClasses(){
      if (session && session.user){
      const userId = session.user.id
      if (isTeacher) {
        const { data: classesData, error: classesError } = await supabase
              .from('classes')
              .select('*')
              .eq('user_id', userId);
    
      setClasses(classesData)
      }
      else if (!isTeacher) {
        const studentClasses = await findStudentClasses(userId);
        setClasses(studentClasses)
      }
    }
  }
    getClasses()
  }, [classData, assignments] 
)

  const [messages, setMessages] = useState([]);
  const [usernameDictionary, setUsernameDictionary] = useState({});  // Initialize username dictionary state

  // Subscribe to real-time updates from the 'messages' table
  useEffect(() => {
    async function getInitialMessages() {
      try {
        let { data, error, status } = await supabase
          .from('messages')
          .select(`*`)
          .eq('classID', classData[0].classID);
        if (error) {
          throw error;
        }
        setMessages(data);
      } catch (error) {
        console.error('Error fetching initial messages:', error);
      }
    }
    getInitialMessages();
  
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
        },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .subscribe();
  }, [user, assignments]);

  useEffect(() => {
    // Fetch usernames for messages
    async function fetchUsernamesForMessages() {
      for (let i = 0; i < messages.length; i++) {
        const userID = messages[i]['userID'];
        if (!usernameDictionary[userID]) {
          try {
            const { data, error } = await supabase
              .from('profiles')
              .select('username')
              .eq('id', userID);
            if (error) {
              throw error;
            }
            setUsernameDictionary((prevDictionary) => ({
              ...prevDictionary,
              [userID]: data[0]?.username || 'Loading',
            }));
          } catch (error) {
            console.error('Error fetching username:', error);
            setUsernameDictionary((prevDictionary) => ({
              ...prevDictionary,
              [userID]: 'Loading',
            }));
          }
        }
      }
    }

    // Call the function to fetch usernames
    fetchUsernamesForMessages();
  }, [assignments, messages]
)

  async function updateMessages(message) {
    if (message != ''){
    // Insert the message into the 'messages' table
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          classID: classData[0].classID,  // Make sure 'classID' is defined and valid
          messageText: message,
          userID: user.id
        },
      ]);
      setInputValue('')
  
    // Check for errors and handle them if necessary
    if (error) {
      console.error('Error inserting message:', error);
    } else {
      // Insertion successful
      console.log('Message inserted successfully:', data);
    }
  }
  }

    const title = `${classData[0].name} | exceed`
        
    return (
        <>
        <Head>
            <title>{title}</title>
            <meta name="description" content="Class"></meta>
            <meta name="keywords" content="exceed, teach me gcse, A-level revision notes, A-level past papers, A-level topic questions, 
            A-level math past papers, A-level physics past papers, A-level chemistry past papers"></meta>
            <Headstuff />
        </Head>
        <Navbar session={session} />
        <SideBarHome isTeacher={isTeacher} classData={classData} assignments={assignments} classes={classes} user={user} />
        <div className="flex justify-center">
          <div className="sm:w-1/2 w-10/12 h-[calc(100vh-12rem)] flex flex-col justify-end">
          <div className='flex flex-col mb-4' style={{ maxHeight: '35rem', overflowY: 'auto'}}>
            {messages.map((message) => {
              const username = usernameDictionary[message.userID] || 'Loading';
              return (
                <div key={message.id} className="bg-blue-600 text-white mt-2 border-gray-200 border p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-md font-medium">{username}</p>
                  <p className="text-sm font-medium">{timeagoFormat(message.created_at)}</p>
                </div>
                <p className="text-lg font-bold text-white">{message.messageText}</p>
              </div>
                        );
            })}
          </div>
            <div className="flex">
            <Input onChange={handleChange} value={inputValue} color={'black'} bg={'white'} placeholder='Enter Text' />
            <Button colorScheme='blue' onClick={() => updateMessages(inputValue)}  className="ml-2 mr-1 mb-1 cursor-pointer ease-out transition-all"> Send</Button>
            </div>
          </div>
        </div>
        </>
    )
}


export async function getServerSideProps({ params }) {
  let { data } = await supabase
    .from('classes')
    .select(`*`)
    .eq('classID', params.classID);

  if (data.length === 0) {
    throw new Error('Class not found');
  }
  
  const classData = data;

  return {
    props: { classData },
  };
}