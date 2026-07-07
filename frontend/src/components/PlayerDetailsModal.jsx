import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearPlayerError } from '../features/player/playerSlice';
import { FaTimes, FaRunning, FaBullseye, FaExchangeAlt, FaDribbble, FaShieldAlt, FaHeartbeat } from 'react-icons/fa';

const StatRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/40 last:border-b-0">
      <span className="text-slate-400 font-medium capitalize">{label.replace(/([A-Z])/g, ' $1')}</span>
      <span className="font-mono font-bold text-slate-200">{value || '-'}</span>
    </div>
  );
};

const PlayerDetailsModal = ({ onClose }) => {
  const { selectedPlayer } = useSelector((state) => state.player);

  if (!selectedPlayer) return null;

  const keyStats = [
    { label: 'Pace', val: selectedPlayer.pace, icon: <FaRunning className="text-indigo-400" /> },
    { label: 'Shooting', val: selectedPlayer.shooting, icon: <FaBullseye className="text-rose-400" /> },
    { label: 'Passing', val: selectedPlayer.passing, icon: <FaExchangeAlt className="text-emerald-400" /> },
    { label: 'Dribbling', val: selectedPlayer.dribbling, icon: <FaDribbble className="text-purple-400" /> },
    { label: 'Defending', val: selectedPlayer.defending, icon: <FaShieldAlt className="text-cyan-400" /> },
    { label: 'Physicality', val: selectedPlayer.physical, icon: <FaHeartbeat className="text-orange-400" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in text-left">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 bg-slate-800 hover:bg-slate-750 rounded-xl transition-all z-10 cursor-pointer"
        >
          <FaTimes size={14} />
        </button>

        {/* Modal Content - Scrollable if content overflows */}
        <div className="overflow-y-auto p-6 md:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left Column: Card visual */}
            <div className="flex flex-col items-center justify-center md:border-r md:border-slate-800/80 md:pr-8">
              <div className="w-48 h-64 bg-gradient-to-br from-indigo-900/20 via-slate-850 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative group overflow-hidden">
                {/* OVR & POS */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="text-4xl font-black text-white font-mono leading-none">{selectedPlayer.ovr}</span>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest mt-1">{selectedPlayer.position}</span>
                  </div>
                  {selectedPlayer.card && (
                    <img src={selectedPlayer.card} alt="Card card art" className="w-12 h-16 object-contain opacity-80" />
                  )}
                </div>

                {/* Player details */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-white text-lg tracking-tight leading-tight line-clamp-2">
                    {selectedPlayer.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 truncate">{selectedPlayer.team}</p>
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider">{selectedPlayer.nation}</p>
                </div>
              </div>

              {/* Basic metadata */}
              <div className="w-full mt-6 space-y-2 bg-slate-950/40 p-4 border border-slate-850 rounded-2xl text-xs font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-500">Age</span>
                  <span className="text-slate-300 font-semibold">{selectedPlayer.age} Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Preferred Foot</span>
                  <span className="text-slate-300 font-semibold">{selectedPlayer.preferredFoot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Height</span>
                  <span className="text-slate-300 font-semibold">{selectedPlayer.height?.split('/')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Weight</span>
                  <span className="text-slate-300 font-semibold">{selectedPlayer.weight?.split('/')[0]}</span>
                </div>
              </div>
            </div>

            {/* Right Columns: Attributes Grid */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Profile header */}
              <div>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Player Dossier</span>
                <h2 className="text-2xl font-black text-white leading-none mt-1">{selectedPlayer.name}</h2>
                <p className="text-xs text-slate-400 mt-1.5">{selectedPlayer.team} &bull; {selectedPlayer.league}</p>
              </div>

              {/* Main Attributes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {keyStats.map((stat) => (
                  <div key={stat.label} className="bg-slate-950/30 border border-slate-800/80 p-3 rounded-2xl flex items-center justify-between font-mono">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{stat.label.substring(0, 3)}</span>
                      <span className="text-base font-extrabold text-white">{stat.val || '-'}</span>
                    </div>
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                ))}
              </div>

              {/* Detailed Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 bg-slate-950/20 p-5 border border-slate-850 rounded-2xl">
                <div className="space-y-1">
                  <StatRow label="acceleration" value={selectedPlayer.acceleration} />
                  <StatRow label="sprintSpeed" value={selectedPlayer.sprintSpeed} />
                  <StatRow label="positioning" value={selectedPlayer.positioning} />
                  <StatRow label="finishing" value={selectedPlayer.finishing} />
                  <StatRow label="shotPower" value={selectedPlayer.shotPower} />
                  <StatRow label="longShots" value={selectedPlayer.longShots} />
                  <StatRow label="volleys" value={selectedPlayer.volleys} />
                </div>
                <div className="space-y-1">
                  <StatRow label="vision" value={selectedPlayer.vision} />
                  <StatRow label="crossing" value={selectedPlayer.crossing} />
                  <StatRow label="shortPassing" value={selectedPlayer.shortPassing} />
                  <StatRow label="longPassing" value={selectedPlayer.longPassing} />
                  <StatRow label="agility" value={selectedPlayer.agility} />
                  <StatRow label="reactions" value={selectedPlayer.reactions} />
                  <StatRow label="stamina" value={selectedPlayer.stamina} />
                </div>
              </div>

              {/* Playstyles */}
              {selectedPlayer.playStyles && selectedPlayer.playStyles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Special Playstyles</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlayer.playStyles.map((style) => (
                      <span 
                        key={style}
                        className={`text-[10px] font-bold px-3 py-1 rounded-xl border ${
                          style.includes('+')
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            : 'bg-slate-800/80 border-slate-800 text-slate-300'
                        }`}
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailsModal;
