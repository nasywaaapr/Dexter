import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'hardwareHistory';
const MAX_HISTORY = 50;

// Simpan ke riwayat
export const saveToHistory = async (hardwareItem) => {
  try {
    const historyJson = await AsyncStorage.getItem(HISTORY_KEY);
    const history = historyJson ? JSON.parse(historyJson) : [];
    
    // Hapus item yang sama kalau udah ada (biar nggak duplikat)
    const filteredHistory = history.filter(item => item.id !== hardwareItem.id);
    
    // Tambah item baru di paling atas dengan timestamp
    const newItem = {
      id: hardwareItem.id,
      label: hardwareItem.label,
      image_url: hardwareItem.image_url,
      color: hardwareItem.color,
      text_color: hardwareItem.text_color,
      viewedAt: new Date().toISOString(),
    };
    
    filteredHistory.unshift(newItem);
    
    // Limit maksimal item
    const limitedHistory = filteredHistory.slice(0, MAX_HISTORY);
    
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
    return true;
  } catch (error) {
    console.error('Error saving history:', error);
    return false;
  }
};

// Ambil semua riwayat
export const getHistory = async () => {
  try {
    const historyJson = await AsyncStorage.getItem(HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
};

// Hapus satu item dari riwayat
export const removeFromHistory = async (itemId) => {
  try {
    const historyJson = await AsyncStorage.getItem(HISTORY_KEY);
    const history = historyJson ? JSON.parse(historyJson) : [];
    
    const filteredHistory = history.filter(item => item.id !== itemId);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(filteredHistory));
    return true;
  } catch (error) {
    console.error('Error removing from history:', error);
    return false;
  }
};

// Clear semua riwayat
export const clearHistory = async () => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing history:', error);
    return false;
  }
};