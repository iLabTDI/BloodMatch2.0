
//helper para el cambio de idioma creado por JJ, este junto con los 2 .json (len_en, len_esp)
import i18next from "i18next";
import { Translation, initReactI18next } from "react-i18next";
import len_en from "../helper/len_en.json"
import len_esp from "../helper/len_esp.json"

//intercambia entre español e ingles el tecto que se encuentra en las pantallas.

export const language_resources = {
    len_esp: {translation: len_esp},
    len_en: {translation: len_en}
}

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'len_esp',
    fallbacklng: 'len_esp',
    resources: language_resources,
})

export default i18next;