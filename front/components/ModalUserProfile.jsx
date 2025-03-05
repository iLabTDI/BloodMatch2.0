import { useEffect, useRef } from "react"
import { View, Text, Image, TouchableOpacity, Animated } from "react-native"
import { useTranslation } from "react-i18next"
import { Heart, UserPlus, MapPin, User, Droplet, MessageSquare, X } from "react-native-feather"

const ModalUserProfile = ({ isVisible, onClose, userData }) => {
  const { t } = useTranslation();
  const slideAnim = useRef(new Animated.Value(1000)).current;

  useEffect(() => {
    if (isVisible) {
      slideAnim.setValue(1000);
      Animated.spring(slideAnim, {
        toValue: 5,
        tension: 90,
        friction: 10,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim])

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 1000,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      onClose()
    });
  }

  if (!isVisible || !userData) return null;

  const ProfileItem = ({ icon: Icon, label, value }) => (
    <View className="flex-row items-center mb-2">
      <View className="bg-red-100 p-1.5 rounded-full mr-2">
        <Icon stroke="#FF4136" width={18} height={18} />
      </View>
      <View className="flex-1">
        <Text className="text-gray-600 text-xs">{label}</Text>
        <Text className="text-gray-800 font-semibold text-sm">{value}</Text>
      </View>
    </View>
  )

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-10">
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
        }}
        className="bg-white rounded-3xl w-11/12 m-auto h-[90%]"
      >
        <View className="flex-row justify-end pt-2 px-2">
          <TouchableOpacity onPress={handleClose} className="bg-gray-200 p-2 rounded-full">
            <X stroke="#374151" width={20} height={20} />
          </TouchableOpacity>
        </View>

        <View className="px-4 flex-1 justify-between pb-4">
          <View className="items-center mb-2 -mt-8">
            <Image source={{ uri: userData.image }} className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-1" />
            <Text className="text-lg font-bold text-gray-800">{userData?.name}</Text>
          </View>

          <View className="space-y-2 flex-1">
            <View className="bg-gray-50 rounded-xl p-3 flex-[0.4]">
              <View className="flex-row items-center mb-1">
                <MessageSquare stroke="#FF4136" width={16} height={16} />
                <Text className="text-base font-bold text-gray-800 ml-2">{t("status")}</Text>
              </View>
              <View className="flex-1 justify-center">
                <Text className="text-gray-700 text-sm leading-5">{userData?.status || t("no_status")}</Text>
              </View>
            </View>

            <View className="bg-gray-50 rounded-xl p-3">
              <View className="flex-row items-center mb-1">
                {userData?.role === "donor" ? (
                  <Heart stroke="#FF4136" width={16} height={16} />
                ) : (
                  <UserPlus stroke="#FF4136" width={16} height={16} />
                )}
                <Text className="text-base font-bold text-gray-800 ml-2">{t("user_type")}</Text>
              </View>
              <Text className="text-gray-700 text-sm">{userData?.role === "donor" ? t("donor") : t("recipient")}</Text>
            </View>

            <View className="bg-gray-50 rounded-xl p-3">
              <ProfileItem icon={MapPin} label={t("location")} value={`${userData?.city}, ${userData?.state}`} />
              <ProfileItem icon={Droplet} label={t("blood_type")} value={userData?.blood_type} />
              <ProfileItem
                icon={User}
                label={t("gender")}
                value={userData?.gender === "male" ? t("male") : t("female")}
              />
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

export default ModalUserProfile;
