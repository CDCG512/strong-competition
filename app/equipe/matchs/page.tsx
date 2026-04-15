'use client';

import { useState } from 'react';

export default function MesMatchs() {
  const [matchs] = useState([
    {
      id: 1,
      date: '20 Avril 2026',
      heure: '16:00',
      adversaire: 'ASEC Mimosas',
      lieu: 'Stade Municipal',
      scoreEquipe: null,
      scoreAdversaire: null,
      statut: 'à venir',
    },
    {
      id: 2,
      date: '27 Avril 2026',
      heure: '14:00',
      adversaire: 'Africa Sports',
      lieu: 'Stade Félix',
      scoreEquipe: null,
      scoreAdversaire: null,
      statut: 'à venir',
    },
    {
      id: 3,
      date: '04 Mai 2026',
      heure: '17:30',
      adversaire: 'Stade d\'Abidjan',
      lieu: 'Stade Municipal',
      scoreEquipe: null,
      scoreAdversaire: null,
      statut: 'à venir',
    },
  ]);

  const [matchsPasses] = useState([
    {
      id: 4,
      date: '10 Avril 2026',
      heure: '15:00',
      adversaire: 'SOA',
      lieu: 'Stade Robert',
      scoreEquipe: 2,
      scoreAdversaire: 1,
      statut: 'victoire',
    },
    {
      id: 5,
      date: '03 Avril 2026',
      heure: '16:30',
      adversaire: 'Bouaké FC',
      lieu: 'Stade de Bouaké',
      scoreEquipe: 1,
      scoreAdversaire: 1,
      statut: 'nul',
    },
  ]);

  const getStatutBadge = (statut: string) => {
    switch(statut) {
      case 'victoire':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Victoire</span>;
      case 'nul':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Match nul</span>;
      case 'défaite':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Défaite</span>;
      default:
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">À venir</span>;
    }
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
            <div className="flex items-center space-x-4">
              <span className="text-sm">AS Douanes</span>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation secondaire */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex space-x-6">
            <a href="/equipe/dashboard" className="py-3 text-gray-600 hover:text-blue-600">
              Dashboard
            </a>
            <a href="/equipe/mon-equipe" className="py-3 text-gray-600 hover:text-blue-600">
              Mon équipe
            </a>
            <a href="/equipe/matchs" className="py-3 text-blue-600 border-b-2 border-blue-600 font-semibold">
              Mes matchs
            </a>
            <a href="/classement" className="py-3 text-gray-600 hover:text-blue-600">
              Classement
            </a>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-6 py-8">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6">📅 Mes matchs</h1>

        {/* Prochains matchs */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-600 p-1 rounded-lg mr-2">⏰</span>
            Prochains matchs
          </h2>
          <div className="space-y-4">
            {matchs.map((match) => (
              <div key={match.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm">{match.date} à {match.heure}</p>
                    <p className="text-lg font-bold text-gray-800 mt-1">vs {match.adversaire}</p>
                    <p className="text-gray-500 text-sm mt-1">📍 {match.lieu}</p>
                  </div>
                  <div className="text-center my-4 md:my-0">
                    <div className="text-2xl font-bold text-gray-800">
                      {match.scoreEquipe !== null ? match.scoreEquipe : '?'} - {match.scoreAdversaire !== null ? match.scoreAdversaire : '?'}
                    </div>
                  </div>
                  <div>
                    {getStatutBadge(match.statut)}
                  </div>
                </div>
                {match.statut === 'à venir' && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                      📍 Voir le terrain →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Matchs passés */}
        {matchsPasses.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-gray-100 text-gray-600 p-1 rounded-lg mr-2">📊</span>
              Matchs passés
            </h2>
            <div className="space-y-4">
              {matchsPasses.map((match) => (
                <div key={match.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex-1">
                      <p className="text-gray-500 text-sm">{match.date}</p>
                      <p className="text-lg font-bold text-gray-800">vs {match.adversaire}</p>
                      <p className="text-gray-500 text-sm">📍 {match.lieu}</p>
                    </div>
                    <div className="text-center my-4 md:my-0">
                      <div className={`text-2xl font-bold ${
                        match.statut === 'victoire' ? 'text-green-600' : 
                        match.statut === 'nul' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {match.scoreEquipe} - {match.scoreAdversaire}
                      </div>
                    </div>
                    <div>
                      {getStatutBadge(match.statut)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}