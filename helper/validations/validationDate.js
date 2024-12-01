import React, { useState } from 'react';

// parte hecha por JJ
export function validateDate(inputDate) {

    const dateFormat = /^\d{4}\/\d{2}\/\d{2}$/;

    if (!dateFormat.test(inputDate)) {
      return false;
    }
  
    
    // Separar la fecha en año, mes y día
    const [year, month, day] = inputDate.split('/');
    // Verificar si la fecha es válida
   
    const parsedDate = new Date(`${year}-${month}-${day}`);
    return !isNaN(parsedDate.getTime());
    
 }