// src/context/ClosetContext.js (新規作成)
'use client';

import { createContext, useState, useContext } from 'react';

const ClosetContext = createContext();

const initialItems = [
  { id: 1, name: '黒いジャケット', category: 'outerwear', image: 'https://placehold.jp/150x120.png?text=Outer', date: '2025-08-20' },
  { id: 2, name: 'ブルージーンズ', category: 'bottoms', image: 'https://placehold.jp/150x120.png?text=Bottoms', date: '2025-08-21' },
  { id: 3, name: '白いTシャツ', category: 'tops', image: 'https://placehold.jp/150x120.png?text=Tops', date: '2025-08-22' },
];

// ダミーのコーデ履歴
const initialOutfits = {
  '2025-08-24': 1, // 今日の日付にID:1の服を登録
};


export const ClosetProvider = ({ children }) => {
  const [items, setItems] = useState(initialItems);
  const [outfits, setOutfits] = useState(initialOutfits);

  // saveItemに、addToCalendarToday という引数を追加
  const saveItem = (itemToSave, addToCalendarToday = false) => {
    const itemExists = items.find(item => item.id === itemToSave.id);
    if (itemExists) {
      setItems(items.map(item => item.id === itemToSave.id ? itemToSave : item));
    } else {
      setItems(prevItems => [...prevItems, itemToSave]);
      // もしチェックがONなら、今日のコーデとして登録！
      if (addToCalendarToday) {
        const todayString = new Date().toISOString().split('T')[0];
        addOutfitToDate(todayString, itemToSave.id);
      }
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    // もし削除したアイテムがコーデ履歴にあったら、それも消す
    const newOutfits = { ...outfits };
    Object.keys(newOutfits).forEach(date => {
      if (newOutfits[date] === id) {
        delete newOutfits[date];
      }
    });
    setOutfits(newOutfits);
  };

  // 日付にコーデを登録する関数
  const addOutfitToDate = (date, itemId) => {
    setOutfits(prevOutfits => ({
      ...prevOutfits,
      [date]: itemId
    }));
  };

  // 日付からコーデを削除する関数
  const removeOutfitFromDate = (date) => {
    const newOutfits = { ...outfits };
    delete newOutfits[date];
    setOutfits(newOutfits);
  };


  return (
    <ClosetContext.Provider value={{ items, saveItem, deleteItem, outfits, addOutfitToDate, removeOutfitFromDate }}>
      {children}
    </ClosetContext.Provider>
  );
};

export const useCloset = () => {
  return useContext(ClosetContext);
};
