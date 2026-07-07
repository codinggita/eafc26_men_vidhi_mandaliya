import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlayers, setFilters, setPage, fetchPlayerDetails } from '../features/player/playerSlice';
import { FaSearch, FaChevronLeft, FaChevronRight, FaFilter, FaRedo } from 'react-icons/fa';

const POSITIONS = ['ST', 'CF', 'LW', 'RW', 'LM', 'RM', 'CM', 'CAM', 'CDM', 'CB', 'LB', 'RB', 'LWB', 'RWB', 'GK'];

const SORT_OPTIONS = [
  { label: 'Rating: High to Low', value: '-ovr' },
  { label: 'Rating: Low to High', value: 'ovr' },
  { label: 'Pace: High to Low', value: '-pace' },
  { label: 'Shooting: High to Low', value: '-shooting' },
  { label: 'Passing: High to Low', value: '-passing' },
  { label: 'Dribbling: High to Low', value: '-dribbling' },
  { label: 'Defending: High to Low', value: '-defending' },
  { label: 'Physicality: High to Low', value: '-physical' },
];

const Players = () => {
  const dispatch = useDispatch();
  const { players, loading, pagination, filters } = useSelector((state) => state.player);

  const [searchInput, setSearchInput] = useState(filters.q);
  const [positionInput, setPositionInput] = useState(filters.position);
  const [sortInput, setSortInput] = useState(filters.sort);
  const [teamInput, setTeamInput] = useState(filters.team);
  const [leagueInput, setLeagueInput] = useState(filters.league);
  const [nationInput, setNationInput] = useState(filters.nation);

  useEffect(() => {
    dispatch(fetchPlayers(filters));
  }, [dispatch, filters]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters({ q: searchInput }));
  };

  const handleFilterChange = (updates) => {
    dispatch(setFilters(updates));
  };

  const handleReset = () => {
    setSearchInput('');
    setPositionInput('');
    setSortInput('-ovr');
    setTeamInput('');
    setLeagueInput('');
    setNationInput('');
    dispatch(setFilters({
      page: 1,
      limit: 10,
      sort: '-ovr',
      q: '',
      team: '',
      league: '',
      nation: '',
      position: '',
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      dispatch(setPage(newPage));
      dispatch(setFilters({ ...filters, page: newPage }));
    }
  };

  return (
    <div className="space-y-6 text-left animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Player Index</h1>
          <p className="text-slate-400 text-xs mt-1">Browse, filter, and search the EAFC 26 Men's Database.</p>
        </div>
        <button 
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors self-start sm:self-auto"
        >
          <FaRedo size={10} /> Reset Filters
        </button>
      </div>

      {/* Filter panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <FaSearch className="absolute left-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search players by name, team, league..."
            value={searchInput}
            onChange={(e) => {
              const val = e.target.value;
              setSearchInput(val);
              dispatch(setFilters({ q: val }));
            }}
            className="w-full pl-11 pr-24 py-3 bg-slate-850 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 rounded-xl placeholder-slate-500 text-sm focus:outline-none text-slate-200 transition-all"
          />
          <button 
            type="submit"
            className="absolute right-2 px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 font-semibold text-xs text-white rounded-lg shadow transition-colors"
          >
            Search
          </button>
        </form>

        {/* Multi Dropdowns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {/* Position */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Position</label>
            <select
              value={positionInput}
              onChange={(e) => { setPositionInput(e.target.value); handleFilterChange({ position: e.target.value }); }}
              className="w-full bg-slate-850 border border-slate-800 text-slate-300 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500 cursor-pointer hover:border-slate-750"
            >
              <option value="">All Positions</option>
              {POSITIONS.map((pos) => <option key={pos} value={pos}>{pos}</option>)}
            </select>
          </div>

          {/* Team */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Team</label>
            <input
              type="text"
              placeholder="e.g. Real Madrid"
              value={teamInput}
              onChange={(e) => setTeamInput(e.target.value)}
              onBlur={() => handleFilterChange({ team: teamInput })}
              className="w-full bg-slate-850 border border-slate-800 text-slate-300 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500 placeholder-slate-600"
            />
          </div>

          {/* League */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">League</label>
            <input
              type="text"
              placeholder="e.g. LALIGA"
              value={leagueInput}
              onChange={(e) => setLeagueInput(e.target.value)}
              onBlur={() => handleFilterChange({ league: leagueInput })}
              className="w-full bg-slate-850 border border-slate-800 text-slate-300 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500 placeholder-slate-600"
            />
          </div>

          {/* Nation */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Nation</label>
            <input
              type="text"
              placeholder="e.g. France"
              value={nationInput}
              onChange={(e) => setNationInput(e.target.value)}
              onBlur={() => handleFilterChange({ nation: nationInput })}
              className="w-full bg-slate-850 border border-slate-800 text-slate-300 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500 placeholder-slate-600"
            />
          </div>

          {/* Sort */}
          <div className="space-y-1 lg:col-span-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Sort By</label>
            <select
              value={sortInput}
              onChange={(e) => { setSortInput(e.target.value); handleFilterChange({ sort: e.target.value }); }}
              className="w-full bg-slate-850 border border-slate-800 text-slate-300 text-xs px-3 py-2 rounded-lg focus:outline-none focus:border-indigo-500 cursor-pointer hover:border-slate-750"
            >
              {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

        </div>
      </div>

      {/* Players Catalog list */}
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[16rem] py-16 space-y-4">
          <span className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-xs">Querying database...</p>
        </div>
      ) : players.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-sm">
          No players match your search criteria. Try modifying your filters.
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {players.map((player) => (
              <div 
                key={player._id} 
                onClick={() => dispatch(fetchPlayerDetails(player.playerId))}
                className="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/25 transition-all duration-300 flex gap-5 shadow-lg relative group cursor-pointer"
              >
                {/* OVR Rating Badge on Card */}
                <div className="flex flex-col items-center justify-center bg-slate-800/80 border border-slate-750 p-4 rounded-xl min-w-[70px] h-[90px]">
                  <span className="text-3xl font-black text-white leading-none font-mono">{player.ovr}</span>
                  <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest mt-1.5">{player.position}</span>
                </div>

                {/* Player details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-extrabold text-white text-lg leading-snug truncate group-hover:text-indigo-400 transition-colors">
                      {player.name}
                    </h3>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {player.team} &bull; {player.league}
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase">{player.nation}</p>
                  </div>

                  {/* Attributes overview bar */}
                  <div className="grid grid-cols-6 gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 text-center font-mono">
                    <div>
                      <div className="text-[10px] font-bold text-slate-500">PAC</div>
                      <div className="text-xs font-bold text-slate-300">{player.pace || '-'}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-500">SHO</div>
                      <div className="text-xs font-bold text-slate-300">{player.shooting || '-'}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-500">PAS</div>
                      <div className="text-xs font-bold text-slate-300">{player.passing || '-'}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-500">DRI</div>
                      <div className="text-xs font-bold text-slate-300">{player.dribbling || '-'}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-500">DEF</div>
                      <div className="text-xs font-bold text-slate-300">{player.defending || '-'}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-500">PHY</div>
                      <div className="text-xs font-bold text-slate-300">{player.physical || '-'}</div>
                    </div>
                  </div>
                </div>

                {/* Optional card graphic hover visual overlay */}
                {player.card && (
                  <div className="absolute right-4 bottom-4 w-12 h-16 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300 overflow-hidden pointer-events-none">
                    <img src={player.card} alt="Card card art" className="w-full h-full object-contain" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-800 pt-6">
              <span className="text-xs text-slate-500 font-medium">
                Page <span className="text-slate-300">{pagination.page}</span> of <span className="text-slate-300">{pagination.pages}</span> &bull; Total: {pagination.total} players
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="p-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <FaChevronLeft size={12} />
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="p-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-400 hover:text-white rounded-lg transition-colors"
                >
                  <FaChevronRight size={12} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Players;
