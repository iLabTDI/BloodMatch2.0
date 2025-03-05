import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTranslation } from "react-i18next";

const ModalFilters = ({ onClose, isVisible, onApplyFilters }) => {
  const [filterCategory, setFilterCategory] = useState(null);
  const [filter, setFilter] = useState("");
  const [noFilters, setNoFilters] = useState(false);
  const { t } = useTranslation();

  const slideAnim = useRef(new Animated.Value(300)).current; 

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (filterCategory === "blood_type") {
      setFilter("A+"); 
    } else if (filterCategory === "gender") {
      setFilter("male"); 
    } else if (filterCategory === "my_municipality") {
      setFilter("my_municipality"); 
    } else if (filterCategory === "my_state") {
      setFilter("my_state"); 
    }
    else {
      setFilter(""); 
    }
  }, [filterCategory]);

  const handleApply = () => {
    if(filter === "" || filterCategory === null){
      return;
    }
    onApplyFilters(filterCategory, filter);
    setNoFilters(true);
    onClose();
  };

  const handleQuitFilters = () => {
    setFilterCategory(null);
    setFilter("");
    onApplyFilters("", "");
    setNoFilters(false);
    onClose();
  };

  return isVisible ? (
    <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.View
          style={{ transform: [{ translateY: slideAnim }] }}
          className="bg-white rounded-lg p-6 w-5/6 max-w-sm"
        >
          <Text className="font-bold text-2xl mb-4">{t("search")}</Text>

          <Picker selectedValue={filterCategory} onValueChange={(itemValue) => setFilterCategory(itemValue)}>
            <Picker.Item label={t("select_a_category")} value="" />
            <Picker.Item label={t("blood_type")} value="blood_type" />
            <Picker.Item label={t("gender")} value="gender" />
            <Picker.Item label={t("my_municipality")} value="my_municipality" />
            <Picker.Item label={t("my_state")} value="my_state" />
          </Picker>

          {filterCategory === "blood_type" ? (
            <Picker selectedValue={filter} onValueChange={(itemValue) => setFilter(itemValue)}>
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
            </Picker>
          ) : filterCategory === "gender" ? (
            <Picker selectedValue={filter} onValueChange={(itemValue) => setFilter(itemValue)}>
              <Picker.Item label={t("male")} value="male" />
              <Picker.Item label={t("female")} value="female" />
            </Picker>
          ) : filterCategory === "my_municipality" ? (
            <Text>{t("filter_by_municipality")}</Text>
          ) : filterCategory === "my_state" ? (
            <Text>{t("filter_by_state")}</Text>
          ) : null}

          <View className="flex flex-row justify-end gap-2 mt-4">
            {noFilters &&
              <TouchableOpacity onPress={handleQuitFilters} className="mt-4 bg-slate-400 py-2 px-4 rounded-full">
                <Text className="text-white font-bold">{t("no_filters")}</Text>
              </TouchableOpacity>
            }
            <TouchableOpacity onPress={onClose} className="mt-4 bg-slate-400 py-2 px-4 rounded-full">
              <Text className="text-white font-bold">{t("cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleApply} className="mt-4 bg-red-500 py-2 px-4 rounded-full">
              <Text className="text-white font-bold">{t("accept")}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  ) : null;
};

export default ModalFilters;
