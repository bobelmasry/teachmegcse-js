import React from 'react';
import Link from "next/link"
import { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';
import { useUser } from '@supabase/auth-helpers-react'

const Table = ({ papers, letter, type }) => {
  // type is A-level or IGCSE
  // letter signifier whether its f/m or m/j or o/n
  // and yeah i did all this to save my ass from python
  // it will probably be fixed and removed before july
  const [arr, setArr] = useState([]);
  const [papersSolved, setPapersSolved] = useState([]);
  const [initialGotten, setinitialGotten] = useState(false)
  const user = useUser()

  useEffect(() => {
    const updatedArr = [];
    for (let i = 0; i < papers.length; i++) {
      const paperName = papers[i].slug;
      const msName2 = paperName.replace("qp", "ms");
      updatedArr.push({ id: i, msName: msName2 });
    }
    setArr(updatedArr);
    async function getPapersSolved () {
      if (!initialGotten){
      if (user && user.id) {
      const { data: existingData, error: existingError } = await supabase
            .from('papersSolved')
            .select('*')
            .eq('user_id', user.id)
        
          if (existingError) {
            console.error('Error retrieving existing papersSolved:', existingError);
            return;
          }

          if (existingData) {
            setPapersSolved(existingData)
            setinitialGotten(true)
          }
    }}}
    getPapersSolved()
  }, [initialGotten, papers, papersSolved, user]);
  
  return (
    <div className="mt-10 md:w-3/5 lg:w-1/4 w-10/16">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-400 bg-gray-500">
          <thead className="text-xs bg-slate-800 text-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 bg-slate-600 text-2xl lg:text-3xl">
                Paper Name
              </th>
            </tr>
          </thead>
          <tbody>
          {papers.map((paper, j) => {
          const isSolved = Array.isArray(papersSolved) ? papersSolved.filter(p => p.PaperName.toString() === paper.slug.toString()) : [];
            let alreadySolved = false
            alreadySolved = ((isSolved?.length === 0) || (isSolved?.length === undefined)) ? false : true

          return (
            ((paper.slug.toString().charAt(5) === letter) && (paper.isMs.toString() === 'False')) && (paper.hasSolve.toString() == 'True') && (
              <tr key={paper.slug}>
                <td className="flex flex-wrap px-2 text-xl md:text-3xl lg:text-3xl py-4 whitespace-nowrap text-white font-bold">
                  {paper.name}
                  <div className="flex gap-2 md:gap-0">
                    {((paper.hasSolve.toString() == 'True') && (alreadySolved === false)) && (
                      <Link href={`/${type}/${paper.subjectName}/past-papers/${paper.year}/${paper.slug}/solve`}>
                        <button
                          id='Submit'
                          className="md:ml-8 ml-4 rounded border border-blue-500 bg-blue-600 px-8 md:px-10 py-1 text-sm md:text-lg lg:text-xl font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring active:text-slate-300"
                        >
                          Solve
                        </button>
                      </Link>
                    )}
                    {((paper.hasSolve.toString() == 'True') && (alreadySolved === true) && (isSolved)) && (
                      <>
                          <button
                            id='Submit'
                            className="md:ml-8 mt-4 ml-4 rounded border border-blue-500 bg-blue-600 px-8 md:px-10 py-1 text-sm md:text-lg lg:text-xl font-medium text-white focus:outline-none"
                          >
                            {isSolved[0].Score} / {isSolved[0].numOfQuestions}
                          </button>
                      <Link href={`/${type}/${paper.subjectName}/past-papers/${paper.year}/${paper.slug}/solve`}>
                      <button
                        id='Submit'
                        className="md:ml-8 mt-4 rounded border border-purple-500 bg-purple-600 px-8 md:px-10 py-1 text-sm md:text-lg lg:text-xl font-medium text-white hover:bg-purple-500 focus:outline-none focus:ring active:text-slate-300"
                      >
                        Retry
                      </button>
                    </Link>
                    </>
                    )}
                  </div>
                </td>
              </tr>
            )
          );
        })}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default Table;
