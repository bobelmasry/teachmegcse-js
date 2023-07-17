import { supabase } from 'utils/supabase';

export async function updateSupabase(object, table, field, user, field2Filter, field2Filter2, hasFilter, isUserId) {
  const userIdKey = isUserId ? 'user_id' : 'id';

  const { data: existingData, error: existingError } = await supabase
    .from(table)
    .select(field)
    .eq(userIdKey, user.id)
    .single();

  if (existingError) {
    console.error(`Error retrieving existing ${field}:`, existingError);
    return;
  }

  const newData = { ...existingData };
  const data2 = newData[field] || [];

  if (hasFilter) {
    newData[field] = data2.filter((entry) => entry[field2Filter] !== field2Filter2);
  } else {
    newData[field] = [...data2, object];
  }

  const { data, error } = await supabase
    .from(table)
    .update(newData)
    .eq(userIdKey, user.id);

  if (error) {
    console.error(`Error updating ${field}:`, error);
    return;
  }

  console.log(`${field} updated successfully!`);
}
