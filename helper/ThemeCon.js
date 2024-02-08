//crar el context para poder utilizar el dark mode en las pantallas por JJ

import React, {createContext} from "react";
 
const themeContext = createContext({
    background: 'defaultBackgroundValue'
});

export default themeContext;