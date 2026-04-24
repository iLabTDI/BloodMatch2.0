import dotenv from "dotenv";
dotenv.config();

//se encarga de obtener la variable de entorno
function getEnvVariable(key: string, req = true): string{
    const value = process.env[key];
        if(req && !value){
            throw new Error(`No se encontro variable: ${key}`)
        }
        return value!;
}

export const env ={
    PORT: getEnvVariable("PORT"),
    SupabaseAuthClient_URL: getEnvVariable("SUPABASE_URL"),
    SupabaseAnon_key: getEnvVariable("SUPABASE_ANON_KEY"),
};
