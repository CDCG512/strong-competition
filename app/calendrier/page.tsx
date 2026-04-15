'use client';

import { useState } from 'react';

type Match = {
  id: number;
  equipeA: string;
  equipeB: string;
  date: string;
  heure: string;
  terrain: string;
  phase: string;
  scoreA: number | null;
  scoreB: number | null;
};

export default function Calendrier() {
  const [matchs] = useState<Match[]>([
    { id: 1, equipeA: 'AS Douanes', equipeB: 'ASEC Mimosas', date: '2026-05-10', heure: '16:00', terrain: 'Stade Félix', phase: 'Poule A', scoreA: null, scoreB: null },
    { id: 2, equipeA: 'Africa Sports', equipeB: 'Stade Abidjan', date: '2026-05-10', heure: '18:00', terrain: 'Stade Municipal', phase: 'Poule A', scoreA: null, scoreB: null },
    { id: 3, equipeA: 'AS Douanes', equipeB: 'Africa Sports', date: '2026-05-17', heure: '16:00', terrain: 'Stade Félix', phase: 'Poule A', scoreA: null, scoreB: null },
    { id: 4, equipeA: 'ASEC Mimosas', equipeB: 'Stade Abidjan', date: '2026-05-17', heure: '18:00', terrain: 'Stade Municipal', phase: 'Poule A', scoreA: null, scoreB: null },
    { id: 5, equipeA: 'Bouaké FC', equipeB: 'SOA', date: '2026-05-10', heure: '16:00', terrain: 'Stade de Bouaké', phase: 'Poule B', scoreA: null, scoreB: null },
    { id: 6, equipeA: 'Racing Club', equipeB: 'Williamsville', date: '2026-05-10', heure: '18:00', terrain: 'Stade Robert', phase: 'Poule B', scoreA: null, scoreB: null },
  ]);

  const [filter, setFilter] = useState('all');
  const [view, setView] = useState<'list' | 'grid'>('list');

  const filteredMatchs = filter === 'all' ? matchs : matchs.filter(m => m.phase === filter);

  const phases = ['all', 'Poule A', 'Poule B', 'Poule C', 'Poule D', 'Quart', 'Demi', 'Finale'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚽</span>
              <span className="font-bold text-xl">STRONG COMPÉTITION</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/classement" className="hover:text-blue-300 transition">Classement</a>
              <a href="/matchs/en-direct" className="hover:text-blue-300 transition">Match en direct</a>
              <a href="/tirage" className="hover:text-blue-300 transition">Tirage</a>
              <a href="/calendrier" className="text-white font-semibold border-b-2 border-white pb-1">Calendrier</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📅 Calendrier des matchs</h1>
          <div className="flex gap-2">
            <button onClick={() => setView('list')} className={`px-3 py-1 rounded ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>📋 Liste</button>
            <button onClick={() => setView('grid')} className={`px-3 py-1 rounded ${view === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>🔲 Grille</button>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-6">
          {phases.map(p => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 py-1.5 rounded-full text-sm transition ${
                filter === p ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {p === 'all' ? 'Tous' : p}
            </button>
          ))}
        </div>

        {/* Vue Liste */}
        {view === 'list' && (
          <div className="space-y-4">
            {filteredMatchs.map((match) => (
              <div key={match.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-4 hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex-1 text-center md:text-left">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{match.phase}</span>
                    <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                      <span className="font-bold text-lg">{match.equipeA}</span>
                      <span className="text-gray-400 text-xl">vs</span>
                      <span className="font-bold text-lg">{match.equipeB}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">{match.date.split('-').reverse().join('/')}</p>
                    <p className="text-gray-500 text-sm">{match.heure}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-gray-600 text-sm">📍 {match.terrain}</p>
                    {match.scoreA !== null && (
                      <p className="text-sm font-bold text-green-600 mt-1">Score: {match.scoreA} - {match.scoreB}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Vue Grille */}
        {view === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMatchs.map((match) => (
              <div key={match.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-4 hover:shadow-lg transition">
                <div className="text-center">
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{match.phase}</span>
                  <div className="mt-3">
                    <p className="font-bold">{match.equipeA}</p>
                    <p className="text-gray-400 text-sm">vs</p>
                    <p className="font-bold">{match.equipeB}</p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm font-semibold">{match.date.split('-').reverse().join('/')} à {match.heure}</p>
                    <p className="text-xs text-gray-500">{match.terrain}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredMatchs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Aucun match trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}