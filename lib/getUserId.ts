import { supabase } from './supabase';

export const getUserId = async (): Promise<string | null> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user ID:', error);
      return null;
    }
    return user?.id || null;
  } catch (error) {
    console.error('Unexpected error fetching user ID:', error);
    return null;
  }
};