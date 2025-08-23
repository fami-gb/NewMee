import Link from 'next/link';
import WeatherWidget from './WeatherWidget';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h1>💎NewMee💎</h1>
      <WeatherWidget />
      <nav>
        <ul>
          <li>
            <Link href="/">
              🏠 今日のコーデ
            </Link>
          </li>
          <li>
            <Link href="/calendar">
              🗓️ オシャレ履歴
            </Link>
          </li>
          <li>
            <Link href="/closet">
              👕 服コレクション
            </Link>
          </li>
          <li>
            <Link href="/weather">
              🌦️ 全国のお天気
            </Link>
          </li>
          <li>
            <Link href="/ai-assistant">
              🤖 ファッション相談
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
