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
            <Text className="text-xl font-bold text-white">{t("priv-pol")}</Text>
        </View>

        <ScrollView className="flex-1 p-4">
            <SectionTitle>
                {t("priv-pol")}
            </SectionTitle>

            <SectionTitle>{t("compromiso")}</SectionTitle>
            <Paragraph>
                {t("priv-1")}
                {'\n'}{'\n'}
                {t("priv-2")}
                {'\n'}{'\n'}
                {t("priv-3")}
                {'\n'}{'\n'}
                {t("priv-4")}
                {'\n'}{'\n'}
                {t("priv-5")}
                {'\n'}{'\n'}
            </Paragraph>

            <SectionTitle>{t("priv-pol")}</SectionTitle>
            <Paragraph>
                {t("priv-6")}
                {'\n'}{'\n'}
                {t("priv-7")}
                {'\n'}{'\n'}
                {t("priv-8")}
                {'\n'}{'\n'}
                {t("priv-8.1")}{'\n'}                    
                {t("priv-8.2")}{'\n'}
                {t("priv-8.3")}{'\n'}
                {t("priv-8.4")}{'\n'}
                {t("priv-8.5")}{'\n'}
                {t("priv-8.6")}{'\n'}
                {t("priv-8.7")}{'\n'}
                {t("priv-8.8")}{'\n'}
                {t("priv-8.9")}{'\n'}
                {t("priv-8.10")}{'\n'}
                {t("priv-8.11")}{'\n'}
                {'\n'}
            </Paragraph>

            <SectionTitle>{t("priv-8.1")}</SectionTitle>
            <Paragraph>
                {t("priv-8.1.1")}
                {'\n'}{'\n'}
            </Paragraph>

            <SectionTitle>{t("priv-8.2")}</SectionTitle>
            <Paragraph>
                {t("priv-8.2.1")}                    
                {'\n'}{'\n'}
                {t("priv-8.2.2")}
                {'\n'}{'\n'}
            </Paragraph>

            <SectionTitle>{t("priv-8.3")}</SectionTitle>
            <Paragraph>
                {t("priv-8.3.1")}
                {'\n'}{'\n'}
                {t("priv-8.3.2")}                    
                {'\n'}{'\n'}
                {t("priv-8.3.3")}                    
                {'\n'}
                {t("priv-8.3.4")}                  
                {'\n'}
                {t("priv-8.3.5")}                    
                {'\n'}
                {t("priv-8.3.6")}
                {'\n'}
                {t("priv-8.3.7")}
                {'\n'}
                {t("priv-8.3.8")}
                {'\n'}
                {t("priv-8.3.9")}
                {'\n'}
                {t("priv-8.3.10")}
                {'\n'}
                {t("priv-8.3.11")}
                {'\n'}{'\n'}
                {t("priv-8.3.12")}
                {'\n'}
                {t("priv-8.3.13")}
                {'\n'}
                {t("priv-8.3.14")}                    
                {'\n'}{'\n'}
                {t("priv-8.3.15")}  
                {'\n'}{'\n'}
                {t("priv-8.3.16")}
                {'\n'}
                {t("priv-8.3.17")}
                {'\n'}
                {t("priv-8.3.18")}
                {'\n'}{'\n'}
                {t("priv-8.3.19")}
                {'\n'}{'\n'}
                {t("priv-8.3.20")}
                {'\n'}
                {t("priv-8.3.21")}
                {'\n'}{'\n'}
            </Paragraph>

            <SectionTitle>{t("priv-8.4")}</SectionTitle>
            <Paragraph>
                {t("priv-8.4.1")}
                {'\n'}{'\n'}
                {t("priv-8.4.2")}
                {'\n'}
                {t("priv-8.4.3")}
                {'\n'}
                {t("priv-8.4.4")}
                {'\n'}
                {t("priv-8.4.5")}
                {'\n'}
                {t("priv-8.4.6")}
                {'\n'}{'\n'}
                {t("priv-8.4.7")}
                {'\n'}
                {t("priv-8.4.8")}
                {'\n'}
                {t("priv-8.4.9")}
                {'\n'}
                {t("priv-8.4.10")}
                {'\n'}{'\n'}
                {t("priv-8.4.11")}
                {'\n'}
                {t("priv-8.4.12")}
                {'\n'}
                {t("priv-8.4.13")}
                {'\n'}{'\n'}
                {t("priv-8.4.14")}
                {'\n'}
                {t("priv-8.4.15")}
                {'\n'}
                {t("priv-8.4.16")}
                {'\n'}{'\n'}
                {t("priv-8.4.17")}
                {'\n'}
                {t("priv-8.4.18")}
                {'\n'}
                {t("priv-8.4.19")}
                {'\n'}
                {t("priv-8.4.20")}
                {'\n'}
                {t("priv-8.4.21")}
                {'\n'}{'\n'}
                {t("priv-8.4.22")}
                {'\n'}
                {t("priv-8.4.23")}
                {'\n'}
                {t("priv-8.4.24")}
                {'\n'}
                {t("priv-8.4.25")}
                {'\n'}
                {t("priv-8.4.26")}
                {'\n'}
                {t("priv-8.4.27")}
                {'\n'}{'\n'}
                {t("priv-8.4.28")}
                {'\n'}
                {t("priv-8.4.29")}
                {'\n'}
                {t("priv-8.4.30")}
                {'\n'}
                {t("priv-8.4.31")}
                {'\n'}{'\n'}
                {t("priv-8.4.32")}
                {'\n'}
                {t("priv-8.4.33")}
                {'\n'}
                {t("priv-8.4.34")}
                {'\n'}
                {t("priv-8.4.35")}
                {'\n'}
                {t("priv-8.4.36")}
                {'\n'}{'\n'}
            </Paragraph>

            <SectionTitle>{t("priv-8.5")}</SectionTitle>
            <Paragraph>
                {t("priv-8.5.1")}
                {'\n'}{'\n'}
                {t("priv-8.5.2")}
                {'\n'}
                {t("priv-8.5.3")}
                {'\n'}{'\n'}
                {t("priv-8.5.4")}
                {'\n'}{'\n'}
                {t("priv-8.5.5")}
                {'\n'}{'\n'}
                {t("priv-8.5.6")}
                {'\n'}
                {t("priv-8.5.7")}
                {'\n'}{'\n'}
                {t("priv-8.5.8")}
                {'\n'}{'\n'}
                {t("priv-8.5.9")}
                {'\n'}
                {t("priv-8.5.10")}
                {'\n'}{'\n'}
                {t("priv-8.5.11")}
                {'\n'}
                {t("priv-8.5.12")}
                {'\n'}{'\n'}
                {t("priv-8.5.13")}
                {'\n'}    
                {t("priv-8.5.14")}
                {'\n'}{'\n'}
                {t("priv-8.5.15")}
                {'\n'}
                {t("priv-8.5.16")}
                {'\n'}{'\n'}
                {t("priv-8.5.17")}
                {'\n'}
                {t("priv-8.5.18")}
                {'\n'}{'\n'}
                {t("priv-8.5.19")}
                {'\n'}{'\n'}
            </Paragraph>

            <SectionTitle>{t("priv-8.6")}</SectionTitle>
            <Paragraph>
                {t("priv-8.6.1")}
                {'\n'}
                {t("priv-8.6.2")}
                {'\n'}
                {t("priv-8.6.3")}
                {'\n'}
                {t("priv-8.6.4")}
                {'\n'}
                {t("priv-8.6.5")}
                {'\n'}{'\n'}
                {t("priv-8.6.6")}
                {'\n'}
                {t("priv-8.6.7")}
                {'\n'}
                {t("priv-8.6.8")}
                {'\n'}
                {t("priv-8.6.9")}
                {'\n'}
                {t("priv-8.6.10")}
                {'\n'}{'\n'}
                {t("priv-8.6.11")}
                {'\n'}{'\n'}
            </Paragraph>
            
            <SectionTitle>{t("priv-8.7")}</SectionTitle>
            <Paragraph>
                {t("priv-8.7.1")}
                {'\n'}{'\n'}
                {t("priv-8.7.2")}
                {'\n'}
                {t("priv-8.7.3")}
                {'\n'}{'\n'}
                {t("priv-8.7.4")}
                {'\n'}
                {t("priv-8.7.5")}
                {'\n'}
                {t("priv-8.7.6")}
                {'\n'}{'\n'}
            </Paragraph>
            
            <SectionTitle>{t("priv-8.8")}</SectionTitle>
            <Paragraph>
                {t("priv-8.8.1")}
                {'\n'}{'\n'}
            </Paragraph>
            
            <SectionTitle>{t("priv-8.9")}</SectionTitle>
            <Paragraph>
                {t("priv-8.9.1")}
                {'\n'}{'\n'}
                {t("priv-8.9.2")}
                {'\n'}{'\n'}
            </Paragraph>
            
            <SectionTitle>{t("priv-8.10")}</SectionTitle>
            <Paragraph>
                {t("priv-8.10.1")}
                {'\n'}{'\n'}
            </Paragraph>
            
            <SectionTitle>{t("priv-8.11")}</SectionTitle>
            <Paragraph>
                {t("priv-8.11.1")}
                {'\n'}
                (datos)
                {'\n'}{'\n'}
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

