import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import { ArrowLeft } from "react-native-feather";
import { useTranslation } from "react-i18next";

const SectionTitle = ({ children }) => <Text className="text-lg font-bold text-gray-800 mt-6 mb-2">{children}</Text>;

const Paragraph = ({ children }) => <Text className="text-gray-700 mb-4 leading-6">{children}</Text>;

const TermsAndConditionsScreen = ({ navigation }) => {
    const handleGoBack = () => {
        if (navigation) {
            navigation.goBack();
        }
    }

    const {t} = useTranslation();

    return (
        <SafeAreaView className="flex-1 bg-white" style={styles.container}>
        <View className="bg-red-500 p-4 flex-row items-center">
            <TouchableOpacity onPress={handleGoBack} className="mr-4">
            <ArrowLeft stroke="#FFFFFF" width={24} height={24} />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-white">{t("terms_and_conditions")}</Text>
        </View>

        <ScrollView className="flex-1 p-4">
            <Paragraph>
                Bienvenido a BloodMatch. Estos términos y condiciones describen las reglas y regulaciones para el uso de la aplicación BloodMatch.
            </Paragraph>

            <SectionTitle>1. {t("accep-terms")}</SectionTitle>
            <Paragraph>
                {t("parrafo-1")}{'\n'}{'\n'}
                {t("parrafo-1.1")}
            </Paragraph>

            <SectionTitle>2. {t("elegi")}</SectionTitle>
            <Paragraph>
                {t("parrafo-2")}{'\n'}{'\n'}
                {t("parrafo-2.1")}{'\n'}
                {t("parrafo-2.2")}{'\n'}
                {t("parrafo-2.3")} {'\n'}
                {t("parrafo-2.4")}{'\n'}
                {t("parrafo-2.5")}{'\n'}
            </Paragraph>

            <SectionTitle>3. {t("ur-acc")}</SectionTitle>
            <Paragraph>
                {t("parrafo-3")}{'\n'}{'\n'}
                {t("parrafo-3.1")}
            </Paragraph>

            <SectionTitle>4. {t("mod-serv")}</SectionTitle>
            <Paragraph>
                {t("parrafo-4")}{'\n'}{'\n'}
                {t("parrafo-4.1")}{'\n'}{'\n'}
                {t("parrafo-4.2")}
            </Paragraph>

            <SectionTitle>5. {t("secur")}</SectionTitle>
            <Paragraph>
                {t("parrafo-5")}{'\n'}{'\n'}
                {t("parrafo-5.1")}
            </Paragraph>

            <SectionTitle>6. {t("rights-blood")}</SectionTitle>
            <Paragraph>
                {t("parrafo-6")}{'\n'}{'\n'}
                {t("parrafo-6.1")}{'\n'}
                {t("parrafo-6.2")}{'\n'}
                {t("parrafo-6.3")}{'\n'}
                {t("parrafo-6.4")}{'\n'}
                {t("parrafo-6.5")}{'\n'}
                {t("parrafo-6.6")}{'\n'}
                {t("parrafo-6.7")}{'\n'}
                {t("parrafo-6.8")}{'\n'}
                {t("parrafo-6.9")}{'\n'}
                {t("parrafo-6.10")}{'\n'}
                {t("parrafo-6.11")}{'\n'}
                {t("parrafo-6.12")}{'\n'}
                {t("parrafo-6.13")}{'\n'}{'\n'}
                {t("parrafo-6.14")}{'\n'}{'\n'}
                {t("parrafo-6.15")}
            </Paragraph>

            <SectionTitle>7. {t("ur-rights-to")}</SectionTitle>
            <Paragraph>
                {t("parrafo-7")}{'\n'}{'\n'}
                {t("parrafo-7.1")}{'\n'}{'\n'}
                {t("parrafo-7.2")}{'\n'}{'\n'}
                {t("parrafo-7.3")}{'\n'}{'\n'}
                {t("parrafo-7.4")}{'\n'}{'\n'}
                {t("parrafo-7.5")}
            </Paragraph>

            <SectionTitle>8. {t("comm-rules")}</SectionTitle>
            <Paragraph>
                {t("parrafo-8")}{'\n'}{'\n'}
                {t("parrafo-8.1")}{'\n'}
                {t("parrafo-8.2")}{'\n'}
                {t("parrafo-8.3")}{'\n'}
                {t("parrafo-8.4")}{'\n'}
                {t("parrafo-8.5")}{'\n'}
                {t("parrafo-8.6")}{'\n'}
                {t("parrafo-8.7")}{'\n'}
                {t("parrafo-8.8")}{'\n'}
                {t("parrafo-8.9")}{'\n'}
                {t("parrafo-8.10")}{'\n'}
                {t("parrafo-8.11")}{'\n'}
                {t("parrafo-8.12")}{'\n'}
                {t("parrafo-8.13")}{'\n'}
                {t("parrafo-8.14")}{'\n'}{'\n'}
                {t("parrafo-8.15")}
            </Paragraph>

            <SectionTitle>9. {t("user-cont")}</SectionTitle>
            <Paragraph>
                {t("parrafo-9")}
            </Paragraph>

            <SectionTitle>10. {t("nots-autor-rights")}</SectionTitle>
            <Paragraph>
                {t("parrafo-10")}{'\n'}{'\n'}
                {t("parrafo-10.1")}{'\n'}{'\n'}
                {t("parrafo-10.2")}{'\n'}
                {t("parrafo-10.3")}{'\n'}
                {t("parrafo-10.4")}{'\n'}{'\n'}
                {t("parrafo-10.5")}{'\n'}{'\n'}
                {t("parrafo-10.6")}{'\n'}{'\n'}
                {t("parrafo-10.7")}{'\n'}{'\n'}
                {t("parrafo-10.8")}
            </Paragraph>

            <SectionTitle>11. {t("downl")}</SectionTitle>
            <Paragraph>
                {t("parrafo-11")}{'\n'}{'\n'}
                {t("parrafo-11.1")}
            </Paragraph>

            <SectionTitle>12. {t("resp-lim")}</SectionTitle>
            <Paragraph>
                {t("parrafo-12")} {'\n'}{'\n'}
                {t("parrafo-12.1")}
            </Paragraph>

            <SectionTitle>13. {t("arb-ren-dem")}</SectionTitle>
            <Paragraph>
                {t("parrafo-13")}{'\n'}{'\n'}
                {t("parrafo-13.1")}{'\n'}{'\n'}
                {t("parrafo-13.2")}
            </Paragraph>

            <SectionTitle>14. {t("legis-apli")}</SectionTitle>
            <Paragraph>
                {t("parrafo-14")}
            </Paragraph>

            <SectionTitle>15. {t("juris")}</SectionTitle>
            <Paragraph>
                {t("parrafo-15")}
            </Paragraph>

            <SectionTitle>16. {t("indem")}</SectionTitle>
            <Paragraph>
                {t("parrafo-16")}
            </Paragraph>

            <SectionTitle>17. {t("agree-full")}</SectionTitle>
            <Paragraph>
                {t("parrafo-17")}
            </Paragraph>

            <View className="h-10" />
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight
    }
});

export default TermsAndConditionsScreen;

