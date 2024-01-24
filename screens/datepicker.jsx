import React, {useState, useContext} from "react";
import { StyleSheet, View, TextInput, Text, Button, TouchableOpacity} from "react-native";
import DatePicker from "react-native-modern-datepicker"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const [date, setDate] = useState("")
const [errorDate, setErrorDate] = useState("")

import { validateDate } from "../helper/validations/validationDate"

import { ModalPicker, ModalPickerg } from "../components/ModalPicker";
import { size } from "lodash";
import themeContext from "../helper/ThemeCon";
import 'react-native-url-polyfill/auto';

import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabase";
import { ButtonGeneric } from '../components/Buttons';
import Picker from "react-native-picker";

const datepick = (prop) => {

}

export default datepick