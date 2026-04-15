'use client';

import { useState } from 'react';

export default function Tirage() {
  const [activeTab, setActiveTab] = useState<'poules' | 'eliminatoire'>('poules');

  // Données des poules
  const poules = {
    A: [
      { nom: 'AS Douanes', logo: '🦁', points: 6, joues: 2 },
      { nom: 'ASEC Mimosas', logo: '🦅', points: 4, joues: 2 },
      { nom: 'SOA', logo: '🐘', points: 1, joues: 2 },
      { nom: 'Bouaké FC', logo: '🐉', points: 0, joues: 2 },
    ],
    B: [
      { nom: 'Africa Sports', logo: '🐊', points: 6, joues: 2 },
      { nom: 'Stade d\'Abidjan', logo: '🏟️', points: 3, joues: 2 },
      { nom: 'Racing Club', logo: '🏎️', points: 3, joues: 2 },
      { nom: 'Williamsville', logo: '⚓', points: 0, joues: 2 },
    ],
    C: [
      { nom: 'San Pedro', logo: '⛵', points: 4, joues: 2 },
      { nom: 'Bassam', logo: '🌊', points: 4, joues: 2 },
      { nom: 'Korhogo', logo: '🏜️', points: 3, joues: 2 },
      { nom: 'Man FC', logo: '⛰️', points: 0, joues: 2 },
    ],
    D: [
      { nom: 'Daloa', logo: '🍫', points: 6, joues: 2 },
      { nom: 'Yamoussoukro', logo: '🏛️', points: 3, joues: 2 },
      { nom: 'Bondoukou', logo: '🎭', points: 3, joues: 2 },
      { nom: 'Odienné', logo: '🐃', points: 0, joues: 2 },
    ],
  };

  // Tableau des quarts de finale
  const quarts = [
    { id: 1, equipeA: '1er Groupe A', equipeB: '2ème Groupe B', date: '10 Mai 2026 - 16:00' },
    { id: 2, equipeA: '1er Groupe B', equipeB: '2ème Groupe A', date: '10 Mai 2026 - 18:30' },
    { id: 3, equipeA: '1er Groupe C', equipeB: '2ème Groupe D', date: '11 Mai 2026 - 16:00' },
    { id: 4, equipeA: '1er Groupe D', equipeB: '2ème Groupe C', date: '11 Mai 2026 - 18:30' },
  ];

  // Demi-finales
  const demis = [
    { id: 1, equipeA: 'Vainqueur QF1', equipeB: 'Vainqueur QF2', date: '17 Mai 2026 - 16:00' },
    { id: 2, equipeA: 'Vainqueur QF3', equipeB: 'Vainqueur QF4', date: '18 Mai 2026 - 16:00' },
  ];

  // Finale
  const finale = {
    equipeA: 'Vainqueur DF1',
    equipeB: 'Vainqueur DF2',
    date: '25 Mai 2026 - 17:00',
    lieu: 'Stade Félix Houphouët-Boigny',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚽</span>
              <span className="font-bold text-xl">STRONG COMPÉTITION</span>
            </div>
            <div className="space-x-4">
              <a href="/classement" className="hover:text-blue-300 transition">Classement</a>
              <a href="/matchs/en-direct" className="hover:text-blue-300 transition">Match en direct</a>
              <a href="/tirage" className="text-white font-semibold">Tirage</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="container mx-auto px-6 py-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">🎲 Tirage au sort</h1>
          <p className="text-gray-500 mt-2">Phase de groupes et tableau final</p>
          <div className="mt-4 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
            📅 Tirage effectué le 1er Mai 2026
          </div>
        </div>

        {/* Onglets */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 inline-flex">
            <button
              onClick={() => setActiveTab('poules')}
              className={`px-6 py-2 rounded-l-lg transition ${
                activeTab === 'poules'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📊 Phase de poules
            </button>
            <button
              onClick={() => setActiveTab('eliminatoire')}
              className={`px-6 py-2 rounded-r-lg transition ${
                activeTab === 'eliminatoire'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🏆 Phase éliminatoire
            </button>
          </div>
        </div>

        {/* Phase de poules */}
        {activeTab === 'poules' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(poules).map(([groupe, equipes]) => (
              <div key={groupe} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 text-center">
                  <h2 className="text-xl font-bold">Groupe {groupe}</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {equipes.map((equipe, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{equipe.logo}</span>
                        <div>
                          <p className="font-semibold text-gray-800">{equipe.nom}</p>
                          <p className="text-xs text-gray-400">{equipe.joues} matchs</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">{equipe.points} pts</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Phase éliminatoire */}
        {activeTab === 'eliminatoire' && (
          <div>
            {/* Quarts de finale */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🎯 Quarts de finale</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {quarts.map((qf) => (
                  <div key={qf.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 text-center">
                        <p className="font-bold text-gray-800">{qf.equipeA}</p>
                      </div>
                      <div className="px-4">
                        <span className="text-2xl text-gray-400">vs</span>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="font-bold text-gray-800">{qf.equipeB}</p>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-500">📅 {qf.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demi-finales */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🔥 Demi-finales</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {demis.map((df) => (
                  <div key={df.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 text-center">
                        <p className="font-semibold text-gray-800">{df.equipeA}</p>
                      </div>
                      <div className="px-4">
                        <span className="text-2xl text-gray-400">vs</span>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="font-semibold text-gray-800">{df.equipeB}</p>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-500">📅 {df.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Finale */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🏆 FINALE</h2>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center">
                  <div className="flex-1 text-center">
                    <div className="text-5xl mb-2">🏆</div>
                    <p className="font-bold text-white text-xl">{finale.equipeA}</p>
                  </div>
                  <div className="px-6">
                    <span className="text-3xl font-bold text-white">VS</span>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-5xl mb-2">🏆</div>
                    <p className="font-bold text-white text-xl">{finale.equipeB}</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-white font-semibold">📅 {finale.date}</p>
                  <p className="text-yellow-100 text-sm">📍 {finale.lieu}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Légende */}
        <div className="mt-12 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-sm text-gray-600">
            📌 Les équipes en <span className="font-semibold text-green-600">vert</span> sont qualifiées pour les quarts de finale
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Tirage réalisé le 1er Mai 2026 - Composition des groupes selon le classement
          </p>
        </div>
      </div>
    </div>
  );
}