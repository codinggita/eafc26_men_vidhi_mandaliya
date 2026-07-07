import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayerStats, fetchPlayerDetails } from '../features/player/playerSlice';
import { 
  FaUsers, 
  FaStar, 
  FaRunning, 
  FaBullseye, 
  FaExchangeAlt, 
  FaShieldAlt, 
  FaDribbble,
  FaHeartbeat,
  FaGlobe
} from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, statsLoading } = useSelector((state) => state.player);

  useEffect(() => {
    dispatch(fetchPlayerStats());
  }, [dispatch]);

  if (statsLoading || !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] space-y-4">
        <span className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm animate-pulse">Loading database analytics...</p>
      </div>
    );
  }

  // Key performance cards
  const statsOverview = [
    { label: 'Total Players', value: stats.count.toLocaleString(), icon: <FaUsers />, color: 'from-indigo-500/10 to-indigo-500/2' },
    { label: 'Average OVR Rating', value: stats.averageRating, icon: <FaStar />, color: 'from-amber-500/10 to-amber-500/2' }
  ];

  // Attribute leaders list
  const leaders = [
    { category: 'Highest Rated', player: stats.highestRated, value: stats.highestRated?.ovr, attribute: 'OVR', icon: <FaStar className="text-amber-400" /> },
    { category: 'Speed Leader', player: stats.highestPaced, value: stats.highestPaced?.pace, attribute: 'PAC', icon: <FaRunning className="text-indigo-400" /> },
    { category: 'Shooting Expert', player: stats.highestShooting, value: stats.highestShooting?.shooting, attribute: 'SHO', icon: <FaBullseye className="text-rose-400" /> },
    { category: 'Playmaking Icon', player: stats.highestPassing, value: stats.highestPassing?.passing, attribute: 'PAS', icon: <FaExchangeAlt className="text-emerald-400" /> },
    { category: 'Dribbling Master', player: stats.highestDribbling, value: stats.highestDribbling?.dribbling, attribute: 'DRI', icon: <FaDribbble className="text-purple-400" /> },
    { category: 'Stronghold Defender', player: stats.highestDefending, value: stats.highestDefending?.defending, attribute: 'DEF', icon: <FaShieldAlt className="text-cyan-400" /> },
    { category: 'Physical Engine', player: stats.highestPhysical, value: stats.highestPhysical?.physical, attribute: 'PHY', icon: <FaHeartbeat className="text-orange-400" /> }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">EAFC 26 Player Analytics</h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Explore and filter ratings, compare attributes side-by-side, and analyze the full Men's database metrics instantly.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-slate-900/60 p-4 border border-slate-800 rounded-xl self-start md:self-auto">
          <FaGlobe className="text-indigo-400" size={24} />
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Database Status</p>
            <p className="text-sm font-bold text-emerald-400">Live & Connected</p>
          </div>
        </div>
      </div>

      {/* Stats overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {statsOverview.map((item) => (
          <div 
            key={item.label}
            className={`bg-gradient-to-br ${item.color} bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-lg hover:border-slate-700 transition-all duration-300 group`}
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">{item.label}</span>
              <span className="text-4xl font-extrabold text-white font-mono tracking-tight">{item.value}</span>
            </div>
            <span className="p-4 bg-slate-800/60 border border-slate-700/50 rounded-xl text-indigo-400 text-2xl group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </span>
          </div>
        ))}
      </div>

      {/* Attribute leaders layout */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight pl-1 border-l-4 border-indigo-500">
          Global Attribute Leaders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {leaders.map((leader) => (
            <div 
              key={leader.category}
              onClick={() => {
                if (leader.player?.playerId) {
                  dispatch(fetchPlayerDetails(leader.player.playerId));
                }
              }}
              className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/30 hover:shadow-indigo-500/5 hover:-translate-y-1 cursor-pointer transition-all duration-300 flex flex-col group"
            >
              {/* Leader header */}
              <div className="p-4 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{leader.category}</span>
                <span className="text-lg">{leader.icon}</span>
              </div>
              
              {/* Leader Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {leader.player?.name || 'N/A'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {leader.player?.position} &bull; {leader.player?.team}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase mt-0.5">{leader.player?.nation}</p>
                </div>

                <div className="flex items-end justify-between pt-2 border-t border-slate-800/60">
                  <span className="text-xs text-slate-500 font-semibold">{leader.attribute} score</span>
                  <span className="text-2xl font-black text-white font-mono leading-none">{leader.value || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
