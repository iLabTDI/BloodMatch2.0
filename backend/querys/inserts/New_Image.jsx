let globalData = {}; 

export const setGlobalImage = (key, value) => {
   
  globalData[key] = value; // Guardamos los datos
};

export const getGlobalImage = (key) => {
  //console.log("esto tiene el get global images",globalData[key])
  return globalData[key]; // retornamos los datos que guardamos 
};
