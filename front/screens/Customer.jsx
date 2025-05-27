import { useState, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    TextInput,
    Modal,
    ScrollView,
} from "react-native";
import {
    Camera,
    MapPin,
    Mail,
    User,
    Droplet,
    MessageSquare,
    Edit2,
    Heart,
    UserPlus,
    Phone,
} from "react-native-feather";

import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import themeContext from "../helper/ThemeCon";
import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabase";
import { handleSubmit } from "../lib/querys";
import { getGlobalData } from "../backend/querys/inserts/New_email";

import RedLoader from "@/components/RedLoader";
import ModalUpdateStatus from "../components/ModalUpdateStatus";
import ModalUpdateRole from "../components/ModalUpdateRole";
import ModalUpdateLocation from "../components/ModalUpdateLocation";
import ModalUpdatePhone from "../components/ModalUpdatePhone";

const Customer = ({}) => {
    const theme = useContext(themeContext);
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [image, setImage] = useState();
    const [isLoading, setIsLoading] = useState(false);

    // States for editing modalities
    const [statusModalVisible, setStatusModalVisible] = useState(false);
    const [userTypeModalVisible, setUserTypeModalVisible] = useState(false);
    const [locationModalVisible, setLocationModalVisible] = useState(false);
    const [phoneModalVisible, setPhoneModalVisible] = useState(false);

    // Function to update the profile image
    // const pickImage = async () => {
    //     setIsLoading(true);
    //     try {
    //         const result = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //             quality: 1,
    //             allowsEditing: true,
    //         });

    //         if (!result.cancelled) {
    //             const email = getGlobalData("email");

    //             // Upload image and get file name
    //             const fileName = await handleSubmit(result.assets[0].uri);
    //             console.log("Nombre del archivo subido:", fileName);

    //             // Get the public URL of the uploaded image
    //             const { data: data2, error: error2 } = await supabase.storage
    //                 .from("prueba")
    //                 .getPublicUrl(fileName);

    //             if (error2) {
    //                 throw error2;
    //             }

    //             // data2 will contain the image URL
    //             const imageUrl = data2.publicUrl;
    //             console.log("Imagen URL:", imageUrl);

    //             // Update image URL in user database
    //             const { data, error } = await supabase
    //                 .from("users")
    //                 .update({ Url: imageUrl })
    //                 .eq("Email", email);

    //             if (error) {
    //                 throw error;
    //             } else {
    //                 setImage({ uri: imageUrl });
    //                 Alert.alert(t("image_saved"));
    //             }
    //         }
    //     } catch (error) {
    //         Alert.alert(t("image_error"));
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const pickImage = async () => {
        setIsLoading(true);

        try {
            // 1. Pedir permisos
            const permission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                throw new Error("Permiso denegado para acceder a la galería.");
            }

            // 2. Seleccionar imagen
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsEditing: true,
            });

            if (result.canceled) return;

            const file = result.assets[0];
            const originalFileName = file.fileName || file.uri.split("/").pop();
            const extension = originalFileName?.split(".").pop()?.toLowerCase();

            // 3. Validar extensión
            const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
            if (!extension || !allowedExtensions.includes(extension)) {
                throw new Error("Formato de imagen no permitido.");
            }

            // 4. Redimensionar y comprimir la imagen
            const manipulated = await ImageManipulator.manipulateAsync(
                file.uri,
                [{ resize: { width: 800 } }],
                { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
            );

            const email = getGlobalData("email");

            // 5. Subir la imagen usando tu lógica existente
            const fileName = await handleSubmit(manipulated.uri); // debe mantener el nombre real
            console.log("Nombre del archivo subido:", fileName);

            // 6. Obtener URL pública segura
            const { data: data2, error: error2 } = await supabase.storage
                .from("prueba") // tu bucket
                .getPublicUrl(fileName);

            if (
                error2 ||
                !data2?.publicUrl ||
                !data2.publicUrl.startsWith("https://")
            ) {
                throw new Error(
                    "No se pudo obtener la URL pública de la imagen."
                );
            }

            const imageUrl = data2.publicUrl;
            console.log("Imagen URL:", imageUrl);

            // 7. Actualizar en la base de datos
            const { data, error } = await supabase
                .from("users")
                .update({ Url: imageUrl })
                .eq("Email", email);

            if (error) {
                throw new Error("Error al actualizar la imagen en el perfil.");
            }

            setImage({ uri: imageUrl });
            Alert.alert(t("image_saved"));
        } catch (error) {
            console.error("Error al subir imagen:", error);
            Alert.alert(t("image_error"), error.message || "Error inesperado");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const email = getGlobalData("email");
            console.log(" lo que imprime es", email);
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("Email", email);

            if (error) {
                console.error("Error fetching user:", error.message);
            } else {
                if (data && data.length > 0) {
                    setUser(data[0]);
                    const usuarioEncontrado = data[0];
                    const urlEncontrado = usuarioEncontrado.Url;
                    console.log("el url que se encontró es: ", urlEncontrado);
                    setImage({ uri: urlEncontrado });
                } else {
                    console.log(data);
                    console.error("No user data found");
                }
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const UserProfileItem = ({
        Icon,
        title,
        content,
        isEditable,
        editFunction,
    }) => {
        return (
            <View className="px-4 py-3 bg-white mb-2 shadow-sm">
                <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center">
                        <Icon
                            stroke="#FF4136"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        <Text className="text-lg font-bold text-gray-800">
                            {t(title)}
                        </Text>
                    </View>
                    {isEditable && (
                        <TouchableOpacity onPress={() => editFunction()}>
                            <Edit2 stroke="#FF4136" width={18} height={18} />
                        </TouchableOpacity>
                    )}
                </View>
                <Text className="text-gray-700">{content}</Text>
            </View>
        );
    };

    const handleStatusUpdate = (newStatus) => {
        setUser((prev) => ({ ...prev, Status: newStatus }));
    };

    const handleRoleUpdate = (newRole) => {
        setUser((prev) => ({ ...prev, Role: newRole }));
    };

    const handleLocationUpdate = (newState, newMunicipality) => {
        setUser((prev) => ({
            ...prev,
            State: newState,
            City: newMunicipality,
        }));
    };

    return (
        <View className="flex-1">
            <ScrollView className="flex-1 bg-gray-100">
                <StatusBar backgroundColor={"#fff"} style="dark" />

                <View className="items-center p-6 pt-0 bg-red-500 flex flex-row gap-3">
                    {isLoading ? (
                        <RedLoader />
                    ) : (
                        <View className="relative border-4 border-white rounded-full">
                            <Image
                                source={image}
                                className="w-32 h-32 rounded-full border-4 border-white"
                            />
                            <TouchableOpacity
                                onPress={pickImage}
                                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md"
                            >
                                <Camera
                                    stroke="#FF4136"
                                    width={20}
                                    height={20}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    <View>
                        <Text className="mt-5 text-2xl font-bold text-white">
                            {isLoading
                                ? "..."
                                : `${
                                      user?.FirstName.length > 17
                                          ? user?.FirstName.slice(0, 15) + "..."
                                          : user?.FirstName
                                  }`}
                        </Text>
                        <Text className="text-2xl font-bold text-white">
                            {isLoading
                                ? "..."
                                : `${
                                      user?.LastName.length > 17
                                          ? user?.LastName.slice(0, 15) + "..."
                                          : user?.LastName
                                  }`}
                        </Text>
                    </View>
                </View>

                <UserProfileItem
                    Icon={MessageSquare}
                    title={t("status")}
                    content={isLoading ? "..." : user?.Status || t("no_status")}
                    isEditable={true}
                    editFunction={() => setStatusModalVisible(true)}
                />

                <UserProfileItem
                    Icon={user?.UserType === "donor" ? Heart : UserPlus}
                    title={t("user_type")}
                    content={
                        isLoading
                            ? "..."
                            : user?.Role === "donor"
                            ? t("donor")
                            : user?.Role === "recipient"
                            ? t("recipient")
                            : t("no_user_type")
                    }
                    isEditable={true}
                    editFunction={() => setUserTypeModalVisible(true)}
                />

                <UserProfileItem
                    Icon={MapPin}
                    title={t("location")}
                    content={
                        isLoading ? "..." : `${user?.City}, ${user?.State}`
                    }
                    isEditable={true}
                    editFunction={() => setLocationModalVisible(true)}
                />

                <UserProfileItem
                    Icon={Droplet}
                    title={t("blood_type")}
                    content={isLoading ? "..." : user?.Blood_Type}
                    isEditable={false}
                />

                <UserProfileItem
                    Icon={User}
                    title={t("gender")}
                    content={
                        isLoading
                            ? "..."
                            : user?.Gender === "male"
                            ? t("male")
                            : t("female")
                    }
                    isEditable={false}
                />

                <UserProfileItem
                    Icon={Mail}
                    title={t("email")}
                    content={isLoading ? "..." : user?.Email}
                    isEditable={false}
                />

                <UserProfileItem
                    Icon={Phone}
                    title={t("phone_number")}
                    content={isLoading ? "..." : user?.Phone}
                    isEditable={true}
                    editFunction={() => setPhoneModalVisible(true)}
                />
            </ScrollView>

            <ModalUpdateStatus
                isVisible={statusModalVisible}
                onClose={() => setStatusModalVisible(false)}
                onStatusUpdated={handleStatusUpdate}
                setIsLoading={setIsLoading}
            />

            <ModalUpdateRole
                isVisible={userTypeModalVisible}
                onClose={() => setUserTypeModalVisible(false)}
                onRoleUpdated={handleRoleUpdate}
                setIsLoading={setIsLoading}
            />

            <ModalUpdateLocation
                isVisible={locationModalVisible}
                onClose={() => setLocationModalVisible(false)}
                onLocationUpdated={handleLocationUpdate}
                setIsLoading={setIsLoading}
            />

            <ModalUpdatePhone
                isVisible={phoneModalVisible}
                onClose={() => setPhoneModalVisible(false)}
                onPhoneUpdated={(newPhone) =>
                    setUser((prev) => ({ ...prev, Phone: newPhone }))
                }
                setIsLoading={setIsLoading}
            />
        </View>
    );
};

export default Customer;
