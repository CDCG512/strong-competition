'use client';

import { useState } from 'react';

type Match = {
  id: number;
  equipeA: string;
  equipeB: string;
  scoreA: number | null;
  scoreB: number | null;
  date: string;
  heure: string;
  terrain: string;
  arbitre: string;
  statut: 'à venir' | 'en direct' | 'terminé';
  phase: 'poule' | 'quart' | 'demi' | 'finale';
  groupe?: string;
};

type Buteur = {
  id: number;
  matchId: number;
  joueur: string;
  minute: number;
  equipe: 'A' | 'B';
  photo: string | null;
};

type Terrain = { id: number; nom: string; };
type Arbitre = { id: number; nom: string; prenom: string; };

export default function AdminMatchs() {
  const [matchs, setMatchs] = useState<Match[]>([
    { id: 1, equipeA: 'AS Douanes', equipeB: 'ASEC Mimosas', scoreA: 0, scoreB: 0, date: '2026-05-10', heure: '16:00', terrain: 'Stade Félix', arbitre: 'Koné Ibrahim', statut: 'en direct', phase: 'poule', groupe: 'A' },
    { id: 2, equipeA: 'Africa Sports', equipeB: 'Stade Abidjan', scoreA: null, scoreB: null, date: '2026-05-10', heure: '18:00', terrain: 'Stade Municipal', arbitre: 'Traoré Amadou', statut: 'à venir', phase: 'poule', groupe: 'A' },
    { id: 3, equipeA: 'Bouaké FC', equipeB: 'SOA', scoreA: 2, scoreB: 1, date: '2026-05-09', heure: '16:00', terrain: 'Stade de Bouaké', arbitre: 'Koné Ibrahim', statut: 'terminé', phase: 'poule', groupe: 'B' },
  ]);

  const [buteurs, setButeurs] = useState<Buteur[]>([
    { id: 1, matchId: 1, joueur: 'Koffi Jean', minute: 35, equipe: 'A', photo: null },
    { id: 2, matchId: 1, joueur: 'Koné Ibrahim', minute: 55, equipe: 'B', photo: null },
    { id: 3, matchId: 3, joueur: 'Traoré Amadou', minute: 23, equipe: 'A', photo: null },
  ]);

  const [showButeurModal, setShowButeurModal] = useState(false);
  const [showEditMatchModal, setShowEditMatchModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [buteurData, setButeurData] = useState({ joueur: '', minute: '', equipe: 'A', photo: null as File | null });
  const [scoreData, setScoreData] = useState({ scoreA: '', scoreB: '' });

  const terrains: Terrain[] = [{ id: 1, nom: 'Stade Félix' }, { id: 2, nom: 'Stade Municipal' }, { id: 3, nom: 'Stade de Bouaké' }];
  const arbitres: Arbitre[] = [{ id: 1, nom: 'Koné', prenom: 'Ibrahim' }, { id: 2, nom: 'Traoré', prenom: 'Amadou' }];

  const ouvrirButeurModal = (match: Match) => {
    setSelectedMatch(match);
    setButeurData({ joueur: '', minute: '', equipe: 'A', photo: null });
    setShowButeurModal(true);
  };

  const ouvrirScoreModal = (match: Match) => {
    setSelectedMatch(match);
    setScoreData({ scoreA: match.scoreA?.toString() || '0', scoreB: match.scoreB?.toString() || '0' });
    setShowScoreModal(true);
  };

  const ajouterButeur = () => {
    if (!buteurData.joueur || !buteurData.minute) {
      alert('Veuillez entrer le nom du joueur et la minute');
      return;
    }
    const nouveauButeur: Buteur = {
      id: buteurs.length + 1,
      matchId: selectedMatch!.id,
      joueur: buteurData.joueur,
      minute: parseInt(buteurData.minute),
      equipe: buteurData.equipe as 'A' | 'B',
      photo: null,
    };
    setButeurs([...buteurs, nouveauButeur]);
    
    // Mettre à jour le score
    if (buteurData.equipe === 'A') {
      setMatchs(matchs.map(m => m.id === selectedMatch!.id ? { ...m, scoreA: (m.scoreA || 0) + 1 } : m));
    } else {
      setMatchs(matchs.map(m => m.id === selectedMatch!.id ? { ...m, scoreB: (m.scoreB || 0) + 1 } : m));
    }
    
    alert(`✅ Buteur ajouté: ${buteurData.joueur} (${buteurData.minute}')`);
    setShowButeurModal(false);
  };

  const mettreAJourScore = () => {
    if (!selectedMatch) return;
    
    const nouveauScoreA = parseInt(scoreData.scoreA);
    const nouveauScoreB = parseInt(scoreData.scoreB);
    
    // CORRECTION : On garde le statut actuel, on ne le change pas automatiquement
    setMatchs(matchs.map(m => m.id === selectedMatch.id ? { 
      ...m, 
      scoreA: nouveauScoreA, 
      scoreB: nouveauScoreB
    } : m));
    
    alert(`✅ Score mis à jour: ${selectedMatch.equipeA} ${nouveauScoreA} - ${nouveauScoreB} ${selectedMatch.equipeB}`);
    setShowScoreModal(false);
  };

  const modifierStatutMatch = (id: number, statut: 'à venir' | 'en direct' | 'terminé') => {
    setMatchs(matchs.map(m => m.id === id ? { ...m, statut } : m));
    alert(`✅ Statut du match changé: ${statut === 'en direct' ? '🔴 EN DIRECT' : statut === 'terminé' ? '🏁 Terminé' : '📅 À venir'}`);
  };

  const modifierMatch = () => {
    alert('✅ Match modifié avec succès');
    setShowEditMatchModal(false);
  };

  const supprimerMatch = (id: number) => {
    if (confirm('Supprimer ce match ?')) {
      setMatchs(matchs.filter(m => m.id !== id));
      alert('✅ Match supprimé');
    }
  };

  const getMatchButeurs = (matchId: number) => buteurs.filter(b => b.matchId === matchId);
  
  const getStatutBadge = (statut: string) => {
    switch(statut) {
      case 'en direct': return <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs animate-pulse">🔴 EN DIRECT</span>;
      case 'terminé': return <span className="px-2 py-1 bg-gray-600 text-white rounded-full text-xs">🏁 Terminé</span>;
      default: return <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs">📅 À venir</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">👑</span>
              <span className="font-bold text-xl text-white">ADMIN - Strong Compétition</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 overflow-x-auto">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex gap-1 min-w-max">
            <a href="/admin/dashboard" className="px-3 sm:px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-t-lg transition text-sm">Dashboard</a>
            <a href="/admin/matchs" className="px-3 sm:px-4 py-3 text-white bg-gray-700 rounded-t-lg text-sm">Matchs</a>
            <a href="/admin/equipes" className="px-3 sm:px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-t-lg transition text-sm">Équipes</a>
            <a href="/admin/paiements" className="px-3 sm:px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-t-lg transition text-sm">Paiements</a>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white">⚽ Gestion des matchs</h1>
          <button onClick={() => alert('Formulaire création match')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto">+ Nouveau match</button>
        </div>

        {/* Instructions */}
        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3 mb-6">
          <p className="text-blue-300 text-sm text-center">
            📌 Pour mettre à jour le score en direct : cliquez sur <span className="font-bold">🎯 Score</span> à côté du match concerné
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr className="text-xs sm:text-sm">
                  <th className="py-3 px-2 text-left text-gray-300">Équipe A</th>
                  <th className="py-3 px-2 text-center text-gray-300">Score</th>
                  <th className="py-3 px-2 text-left text-gray-300">Équipe B</th>
                  <th className="py-3 px-2 text-center text-gray-300 hidden md:table-cell">Date</th>
                  <th className="py-3 px-2 text-center text-gray-300">Statut</th>
                  <th className="py-3 px-2 text-center text-gray-300">Buteurs</th>
                  <th className="py-3 px-2 text-center text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {matchs.map((match) => (
                  <tr key={match.id} className={`hover:bg-gray-700/50 ${match.statut === 'en direct' ? 'bg-red-900/20' : ''}`}>
                    <td className="py-3 px-2 text-white text-sm font-semibold">{match.equipeA}</td>
                    <td className="py-3 px-2 text-center">
                      <div className="text-xl font-bold text-white">
                        {match.scoreA !== null ? match.scoreA : '-'} - {match.scoreB !== null ? match.scoreB : '-'}
                      </div>
                      {match.statut === 'en direct' && (
                        <button onClick={() => ouvrirScoreModal(match)} className="mt-1 bg-yellow-600 text-white px-2 py-0.5 rounded text-xs animate-pulse">
                          🎯 Mettre à jour
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-2 text-white text-sm font-semibold">{match.equipeB}</td>
                    <td className="py-3 px-2 text-center text-gray-400 text-xs hidden md:table-cell">
                      {match.date}<br/>{match.heure}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex flex-col gap-1 items-center">
                        {getStatutBadge(match.statut)}
                        <select 
                          value={match.statut} 
                          onChange={(e) => modifierStatutMatch(match.id, e.target.value as any)}
                          className="bg-gray-700 text-white text-xs rounded px-1 py-0.5"
                        >
                          <option value="à venir">📅 À venir</option>
                          <option value="en direct">🔴 EN DIRECT</option>
                          <option value="terminé">🏁 Terminé</option>
                        </select>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <button onClick={() => ouvrirButeurModal(match)} className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">
                        ⚽ {getMatchButeurs(match.id).length}
                      </button>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex gap-1 justify-center">
                        {match.statut === 'en direct' && (
                          <button onClick={() => ouvrirScoreModal(match)} className="bg-green-600 text-white px-2 py-1 rounded text-xs">🎯 Score</button>
                        )}
                        <button onClick={() => { setSelectedMatch(match); setShowEditMatchModal(true); }} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">✏️</button>
                        <button onClick={() => supprimerMatch(match.id)} className="bg-red-600 text-white px-2 py-1 rounded text-xs">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Liste des buteurs par match */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-white mb-4">⚽ Buteurs par match</h2>
          <div className="space-y-3">
            {matchs.map(match => {
              const buteursMatch = getMatchButeurs(match.id);
              if (buteursMatch.length === 0) return null;
              return (
                <div key={match.id} className="bg-gray-800 rounded-lg p-3">
                  <p className="text-gray-400 text-sm mb-2">
                    {match.equipeA} {match.scoreA !== null ? match.scoreA : '?'} - {match.scoreB !== null ? match.scoreB : '?'} {match.equipeB}
                    {match.statut === 'en direct' && <span className="ml-2 text-red-400 text-xs animate-pulse">● EN DIRECT</span>}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {buteursMatch.map(b => (
                      <div key={b.id} className={`rounded-full px-3 py-1 text-xs text-white ${b.equipe === 'A' ? 'bg-blue-700' : 'bg-green-700'}`}>
                        {b.joueur} ({b.minute}') {b.equipe === 'A' ? '🏠' : '✈️'}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL Mise à jour score en direct */}
      {showScoreModal && selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🎯</div>
              <h2 className="text-xl font-bold text-white">Mise à jour du score</h2>
              <p className="text-gray-400 text-sm mt-1">Match en direct</p>
            </div>
            
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 mb-4">
              <p className="text-red-300 text-xs text-center animate-pulse">🔴 MODE EN DIRECT - Mise à jour instantanée</p>
            </div>
            
            <div className="flex gap-4 mb-6">
              <div className="flex-1 text-center">
                <label className="block text-gray-300 text-sm mb-2">{selectedMatch.equipeA}</label>
                <input
                  type="number"
                  value={scoreData.scoreA}
                  onChange={(e) => setScoreData({...scoreData, scoreA: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-center text-3xl font-bold"
                />
              </div>
              <div className="flex items-center text-3xl font-bold text-gray-400">-</div>
              <div className="flex-1 text-center">
                <label className="block text-gray-300 text-sm mb-2">{selectedMatch.equipeB}</label>
                <input
                  type="number"
                  value={scoreData.scoreB}
                  onChange={(e) => setScoreData({...scoreData, scoreB: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-center text-3xl font-bold"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button onClick={mettreAJourScore} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition">
                ✅ Mettre à jour le score
              </button>
              <button onClick={() => setShowScoreModal(false)} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition">
                Annuler
              </button>
            </div>
            
            <p className="text-center text-gray-500 text-xs mt-4">
              ⚠️ Cette action est immédiate et visible par tous les spectateurs
            </p>
          </div>
        </div>
      )}

      {/* MODAL Buteurs */}
      {showButeurModal && selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">⚽ Ajouter un buteur</h2>
            <p className="text-gray-400 text-sm mb-4">{selectedMatch.equipeA} vs {selectedMatch.equipeB}</p>
            
            <select value={buteurData.equipe} onChange={(e) => setButeurData({...buteurData, equipe: e.target.value})} className="w-full mb-3 px-3 py-2 bg-gray-700 rounded-lg text-white">
              <option value="A">{selectedMatch.equipeA}</option>
              <option value="B">{selectedMatch.equipeB}</option>
            </select>
            
            <input type="text" placeholder="Nom du joueur" value={buteurData.joueur} onChange={(e) => setButeurData({...buteurData, joueur: e.target.value})} className="w-full mb-3 px-3 py-2 bg-gray-700 rounded-lg text-white" />
            
            <input type="number" placeholder="Minute" value={buteurData.minute} onChange={(e) => setButeurData({...buteurData, minute: e.target.value})} className="w-full mb-3 px-3 py-2 bg-gray-700 rounded-lg text-white" />
            
            <input type="file" accept="image/*" onChange={(e) => setButeurData({...buteurData, photo: e.target.files?.[0] || null})} className="w-full mb-4 text-white text-sm" />
            
            <div className="flex gap-3">
              <button onClick={ajouterButeur} className="flex-1 bg-green-600 text-white py-2 rounded-lg">Ajouter</button>
              <button onClick={() => setShowButeurModal(false)} className="flex-1 bg-gray-600 text-white py-2 rounded-lg">Annuler</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL Modifier match */}
      {showEditMatchModal && selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">✏️ Modifier le match</h2>
            
            <select className="w-full mb-3 px-3 py-2 bg-gray-700 rounded-lg text-white">
              <option>{selectedMatch.equipeA}</option>
              {matchs.filter(m => m.id !== selectedMatch.id).map(m => <option key={m.id}>{m.equipeA}</option>)}
            </select>
            
            <select className="w-full mb-3 px-3 py-2 bg-gray-700 rounded-lg text-white">
              <option>{selectedMatch.equipeB}</option>
              {matchs.filter(m => m.id !== selectedMatch.id).map(m => <option key={m.id}>{m.equipeB}</option>)}
            </select>
            
            <input type="date" defaultValue={selectedMatch.date} className="w-full mb-3 px-3 py-2 bg-gray-700 rounded-lg text-white" />
            <input type="time" defaultValue={selectedMatch.heure} className="w-full mb-3 px-3 py-2 bg-gray-700 rounded-lg text-white" />
            
            <select className="w-full mb-4 px-3 py-2 bg-gray-700 rounded-lg text-white">
              {terrains.map(t => <option key={t.id}>{t.nom}</option>)}
            </select>
            
            <select className="w-full mb-4 px-3 py-2 bg-gray-700 rounded-lg text-white">
              {arbitres.map(a => <option key={a.id}>{a.nom} {a.prenom}</option>)}
            </select>
            
            <div className="flex gap-3">
              <button onClick={modifierMatch} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Enregistrer</button>
              <button onClick={() => setShowEditMatchModal(false)} className="flex-1 bg-gray-600 text-white py-2 rounded-lg">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}