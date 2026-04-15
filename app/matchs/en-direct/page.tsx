'use client';

import { useState, useEffect } from 'react';

// Types pour les buteurs
type Buteur = {
  id: number;
  nom: string;
  prenom: string;
  minute: number;
  photo: string | null;
};

export default function MatchEnDirect() {
  const [score, setScore] = useState({ equipeA: 0, equipeB: 0 });
  const [temps, setTemps] = useState(0);
  const [statut, setStatut] = useState<'avant-match' | 'en-direct' | 'termine'>('en-direct');
  const [buteurs, setButeurs] = useState<Buteur[]>([]);
  const [newButMinute, setNewButMinute] = useState('');
  const [newButJoueur, setNewButJoueur] = useState('');
  const [showAddBut, setShowAddBut] = useState(false);

  // Simulation du chronomètre
  useEffect(() => {
    if (statut === 'en-direct' && temps < 90) {
      const interval = setInterval(() => {
        setTemps(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (temps >= 90 && statut === 'en-direct') {
      setStatut('termine');
    }
  }, [temps, statut]);

  // Ajouter un but
  const ajouterBut = (equipe: 'A' | 'B') => {
    if (!newButMinute || !newButJoueur) {
      alert('Veuillez entrer la minute et le nom du joueur');
      return;
    }

    if (equipe === 'A') {
      setScore(prev => ({ ...prev, equipeA: prev.equipeA + 1 }));
    } else {
      setScore(prev => ({ ...prev, equipeB: prev.equipeB + 1 }));
    }

    const nouveauButeur: Buteur = {
      id: Date.now(),
      nom: newButJoueur.split(' ')[0],
      prenom: newButJoueur.split(' ')[1] || '',
      minute: parseInt(newButMinute),
      photo: null,
    };

    setButeurs([...buteurs, nouveauButeur]);
    setNewButMinute('');
    setNewButJoueur('');
    setShowAddBut(false);
  };

  const getTempsString = () => {
    if (statut === 'avant-match') return 'Match à venir';
    if (statut === 'termine') return 'Match terminé';
    return `${temps}' ${temps >= 45 && temps < 90 ? '(2ème mi-temps)' : '(1ère mi-temps)'}`;
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
              <a href="/matchs/en-direct" className="text-white font-semibold">Match en direct</a>
              <a href="/tirage" className="hover:text-blue-300 transition">Tirage</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <div className="container mx-auto px-6 py-8">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6">⚽ Match en direct</h1>

        {/* Carte du match */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          
          {/* Entête match */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
            <div className="text-center">
              <p className="text-sm opacity-90">Demi-finale</p>
              <p className="text-lg font-bold">Stade Municipal • 16:00</p>
            </div>
          </div>

          {/* Score */}
          <div className="p-8">
            <div className="flex justify-between items-center">
              {/* Équipe A */}
              <div className="text-center flex-1">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl">
                  🦁
                </div>
                <h2 className="text-xl font-bold text-gray-800">AS Douanes</h2>
                <p className="text-gray-500 text-sm">Domicile</p>
              </div>

              {/* Score */}
              <div className="text-center px-8">
                <div className="text-6xl font-bold text-gray-800">
                  {score.equipeA} - {score.equipeB}
                </div>
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    statut === 'en-direct' ? 'bg-red-500 text-white animate-pulse' :
                    statut === 'termine' ? 'bg-gray-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {getTempsString()}
                  </span>
                </div>
              </div>

              {/* Équipe B */}
              <div className="text-center flex-1">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl">
                  🦅
                </div>
                <h2 className="text-xl font-bold text-gray-800">ASEC Mimosas</h2>
                <p className="text-gray-500 text-sm">Extérieur</p>
              </div>
            </div>
          </div>

          {/* Buteurs */}
          <div className="bg-gray-50 p-4 border-t border-gray-200">
            <h3 className="font-bold text-gray-700 mb-3">⚽ Buteurs</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-600 font-semibold mb-2">AS Douanes</p>
                {buteurs.length > 0 ? (
                  <div className="space-y-2">
                    {buteurs.map(buteur => (
                      <div key={buteur.id} className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs">
                          🎯
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{buteur.nom} {buteur.prenom}</p>
                          <p className="text-xs text-gray-500">{buteur.minute}'</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Aucun buteur</p>
                )}
              </div>
              <div>
                <p className="text-sm text-green-600 font-semibold mb-2">ASEC Mimosas</p>
                <p className="text-gray-400 text-sm">Aucun buteur</p>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation admin (pour tester) */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-bold text-yellow-800 mb-3">🛠️ Simulation (Admin)</h3>
          <p className="text-sm text-yellow-700 mb-3">Zone de test pour simuler les buts en direct</p>
          
          {!showAddBut ? (
            <button
              onClick={() => setShowAddBut(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              + Ajouter un but
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Minute"
                  value={newButMinute}
                  onChange={(e) => setNewButMinute(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg w-24"
                />
                <input
                  type="text"
                  placeholder="Nom du joueur (ex: Koffi Jean)"
                  value={newButJoueur}
                  onChange={(e) => setNewButJoueur(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => ajouterBut('A')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  AS Douanes marque
                </button>
                <button
                  onClick={() => ajouterBut('B')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  ASEC marque
                </button>
                <button
                  onClick={() => setShowAddBut(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          {statut === 'en-direct' && temps < 90 && (
            <div className="mt-3 text-sm text-yellow-700">
              ⏱️ Chronomètre actif : {temps} minutes
            </div>
          )}
        </div>

        {/* Matchs à venir */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📅 Prochains matchs</h2>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">27 Avril 2026 - 14:00</p>
                  <p className="font-semibold">Africa Sports vs Bouaké FC</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">À venir</span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">04 Mai 2026 - 16:30</p>
                  <p className="font-semibold">SOA vs Stade d'Abidjan</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">À venir</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}