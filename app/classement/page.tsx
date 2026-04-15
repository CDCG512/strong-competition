'use client';

import { useState } from 'react';

export default function Classement() {
  const [classement] = useState([
    { id: 1, position: 1, equipe: 'ASEC Mimosas', points: 9, joues: 3, gagnes: 3, nuls: 0, perdus: 0, bp: 8, bc: 2, diff: 6 },
    { id: 2, position: 2, equipe: 'Africa Sports', points: 7, joues: 3, gagnes: 2, nuls: 1, perdus: 0, bp: 6, bc: 3, diff: 3 },
    { id: 3, position: 3, equipe: 'AS Douanes', points: 6, joues: 3, gagnes: 2, nuls: 0, perdus: 1, bp: 5, bc: 3, diff: 2 },
    { id: 4, position: 4, equipe: 'Stade d\'Abidjan', points: 4, joues: 3, gagnes: 1, nuls: 1, perdus: 1, bp: 4, bc: 4, diff: 0 },
    { id: 5, position: 5, equipe: 'SOA', points: 3, joues: 3, gagnes: 1, nuls: 0, perdus: 2, bp: 3, bc: 5, diff: -2 },
    { id: 6, position: 6, equipe: 'Bouaké FC', points: 1, joues: 3, gagnes: 0, nuls: 1, perdus: 2, bp: 2, bc: 6, diff: -4 },
    { id: 7, position: 7, equipe: 'Racing Club', points: 0, joues: 3, gagnes: 0, nuls: 0, perdus: 3, bp: 1, bc: 7, diff: -6 },
  ]);

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
              <a href="/classement" className="text-white font-semibold">Classement</a>
              <a href="/matchs/en-direct" className="hover:text-blue-300 transition">Matchs</a>
              <a href="/tirage" className="hover:text-blue-300 transition">Tirage</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="container mx-auto px-6 py-8">
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">🏆 Classement général</h1>
            <p className="text-gray-500 mt-1">Phase de poules - Groupe A</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Mis à jour le 15/04/2026</p>
          </div>
        </div>

        {/* Légende */}
        <div className="bg-white rounded-lg p-4 mb-6 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>Qualification</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>Barrage</div>
          <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>Éliminé</div>
          <div className="flex items-center ml-auto">
            <span className="text-gray-400 text-xs">BP: Buts pour | BC: Buts contre | Diff: Différence</span>
          </div>
        </div>

        {/* Tableau classement */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="py-3 px-4 text-center">#</th>
                  <th className="py-3 px-4 text-left">Équipe</th>
                  <th className="py-3 px-4 text-center">J</th>
                  <th className="py-3 px-4 text-center">G</th>
                  <th className="py-3 px-4 text-center">N</th>
                  <th className="py-3 px-4 text-center">P</th>
                  <th className="py-3 px-4 text-center">BP</th>
                  <th className="py-3 px-4 text-center">BC</th>
                  <th className="py-3 px-4 text-center">Diff</th>
                  <th className="py-3 px-4 text-center">Pts</th>
                </tr>
              </thead>
              <tbody>
                {classement.map((team, index) => (
                  <tr 
                    key={team.id} 
                    className={`border-b hover:bg-gray-50 ${
                      team.equipe === 'AS Douanes' ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="py-3 px-4 text-center font-semibold">
                      {team.position === 1 && '🥇'}
                      {team.position === 2 && '🥈'}
                      {team.position === 3 && '🥉'}
                      {team.position > 3 && team.position}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800">
                      {team.equipe}
                      {team.equipe === 'AS Douanes' && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">Vous</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">{team.joues}</td>
                    <td className="py-3 px-4 text-center text-green-600 font-semibold">{team.gagnes}</td>
                    <td className="py-3 px-4 text-center text-yellow-600">{team.nuls}</td>
                    <td className="py-3 px-4 text-center text-red-600">{team.perdus}</td>
                    <td className="py-3 px-4 text-center">{team.bp}</td>
                    <td className="py-3 px-4 text-center">{team.bc}</td>
                    <td className={`py-3 px-4 text-center font-semibold ${team.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {team.diff > 0 ? `+${team.diff}` : team.diff}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-blue-600">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Meilleurs buteurs */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">⚽ Meilleurs buteurs</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-center">#</th>
                    <th className="py-3 px-4 text-left">Joueur</th>
                    <th className="py-3 px-4 text-left">Équipe</th>
                    <th className="py-3 px-4 text-center">Buts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-center font-bold">1</td>
                    <td className="py-3 px-4">Koffi Jean</td>
                    <td className="py-3 px-4">AS Douanes</td>
                    <td className="py-3 px-4 text-center font-bold text-green-600">3</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-center font-bold">2</td>
                    <td className="py-3 px-4">Traoré Amadou</td>
                    <td className="py-3 px-4">ASEC Mimosas</td>
                    <td className="py-3 px-4 text-center font-bold">2</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-center font-bold">3</td>
                    <td className="py-3 px-4">Koné Ibrahim</td>
                    <td className="py-3 px-4">AS Douanes</td>
                    <td className="py-3 px-4 text-center font-bold">2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Classement mis à jour automatiquement après chaque match</p>
        </div>
      </div>
    </div>
  );
}