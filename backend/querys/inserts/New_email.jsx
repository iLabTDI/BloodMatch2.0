

let globalData = {}; 

export const setGlobalData = (key, value) => {
   
  globalData[key] = value; // Guardamos los datos
};

export const getGlobalData = (key) => {
  return globalData[key]; // retornamos los datos que guardamos 
};
