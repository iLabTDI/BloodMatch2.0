import { createClient } from '@supabase/supabase-js'
import { Tables } from './core';

export const supabase = createClient(process.env.SUPABASE_REACT_URL , process.env.SUPABASE_REACT_ANNON_KEY);



export async function insertData(table: Tables, data: any): Promise<boolean>{
    const { error } = await supabase.from('table').insert({ data });

    return !error;
}

