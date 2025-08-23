'use client';
import { useState } from 'react';
import Calendar from 'react-calendar';
import Image from 'next/image';
import { useCloset } from '../../context/ClosetContext';
import SelectOutfitModal from '../../components/SelectOutfitModal';
import './react-calendar.css';

const CalendarPage = () => {
  const { items, outfits, addOutfitToDate, removeOutfitFromDate } = useCloset();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSelectOutfit = (itemId) => {
    const dateString = selectedDate.toISOString().split('T')[0];
    addOutfitToDate(dateString, itemId);
    setIsModalOpen(false);
  };

  const handleRemoveOutfit = () => {
    const dateString = selectedDate.toISOString().split('T')[0];
    if (confirm('この日のコーデを削除しますか？')) {
      removeOutfitFromDate(dateString);
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const outfitItemId = outfits[dateString];
      if (outfitItemId) {
        const outfitItem = items.find(item => item.id === outfitItemId);
        if (outfitItem) {
          return (
            <Image 
              src={outfitItem.image} 
              alt={outfitItem.name} 
              width={60} 
              height={60} 
              className="outfit-image"
            />
          );
        }
      }
    }
    return null;
  };

  const selectedDateString = selectedDate.toISOString().split('T')[0];
  const selectedOutfitId = outfits[selectedDateString];
  const selectedOutfit = items.find(item => item.id === selectedOutfitId);

  return (
    <div>
      <h2>🗓️コーデカレンダー🗓️</h2>
      <p>コーデを登録したい日付をクリックしてね！</p>
      <div className="card">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          onClickDay={handleDayClick}
          tileContent={tileContent}
          locale="ja-JP"
        />
      </div>
      <div className="selected-date-info card" style={{marginTop: '20px'}}>
        <h3>{selectedDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}のコーデ</h3>
        {selectedOutfit ? (
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <Image src={selectedOutfit.image} alt={selectedOutfit.name} width={80} height={80} style={{borderRadius: '8px'}} />
            <p>{selectedOutfit.name}</p>
            <button onClick={handleRemoveOutfit} className="delete-btn" style={{marginLeft: 'auto'}}>🗑️ 削除</button>
          </div>
        ) : (
          <p>この日のコーデはまだ登録されていません。</p>
        )}
      </div>
      <SelectOutfitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={items}
        onSelect={handleSelectOutfit}
      />
    </div>
  );
};

export default CalendarPage;
