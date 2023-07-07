import { supabase } from 'utils/supabase';

export async function updateSupabase(object, table, field, user, field2Filter, field2Filter2, hasFilter) {
        
    // Retrieve the current value
    const { data: existingData, error: existingError } = await supabase
      .from(table)
      .select(field)
      .eq('id', user.id)
      .single();
  
    if (existingError) {
      console.error(`Error retrieving existing ${field}:`, existingError);
      return;
    }
  
    // Check if existingData is null
    if (existingData[field] === null) {
  
      // Update the field field with the new data
      const { data, error } = await supabase
        .from(table)
        .update({
          [field]: [object]
        })
        .eq('id', user.id);
  
      if (error) {
        console.error(`Error updating ${field}:`, error);
        return;
      }
  
      console.log(`${field} updated successfully!`);
      return;
    }
    else {
      // Filter out existing entries with the same field2Filter
    const data2 = existingData[field];
    if (hasFilter) {
    const filteredData = data2?.filter(entry => ((entry[field2Filter] !== field2Filter2)))
  
    // Add the new entry to the filtered data
    filteredData.push(object);

     // Update the field with the modified data
     const { data, error } = await supabase
      .from(table)
      .update({
        [field]: filteredData,
      })
      .eq('id', user.id);

      if (error) {
        console.error(`Error updating ${field}:`, error);
        return;
      }
    }
    else {
      data2.push(object)

      const { data, error } = await supabase
      .from(table)
      .update({
        [field]: data2,
      })
      .eq('id', user.id);
      if (error) {
        console.error(`Error updating ${field}:`, error);
        return;
      }

    }
    
   console.log(`${field} updated successfully!`);
    }
  }