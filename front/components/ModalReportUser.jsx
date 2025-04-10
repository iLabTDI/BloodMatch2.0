import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { addReport } from "@/lib/querys";
import { getGlobalData } from "@/backend/querys/inserts/New_email";

const Modal = ({ onClose, userToReport }) => {
    const { t } = useTranslation();
    const [reason, setReason] = useState("");

    const currentUser = getGlobalData("email");

    async function reportUser(user, reason, reportedBy) {
        if(!user || !reason) return;

        if(reason.length > 300) {
            alert(t("max_characters_report"));
            return;
        }

        const res = await addReport(user, reason, reportedBy);
        if(!res.success){
            console.log("Ocurrio un error", e);
            alert(t("report_error"));
            return;
        }else{
            alert(t("report_done"));
        }

        setReason("");
        onClose();
    }

    return (
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-50 flex-1 justify-center items-center">
            <View className="bg-white rounded-lg p-6 w-5/6 max-w-sm">
                <Text className="text-lg font-bold">
                    {t("report_user")} {userToReport.FirstName}?
                </Text>
                <Text className="text-base mt-8">
                    {t("type_report_reason")}
                </Text>
                <TextInput
                    editable
                    multiline
                    numberOfLines={5}
                    maxLength={300}
                    onChangeText={text => setReason(text)}
                    value={reason}
                    className="border-2 border-red-500 rounded-lg mt-4 h-32 text-base"
                    style={{ textAlignVertical: "top" }}
                />
                <View className="flex flex-row justify-end gap-3 mt-6">
                    <TouchableOpacity
                        onPress={onClose}
                        className="mt-4 bg-red-500 py-2 px-4 rounded-full self-end"
                        >
                        <Text className="text-white font-bold">{t("close")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => reportUser(userToReport.Email, reason, currentUser)}
                        className="mt-4 bg-red-500 py-2 px-4 rounded-full self-end"
                        >
                        <Text className="text-white font-bold">{t("accept")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Modal;
