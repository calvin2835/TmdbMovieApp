import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const setItem = (key, value) => {
  storage.set(key, value);
};

export const getItem = (key) => {
  return storage.getString(key);
};

export const removeItem = (key) => {
  storage.delete(key);
};
