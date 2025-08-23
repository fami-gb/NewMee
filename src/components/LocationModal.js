'use client';

const locations = ['現在地', '札幌', '仙台', '東京', '横浜', '名古屋', '京都', '大阪', '神戸', '広島', '福岡', '沖縄'];

const LocationModal = ({ isOpen, onClose, onSelectLocation }) => {
    if (!isOpen) return null;

    const handleSelect = (location) => {
        onSelectLocation(location);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>天気表示地点を選択</h2>
                <div className="location-grid">
                    {locations.map(loc => (
                        <button key={loc} onClick={() => handleSelect(loc)} className="location-btn">
                            {loc === '現在地' ? `📍 ${loc}` : loc}
                        </button>
                    ))}
                </div>
                <div className="modal-actions">
                    <button onClick={onClose} className="cancel-btn">キャンセル</button>
                </div>
            </div>
        </div>
    );
};

export default LocationModal;
