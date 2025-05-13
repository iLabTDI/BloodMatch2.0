import { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from "react-native";
import {
    Globe,
    User,
    Users,
    Lock,
    Bell,
    Moon,
    Shield,
    Trash2,
    HelpCircle,
    FileText,
    Eye,
    LogOut,
    ChevronRight,
} from "react-native-feather";
import i18next, { language_resources } from "../helper/idiom-changer";
import languageList from "../components/languageList.json";
import { useTranslation } from "react-i18next";
import adjust from "../assets/fonts/ajust.js";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalLanguages from "@/components/ModalLanguages";
import { getGlobalData } from "@/backend/querys/inserts/New_email";
import { deleteUserByEmail } from "@/lib/querys";
import ModalChangePassword from "../components/ModalChangePassword";

const SettingItem = ({ icon: Icon, title, onPress }) => (
    <TouchableOpacity
        className="flex-row items-center py-4 px-6 border-b border-gray-200"
        onPress={onPress}
    >
        <Icon stroke="#FF4136" width={24} height={24} />
        <Text className="flex-1 ml-4 text-base text-gray-800">{title}</Text>
        <ChevronRight stroke="#9CA3AF" width={20} height={20} />
    </TouchableOpacity>
);

const SettingsGroup = ({ title, children }) => (
    <View className="mb-6">
        <Text className="px-6 py-2 text-sm font-semibold text-gray-500 uppercase">
            {title}
        </Text>
        {children}
    </View>
);

const removeSession = async () => {
    try {
        await AsyncStorage.removeItem("email");
        console.log(`Item email eliminado`);
    } catch (error) {
        console.error("Error al eliminar item:", error);
    }
};

const log_out = (t, navigation) => {
    Alert.alert(t("precaution"), t("Confirmation"), [
        {
            text: t("Yes"),
            onPress: () => {
                removeSession();
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                });
            },
        },
        {
            text: t("No"),
            onPress: () => {},
        },
    ]);
};

async function delete_account(t, navigation, currentUser) {
    Alert.alert(t("delacc"), t("elimconf"), [
        {
            text: t("Yes"),
            onPress: async () => {
                let res = await deleteUserByEmail(currentUser);
                if (res.success) {
                    navigation.push("Login");
                    alert(t("accountelim"));
                    return;
                } else {
                    alert(t("error_delete_account"));
                    return;
                }
            },
        },
        {
            text: t("No"),
            onPress: () => {},
        },
    ]);
}

const changeLng = async (lng) => {
    if (!lng) return;
    try {
        await AsyncStorage.setItem("appLanguage", lng);
        i18next.changeLanguage(lng);
    } catch (error) {
        console.error("Error saving language preference:", error);
    }
};

const SettingsScreen = ({ navigation }) => {
    const { t } = useTranslation();

    const [modalLanguageVisible, setModalLanguageVisible] = useState(false);
    const [modalChangePassVisible, setModalChangePassVisible] = useState(false);

    const handleSettingPress = (setting) => {
        console.log(`Pressed: ${setting}`);
        switch (setting) {
            case "Language":
                setModalLanguageVisible(true);
                break;
            case "Profile":
                navigation.navigate(t("profile_label"));
                break;
            case "Change_user":
                log_out(t, navigation);
                break;
            case "Change_password":
                setModalChangePassVisible(true);
                break;
            case "Delete_account":
                let currentUser = getGlobalData("email");
                delete_account(t, navigation, currentUser);
                break;
            case "Privacy":
                navigation.push("Privacidad");
                break;
            case "Support":
                navigation.push("Support");
                break;
            case "Terms_and_conditions":
                navigation.push("termycondi");
                break;
            case "Log_out":
                log_out(t, navigation);
                break;
            default:
                break;
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>
                <SettingsGroup title={t("account")}>
                    <SettingItem
                        icon={Globe}
                        title={t("language")}
                        onPress={() => handleSettingPress("Language")}
                    />
                    <SettingItem
                        icon={User}
                        title={t("profile")}
                        onPress={() => handleSettingPress("Profile")}
                    />
                    <SettingItem
                        icon={Users}
                        title={t("change_user")}
                        onPress={() => handleSettingPress("Change_user")}
                    />
                    <SettingItem
                        icon={Lock}
                        title={t("change_password")}
                        onPress={() => handleSettingPress("Change_password")}
                    />
                </SettingsGroup>

                <SettingsGroup title={t("preferences")}>
                    {/* <SettingItem icon={Bell} title={t("notifications")} onPress={() => handleSettingPress("Notifications")} /> */}
                    {/* <SettingItem icon={Moon} title={t("theme")} onPress={() => handleSettingPress("Theme")} /> */}
                    <SettingItem
                        icon={Shield}
                        title={t("verification_two_steps")}
                        onPress={() =>
                            handleSettingPress("Verification_two_steps")
                        }
                    />
                </SettingsGroup>

                <SettingsGroup title={t("privacy_and_security")}>
                    <SettingItem
                        icon={Trash2}
                        title={t("delete_account")}
                        onPress={() => handleSettingPress("Delete_account")}
                    />
                    <SettingItem
                        icon={Eye}
                        title={t("privacy")}
                        onPress={() => handleSettingPress("Privacy")}
                    />
                </SettingsGroup>

                <SettingsGroup title={t("help_and_legal")}>
                    <SettingItem
                        icon={HelpCircle}
                        title={t("support")}
                        onPress={() => handleSettingPress("Support")}
                    />
                    <SettingItem
                        icon={FileText}
                        title={t("terms_and_conditions")}
                        onPress={() =>
                            handleSettingPress("Terms_and_conditions")
                        }
                    />
                </SettingsGroup>

                <View className="mt-6 mb-8">
                    <TouchableOpacity
                        className="flex-row items-center justify-center py-2 px-6 bg-red-500 m-auto rounded-full"
                        onPress={() => handleSettingPress("Log_out")}
                    >
                        <LogOut stroke="#FFFFFF" width={24} height={24} />
                        <Text className="ml-2 text-base font-bold text-white">
                            {t("log_out")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <ModalLanguages
                visible={modalLanguageVisible}
                onClose={() => setModalLanguageVisible(false)}
                onAccept={(language) => {
                    changeLng(language);
                    setModalLanguageVisible(false);
                }}
            />

            <ModalChangePassword
                visible={modalChangePassVisible}
                onClose={() =>
                    setModalChangePassVisible(!modalChangePassVisible)
                }
            />
        </SafeAreaView>
    );
};

export default SettingsScreen;
