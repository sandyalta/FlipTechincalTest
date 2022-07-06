import AsyncStorage from "@react-native-async-storage/async-storage";

export let STORAGE_KEY = '@user_input';

export const saveData = async (item:any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(item))
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
}

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    alert('Storage successfully cleared!');
  } catch (e) {
    alert('Failed to clear the async storage.');
  }
};