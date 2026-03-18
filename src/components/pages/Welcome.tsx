import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDefaultUser, db } from '../../db/db';

export const WelcomeScreen = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    
    // Create the base object
    const newUser = createDefaultUser();
    
    // Override the default name 
    newUser.username = name.trim();

    try {
      await db.user.add(newUser);
      navigate('/arcade')
    } catch (err) {
      console.error("Failed to create user", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-5xl font-black tracking-tighter italic uppercase text-purple-400">
          READY TO PLAY?
        </h1>
        
        <p className="text-zinc-400">Enter your nickname to begin.</p>

        <form onSubmit={handleStart} className="space-y-4">
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username..."
            className="w-full bg-zinc-800 border-2 border-zinc-700 rounded-xl px-6 py-4 text-xl focus:border-yellow-400 outline-none transition-all text-center"
            maxLength={15}
          />
          
          <button
            type="submit"
            disabled={!name.trim() || loading}
            className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:bg-zinc-700 disabled:text-zinc-500 text-zinc-900 font-bold py-4 rounded-xl text-xl transition-all active:scale-95"
          >
            {loading ? 'CREATING...' : 'START'}
          </button>
        </form>
      </div>
    </div>
  );
};