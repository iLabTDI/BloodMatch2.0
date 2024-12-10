//conexion con supabase, igualmente se puede utilizar desde internet tutorial de youtube

import { ExpoConfig, ConfigContext } from "expo/config";
import * as dotenv from "dotenv";

dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    slug: "blood2",
    name: "blood2",
    extra: {
      ...config.extra,
      supabaseUrl: process.env.Project_URL,
      supabaseAnonKey: process.env.Project_KEY,
      google: process.env.GoogleAPI,
    },
  };
};
