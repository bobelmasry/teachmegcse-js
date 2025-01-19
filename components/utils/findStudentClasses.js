import { supabase } from '../utils/supabase';

export default async function findStudentClasses( studentId ) {
  try {
    // Fetch all class objects from the 'classes' table
    const { data: allClasses, error } = await supabase.from('classes').select('*');

    if (error) {
      console.error('Error fetching class data:', error);
      return [];
    }

    // Filter out the classes where the studentId is present in the 'students' array
    const studentClasses = allClasses.filter((classObj) => {
      const studentsArray = classObj.students || []; // Handle 'null' students property
      return studentsArray.includes(studentId);
    });

    return studentClasses;
  } catch (error) {
    console.error('Error finding student classes:', error);
    return [];
  }
}