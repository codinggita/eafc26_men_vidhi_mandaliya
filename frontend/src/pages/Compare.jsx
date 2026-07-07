import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FaSearch, FaExchangeAlt, FaChevronDown, FaTimes } from 'react-icons/fa';

const PlayerSearchInput = ({ placeholder, onSelect, selectedPlayer, onClear }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/players?q=${encodeURIComponent(query)}&limit=5`);
        setResults(res.data.data.players || []);
      } catch (err) {
        console.error('Failed to search players:', err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  if (selectedPlayer) {
    return (
      <div className="bg-slate-900 border border-indigo-500/20 p-5 rounded-2xl flex items-center justify-between shadow-xl">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-14 bg-slate-800 border border-slate-750 flex items-center justify-center rounded-xl font-mono">
            <span className="text-xl font-black text-white">{selectedPlayer.ovr}</span>
          </div>
          <div>
            <h4 className="font-extrabold text-white text-base leading-snug">{selectedPlayer.name}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{selectedPlayer.position} &bull; {selectedPlayer.team}</p>
          </div>
        </div>
        <button 
          onClick={onClear} 
          className="p-2 text-slate-500 hover:text-rose-400 bg-slate-800 hover:bg-slate-750 rounded-xl transition-all"
        >
          <FaTimes size={12} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <FaSearch className="absolute left-4 text-slate-500" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowDropdown(true); }}
          onFocus={() => setShowDropdown(true)}
          className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 rounded-2xl placeholder-slate-500 text-sm focus:outline-none text-slate-200 transition-all shadow-lg"
        />
      </div>

      {showDropdown && (query.trim().length >= 2 || loading) && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-20 overflow-hidden max-h-60 overflow-y-auto">
            {loading ? (
              <div className="px-4 py-3 text-xs text-slate-500 text-center flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-500/20 border-t-indigo-400 rounded-full animate-spin" /> Searching...
              </div>
            ) : results.length === 0 ? (
              <div className="px-4 py-3 text-xs text-slate-500 text-center">No results found</div>
            ) : (
              results.map((player) => (
                <button
                  key={player._id}
                  onClick={() => {
                    onSelect(player);
                    setQuery('');
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-slate-800/60 border-b border-slate-800/30 last:border-b-0 flex items-center justify-between group transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">{player.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{player.position} &bull; {player.team} &bull; {player.nation}</p>
                  </div>
                  <span className="font-mono font-black text-slate-300 group-hover:text-white bg-slate-850 px-2.5 py-1 rounded-lg text-xs">{player.ovr}</span>
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

const AttributeBar = ({ label, val1, val2 }) => {
  const diff = val1 - val2;
  const max = 99;
  const pct1 = (val1 / max) * 100;
  const pct2 = (val2 / max) * 100;

  return (
    <div className="space-y-2">
      {/* Labels */}
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className={`w-10 text-left font-mono ${diff > 0 ? 'text-emerald-400 font-extrabold' : 'text-slate-400'}`}>{val1 || '-'}</span>
        <span className="text-slate-400 uppercase tracking-wider text-xs font-bold">{label}</span>
        <span className={`w-10 text-right font-mono ${diff < 0 ? 'text-emerald-400 font-extrabold' : 'text-slate-400'}`}>{val2 || '-'}</span>
      </div>

      {/* Progress Comparison Bars */}
      <div className="flex items-center gap-4">
        {/* Left Player Bar (fill right to left) */}
        <div className="flex-1 h-2.5 bg-slate-900 rounded-full overflow-hidden flex justify-end">
          <div 
            style={{ width: `${pct1}%` }} 
            className={`h-full rounded-full transition-all duration-500 ${diff > 0 ? 'bg-gradient-to-l from-emerald-500 to-emerald-400' : 'bg-slate-700'}`}
          />
        </div>

        {/* Right Player Bar (fill left to right) */}
        <div className="flex-1 h-2.5 bg-slate-900 rounded-full overflow-hidden">
          <div 
            style={{ width: `${pct2}%` }} 
            className={`h-full rounded-full transition-all duration-500 ${diff < 0 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-slate-700'}`}
          />
        </div>
      </div>
    </div>
  );
};

