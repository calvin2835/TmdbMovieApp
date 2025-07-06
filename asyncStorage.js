import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAysncKey = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Data saved: ${key} = ${value}`);
  } catch (e) {
    console.error("Failed to save data", e);
  }
};

export const getAsyncKey = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`Data retrieved: ${key} = ${value}`);
      return value;
    }
  } catch (e) {
    console.error("Failed to fetch data", e);
  }
};
