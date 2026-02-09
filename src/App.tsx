import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { GameLayout } from './components/layout/GameLayout';
import SagaMapScreen from './components/pages/SagaPage';
import ArcadePage from './components/pages/ArcadePage';
import EventsScreen from './components/pages/EventsPage';
import { useEffect } from 'react';
import { getOrCreateUser } from './db/db';
import { CustomGamePage } from './components/pages/CustomGamePage';
import { GameSession } from './components/pages/GameSession';
import GameOver from './components/pages/GameOver';
import Menu from './components/pages/Menu';

const SettingsPage = () => <div className="p-10">Settings Content</div>;



function App() {

  useEffect(() => {
    getOrCreateUser().catch(console.error);
  }, []);


  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/saga" replace />} />
          <Route path="/saga" element={<SagaMapScreen />} />
          <Route path="/arcade" element={<ArcadePage />} />
          <Route path="/events" element={<EventsScreen />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/custom-game" element={<CustomGamePage />} />
          <Route path="/gameover/:id" element={<GameOver />} />
          <Route path="/menu" element={<Menu />}/>
          
        </Route>

        <Route element={<GameLayout />}>
          <Route path="/play/:mode" element={<GameSession />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;