const Compare = () => {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  const attributes = [
    { label: 'Pace', key: 'pace' },
    { label: 'Shooting', key: 'shooting' },
    { label: 'Passing', key: 'passing' },
    { label: 'Dribbling', key: 'dribbling' },
    { label: 'Defending', key: 'defending' },
    { label: 'Physicality', key: 'physical' },
  ];

  return (
    <div className="space-y-8 text-left animate-fade-in">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Compare Players</h1>
        <p className="text-slate-400 text-xs mt-1">Select two players to compare their attributes and meta statistics side-by-side.</p>
      </div>

      {/* Selector layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <PlayerSearchInput 
          placeholder="Search and select Player 1..."
          selectedPlayer={player1}
          onSelect={(p) => setPlayer1(p)}
          onClear={() => setPlayer1(null)}
        />
        <PlayerSearchInput 
          placeholder="Search and select Player 2..."
          selectedPlayer={player2}
          onSelect={(p) => setPlayer2(p)}
          onClear={() => setPlayer2(null)}
        />
      </div>

      {/* Comparison Workspace */}
      {!player1 || !player2 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
          <div className="p-4 bg-indigo-500/10 rounded-full text-indigo-500">
            <FaExchangeAlt size={32} />
          </div>
          <div className="max-w-xs">
            <h3 className="font-bold text-white text-base">Select Two Players</h3>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">
              Use the search bars above to look up players. Once both are selected, their radar and metrics comparisons will load here.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Detailed attributes compare pane */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
            <h3 className="font-bold text-white text-base border-l-4 border-indigo-500 pl-3">Attributes Comparison</h3>
            <div className="space-y-6 pt-2">
              {attributes.map((attr) => (
                <AttributeBar 
                  key={attr.label}
                  label={attr.label}
                  val1={player1[attr.key]}
                  val2={player2[attr.key]}
                />
              ))}
            </div>
          </div>

          {/* Player details comparison panel */}
          <div className="bg-slate-900 border border-slate-800/80 rounded-3xl p-6 shadow-xl space-y-6 flex flex-col">
            <h3 className="font-bold text-white text-base border-l-4 border-indigo-500 pl-3">Meta Statistics</h3>
            
            <div className="space-y-4 divide-y divide-slate-800/50 pt-2">
              
              {/* OVR compare */}
              <div className="flex items-center justify-between text-xs py-3 first:pt-0">
                <span className="font-mono font-black text-indigo-400 text-sm">{player1.ovr}</span>
                <span className="font-semibold text-slate-500 uppercase tracking-wider">Overall</span>
                <span className="font-mono font-black text-indigo-400 text-sm">{player2.ovr}</span>
              </div>

              {/* Age compare */}
              <div className="flex items-center justify-between text-xs py-3">
                <span className="font-mono text-slate-300 font-semibold">{player1.age} yrs</span>
                <span className="font-semibold text-slate-500 uppercase tracking-wider">Age</span>
                <span className="font-mono text-slate-300 font-semibold">{player2.age} yrs</span>
              </div>

              {/* Foot compare */}
              <div className="flex items-center justify-between text-xs py-3">
                <span className="font-semibold text-slate-300">{player1.preferredFoot}</span>
                <span className="font-semibold text-slate-500 uppercase tracking-wider">Preferred Foot</span>
                <span className="font-semibold text-slate-300">{player2.preferredFoot}</span>
              </div>

              {/* Height compare */}
              <div className="flex items-center justify-between text-xs py-3">
                <span className="font-mono text-slate-300 truncate max-w-[80px] text-left">{player1.height?.split('/')[0]}</span>
                <span className="font-semibold text-slate-500 uppercase tracking-wider">Height</span>
                <span className="font-mono text-slate-300 truncate max-w-[80px] text-right">{player2.height?.split('/')[0]}</span>
              </div>

              {/* Weight compare */}
              <div className="flex items-center justify-between text-xs py-3">
                <span className="font-mono text-slate-300 truncate max-w-[80px] text-left">{player1.weight?.split('/')[0]}</span>
                <span className="font-semibold text-slate-500 uppercase tracking-wider">Weight</span>
                <span className="font-mono text-slate-300 truncate max-w-[80px] text-right">{player2.weight?.split('/')[0]}</span>
              </div>

              {/* Playstyles compare */}
              <div className="py-3 flex flex-col space-y-2">
                <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px] text-center block">Playstyles</span>
                <div className="grid grid-cols-2 gap-4 text-[10px] pt-1">
                  <div className="space-y-1">
                    {player1.playStyles?.slice(0, 4).map((style) => (
                      <span key={style} className="block px-2 py-1 bg-slate-800 text-slate-300 rounded text-center truncate">{style}</span>
                    )) || <span className="text-slate-600 block text-center italic">None</span>}
                  </div>
                  <div className="space-y-1">
                    {player2.playStyles?.slice(0, 4).map((style) => (
                      <span key={style} className="block px-2 py-1 bg-slate-800 text-slate-300 rounded text-center truncate">{style}</span>
                    )) || <span className="text-slate-600 block text-center italic">None</span>}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default Compare;
