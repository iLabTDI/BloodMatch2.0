import { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Animated,
    StyleSheet,
} from "react-native";
import { styled } from "nativewind";
import {
    HelpCircle,
    MessageSquare,
    AlertTriangle,
    Send,
    ChevronDown,
    ChevronUp,
    Phone,
    Mail,
    ArrowLeft,
} from "react-native-feather";
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";
import { addToSupport } from "@/lib/querys";
import { getGlobalData } from "@/backend/querys/inserts/New_email";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const AnimatedView = Animated.createAnimatedComponent(StyledView);

const SupportScreen = ({ navigation }) => {
    const { t } = useTranslation();

    const [messageType, setMessageType] = useState("suggestion");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);

    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const messageTypes = [
        { id: "suggestion", label: t("suggestion"), icon: MessageSquare },
        { id: "complaint", label: t("complaint"), icon: AlertTriangle },
        { id: "technical", label: t("technical_problem"), icon: HelpCircle },
    ];

    const faqs = [
        {
            id: 1,
            question: t("question1"),
            answer: t("answer1"),
        },
        {
            id: 2,
            question: t("question2"),
            answer: t("answer2"),
        },
        {
            id: 3,
            question: t("question3"),
            answer: t("answer3"),
        },
    ];

    const handleSubmit = async () => {
        if (!subject.trim()) {
            Alert.alert(t("error"), t("no_subject"));
            shakeField("subject");
            return;
        }

        if (!message.trim()) {
            Alert.alert(t("error"), t("no_message"));
            shakeField("message");
            return;
        }

        setIsLoading(true);

        const currentUser = getGlobalData("email");
        let res = await addToSupport(messageType, subject, message, currentUser);
        
        setIsLoading(false);

        if(!res.success){
            Alert.alert(t("error"), t("error_send_support"));
        }else{
            Alert.alert(t("success"), t("success_submit_support"));
        }

        setSubject("");
        setMessage("");

    };

    const shakeField = (field) => {
        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const toggleFaq = (id) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    return (
        <StyledKeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-gray-50"
            style={styles.container}
        >
            <StyledView className="bg-red-500 p-4 flex-row items-center">
                <StyledTouchableOpacity
                    onPress={() => navigation?.goBack()}
                    className="mr-4"
                >
                    <ArrowLeft stroke="white" width={24} height={24} />
                </StyledTouchableOpacity>
                <StyledText className="text-xl font-bold text-white">
                    {t("support")}
                </StyledText>
            </StyledView>

            <StyledScrollView className="flex-1 p-4">
                {/* Intro */}
                <StyledView className="bg-white rounded-xl p-4 shadow-sm mb-6">
                    <StyledText className="text-lg font-bold text-gray-800 mb-2">
                        {t("title_support")}
                    </StyledText>
                    <StyledText className="text-gray-600">
                        {t("subtitle_support")}
                    </StyledText>
                </StyledView>

                {/* Form */}
                <StyledView className="bg-white rounded-xl p-4 shadow-sm mb-6">
                    {/* Message Type Selector */}
                    <StyledView className="mb-4">
                        <StyledText className="text-sm font-medium text-gray-700 mb-1">
                            {t("type_message")}
                        </StyledText>
                        <StyledView className="relative">
                            <StyledTouchableOpacity
                                className="flex-row items-center justify-between border border-gray-300 rounded-lg p-3 bg-white"
                                onPress={() =>
                                    setShowTypeDropdown(!showTypeDropdown)
                                }
                            >
                                <StyledView className="flex-row items-center">
                                    {messageTypes
                                        .find((type) => type.id === messageType)
                                        ?.icon({
                                            stroke: "#FF4136",
                                            width: 20,
                                            height: 20,
                                        })}
                                    <StyledText className="ml-2 text-gray-800">
                                        {
                                            messageTypes.find(
                                                (type) =>
                                                    type.id === messageType
                                            )?.label
                                        }
                                    </StyledText>
                                </StyledView>
                                {showTypeDropdown ? (
                                    <ChevronUp
                                        stroke="#6B7280"
                                        width={20}
                                        height={20}
                                    />
                                ) : (
                                    <ChevronDown
                                        stroke="#6B7280"
                                        width={20}
                                        height={20}
                                    />
                                )}
                            </StyledTouchableOpacity>

                            {showTypeDropdown && (
                                <StyledView className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 z-10 shadow-md">
                                    {messageTypes.map((type) => (
                                        <StyledTouchableOpacity
                                            key={type.id}
                                            className={`flex-row items-center p-3 border-b border-gray-200 ${
                                                type.id === messageType
                                                    ? "bg-red-50"
                                                    : ""
                                            }`}
                                            onPress={() => {
                                                setMessageType(type.id);
                                                setShowTypeDropdown(false);
                                            }}
                                        >
                                            {type.icon({
                                                stroke: "#FF4136",
                                                width: 20,
                                                height: 20,
                                            })}
                                            <StyledText className="ml-2 text-gray-800">
                                                {type.label}
                                            </StyledText>
                                        </StyledTouchableOpacity>
                                    ))}
                                </StyledView>
                            )}
                        </StyledView>
                    </StyledView>

                    {/* Subject */}
                    <StyledView className="mb-4">
                        <StyledText className="text-sm font-medium text-gray-700 mb-1">
                            {t("subject")}
                        </StyledText>
                        <AnimatedView
                            style={{
                                transform: [{ translateX: shakeAnimation }],
                            }}
                        >
                            <StyledTextInput
                                className="border border-gray-300 rounded-lg p-3 bg-white text-gray-800"
                                placeholder={t("subject_placeholder")}
                                value={subject}
                                onChangeText={setSubject}
                                maxLength={100}
                            />
                        </AnimatedView>
                    </StyledView>

                    {/* Message */}
                    <StyledView className="mb-4">
                        <StyledText className="text-sm font-medium text-gray-700 mb-1">
                            {t("message")}
                        </StyledText>
                        <AnimatedView
                            style={{
                                transform: [{ translateX: shakeAnimation }],
                            }}
                        >
                            <StyledTextInput
                                className="border border-gray-300 rounded-lg p-3 bg-white text-gray-800 h-32"
                                placeholder={t("message_placeholder")}
                                multiline
                                textAlignVertical="top"
                                value={message}
                                onChangeText={setMessage}
                                maxLength={1000}
                            />
                        </AnimatedView>
                    </StyledView>

                    {/* Submit Button */}
                    <StyledTouchableOpacity
                        className="bg-red-500 rounded-full py-3 items-center justify-center flex-row"
                        onPress={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="white" size="small" />
                        ) : (
                            <>
                                <Send stroke="white" width={20} height={20} />
                                <StyledText className="text-white font-bold ml-2">
                                    {t("submit_message")}
                                </StyledText>
                            </>
                        )}
                    </StyledTouchableOpacity>
                </StyledView>

                {/* FAQs */}
                <StyledView className="bg-white rounded-xl p-4 shadow-sm mb-6">
                    <StyledText className="text-lg font-bold text-gray-800 mb-4">
                        {t("frequently_asked_questions")}
                    </StyledText>

                    {faqs.map((faq) => (
                        <StyledView
                            key={faq.id}
                            className="mb-3 border-b border-gray-100 pb-3"
                        >
                            <StyledTouchableOpacity
                                className="flex-row justify-between items-center"
                                onPress={() => toggleFaq(faq.id)}
                            >
                                <StyledText className="text-gray-800 font-medium flex-1 pr-2">
                                    {faq.question}
                                </StyledText>
                                {expandedFaq === faq.id ? (
                                    <ChevronUp
                                        stroke="#6B7280"
                                        width={20}
                                        height={20}
                                    />
                                ) : (
                                    <ChevronDown
                                        stroke="#6B7280"
                                        width={20}
                                        height={20}
                                    />
                                )}
                            </StyledTouchableOpacity>

                            {expandedFaq === faq.id && (
                                <StyledView className="mt-2 bg-gray-50 p-3 rounded-lg">
                                    <StyledText className="text-gray-600">
                                        {faq.answer}
                                    </StyledText>
                                </StyledView>
                            )}
                        </StyledView>
                    ))}
                </StyledView>

                {/* Contact Info */}
                <StyledView className="bg-white rounded-xl p-4 shadow-sm mb-6">
                    <StyledText className="text-lg font-bold text-gray-800 mb-4">
                        {t("direct_contact")}
                    </StyledText>

                    <StyledView className="flex-row items-center mb-3">
                        <StyledView className="w-10 h-10 rounded-full bg-red-100 items-center justify-center mr-3">
                            <Phone stroke="#FF4136" width={20} height={20} />
                        </StyledView>
                        <StyledView>
                            <StyledText className="text-gray-500 text-xs">
                                {t("phone")}
                            </StyledText>
                            <StyledText className="text-gray-800">
                                +52 (55) 1234-5678
                            </StyledText>
                        </StyledView>
                    </StyledView>

                    <StyledView className="flex-row items-center mb-3">
                        <StyledView className="w-10 h-10 rounded-full bg-red-100 items-center justify-center mr-3">
                            <Mail stroke="#FF4136" width={20} height={20} />
                        </StyledView>
                        <StyledView>
                            <StyledText className="text-gray-500 text-xs">
                                {t("email")}
                            </StyledText>
                            <StyledText className="text-gray-800">
                                soporte@bloodmatch.com
                            </StyledText>
                        </StyledView>
                    </StyledView>
                </StyledView>
            </StyledScrollView>
        </StyledKeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
    },
});

export default SupportScreen;
