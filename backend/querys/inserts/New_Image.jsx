// i've created a function to save the image url (rauf:))
let globalData = {}; 

export const setGlobalImage = (key, value) => {
   
  globalData[key] = value; //save the url 
};

export const getGlobalImage = (key) => {
  //console.log("esto tiene el get global images",globalData[key])
  return globalData[key]; // return the dates 
};
