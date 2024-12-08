import { Platform } from "react-native";
import { io } from "socket.io-client";
export const BaseUrl =
  Platform.OS === "android" ? "http://10.214.80.136:3000/" : "http://localhost:3000";

//export const socket = io.connect("http://192.168.100.20:8001/");
export const socket = io.connect("https://cocky-cloud-73568.pktriot.net/")
