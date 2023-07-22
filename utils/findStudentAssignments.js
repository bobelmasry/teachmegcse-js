import { supabase } from 'utils/supabase';
import findStudentClasses from 'utils/findStudentClasses.js'


export default async function findStudentAssignments(studentId) {
    try {
      // Find the student classes first
      const studentClasses = await findStudentClasses(studentId);
  
      if (studentClasses.length === 0) {
        // No classes found for the student, return empty array
        return [];
      }
  
      // Extract the class IDs from the studentClasses
      const classIds = studentClasses.map((classObj) => classObj.classID);
  
      // Fetch assignments for the student using the classIds array
      const { data: studentAssignments, error } = await supabase
        .from('assignments')
        .select('*')
        .in('classID', classIds);
  
      if (error) {
        console.error('Error fetching student assignments:', error);
        return [];
      }
  
      return studentAssignments;
    } catch (error) {
      console.error('Error finding student assignments:', error);
      return [];
    }
  }