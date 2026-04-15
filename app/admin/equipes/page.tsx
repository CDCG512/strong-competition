'use client';

import { useState } from 'react';

type Equipe = {
  id: number;
  nom: string;
  responsable: string;
  email: string;
  telephone: string;
  statutPaiement: boolean;
  statutCompetition: 'en_cours' | 'elimine' | 'qualifie';
  points: number;
  butsPour: number;
  butsContre: number;
  logo: string | null;
};

type Joueur = {
  id: number;
  nom: string;
  prenom: string;
  poste: string;
  numero: number;
};

export default function AdminEquipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([
    { id: 1, nom: 'AS Douanes', responsable: 'Jean Konan', email: 'contact@asdouanes.com', telephone: '+225 01 23 45 67', statutPaiement: true, statutCompetition: 'en_cours', points: 6, butsPour: 5, butsContre: 3, logo: null },
    { id: 2, nom: 'ASEC Mimosas', responsable: 'Amadou Traoré', email: 'asec@mimosas.ci', telephone: '+225 07 89 01 23', statutPaiement: true, statutCompetition: 'en_cours', points: 4, butsPour: 4, butsContre: 2, logo: null },
    { id: 3, nom: 'Africa Sports', responsable: 'Koffi Nguessan', email: 'africa@sports.ci', telephone: '+225 05 67 89 01', statutPaiement: true, statutCompetition: 'elimine', points: 1, butsPour: 2, butsContre: 5, logo: null },
    { id: 4, nom: 'Stade Abidjan', responsable: 'Yao Serge', email: 'stade@abidjan.ci', telephone: '+225 04 56 78 90', statutPaiement: true, statutCompetition: 'en_cours', points: 3, butsPour: 3, butsContre: 3, logo: null },
  ]);

  const [joueurs] = useState<Joueur[]>([
    { id: 1, nom: 'Koffi', prenom: 'Jean', poste: 'Attaquant', numero: 9 },
    { id: 2, nom: 'Traoré', prenom: 'Amadou', poste: 'Milieu', numero: 10 },
  ]);

  const [showAddEquipeModal, setShowAddEquipeModal] = useState(false);
  const [showDetailEquipeModal, setShowDetailEquipeModal] = useState(false);
  const [selectedEquipeDetail, setSelectedEquipeDetail] = useState<Equipe | null>(null);
  const [newEquipe, setNewEquipe] = useState({
    nom: '', responsable: '', email: '', telephone: '', statutPaiement: false
  });

  const validerPaiement = (id: number) => {
    setEquipes(equipes.map(e => e.id === id ? { ...e, statutPaiement: true } : e));
    alert('✅ Paiement validé avec succès');
  };

  const modifierStatut = (id: number, statut: 'en_cours' | 'elimine' | 'qualifie') => {
    setEquipes(equipes.map(e => e.id === id ? { ...e, statutCompetition: statut } : e));
    alert(`✅ Équipe ${statut === 'elimine' ? 'éliminée' : statut === 'qualifie' ? 'qualifiée' : 'réintégrée'}`);
  };

  const supprimerEquipe = (id: number) => {
    if (confirm('Supprimer cette équipe ?')) {
      setEquipes(equipes.filter(e => e.id !== id));
      alert('✅ Équipe supprimée');
    }
  };

  const ajouterEquipe = () => {
    if (!newEquipe.nom || !newEquipe.responsable || !newEquipe.email) {
      alert('Veuillez remplir les champs obligatoires');
      return;
    }
    const equipe: Equipe = {
      id: equipes.length + 1,
      ...newEquipe,
      statutCompetition: 'en_cours',
      points: 0,
      butsPour: 0,
      butsContre: 0,
      logo: null,
    };
    setEquipes([...equipes, equipe]);
    setShowAddEquipeModal(false);
    setNewEquipe({ nom: '', responsable: '', email: '', telephone: '', statutPaiement: false });
    alert('✅ Équipe ajoutée avec succès !');
  };

  const getStatutBadge = (statut: string) => {
    switch(statut) {
      case 'en_cours': return <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs">En cours</span>;
      case 'elimine': return <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs">Éliminé</span>;
      case 'qualifie': return <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs">Qualifié</span>;
      default: return <span className="px-2 py-1 bg-gray-600 text-white rounded-full text-xs">Inconnu</span>;
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
            <a href="/admin/matchs" className="px-3 sm:px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-t-lg transition text-sm">Matchs</a>
            <a href="/admin/equipes" className="px-3 sm:px-4 py-3 text-white bg-gray-700 rounded-t-lg text-sm">Équipes</a>
            <a href="/admin/paiements" className="px-3 sm:px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-t-lg transition text-sm">Paiements</a>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white">🏆 Gestion des équipes</h1>
          <button onClick={() => setShowAddEquipeModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto">+ Ajouter équipe</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4"><p className="text-gray-400 text-sm">Total</p><p className="text-2xl font-bold text-white">{equipes.length}</p></div>
          <div className="bg-gray-800 rounded-lg p-4"><p className="text-gray-400 text-sm">Payées</p><p className="text-2xl font-bold text-green-400">{equipes.filter(e => e.statutPaiement).length}</p></div>
          <div className="bg-gray-800 rounded-lg p-4"><p className="text-gray-400 text-sm">Qualifiées</p><p className="text-2xl font-bold text-blue-400">{equipes.filter(e => e.statutCompetition === 'qualifie').length}</p></div>
        </div>

        {/* Tableau */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-3 text-left text-gray-300 text-sm">Équipe</th>
                  <th className="py-3 px-3 text-left text-gray-300 text-sm hidden md:table-cell">Responsable</th>
                  <th className="py-3 px-3 text-center text-gray-300 text-sm">Points</th>
                  <th className="py-3 px-3 text-center text-gray-300 text-sm hidden sm:table-cell">Paiement</th>
                  <th className="py-3 px-3 text-center text-gray-300 text-sm">Statut</th>
                  <th className="py-3 px-3 text-center text-gray-300 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {equipes.map((equipe) => (
                  <tr key={equipe.id} className="hover:bg-gray-700/50">
                    <td className="py-3 px-3 font-semibold text-white text-sm">{equipe.nom}</td>
                    <td className="py-3 px-3 text-gray-300 text-sm hidden md:table-cell">{equipe.responsable}</td>
                    <td className="py-3 px-3 text-center text-white font-bold text-sm">{equipe.points}</td>
                    <td className="py-3 px-3 text-center hidden sm:table-cell">
                      {equipe.statutPaiement ? <span className="text-green-400 text-xs">✓ Payé</span> : <span className="text-yellow-400 text-xs">En attente</span>}
                    </td>
                    <td className="py-3 px-3 text-center">{getStatutBadge(equipe.statutCompetition)}</td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex flex-wrap gap-1 justify-center">
                        <button onClick={() => { setSelectedEquipeDetail(equipe); setShowDetailEquipeModal(true); }} className="bg-green-600 text-white px-2 py-1 rounded text-xs">👁️</button>
                        {!equipe.statutPaiement && <button onClick={() => validerPaiement(equipe.id)} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">💳</button>}
                        <select onChange={(e) => modifierStatut(equipe.id, e.target.value as any)} className="bg-gray-600 text-white px-1 py-1 rounded text-xs">
                          <option value="en_cours">En cours</option>
                          <option value="qualifie">Qualifier</option>
                          <option value="elimine">Éliminer</option>
                        </select>
                        <button onClick={() => supprimerEquipe(equipe.id)} className="bg-red-600 text-white px-2 py-1 rounded text-xs">🗑️</button>
                      </div>
                     </td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL Ajout équipe */}
      {showAddEquipeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">➕ Ajouter une équipe</h2>
            <input type="text" placeholder="Nom équipe" value={newEquipe.nom} onChange={(e) => setNewEquipe({...newEquipe, nom: e.target.value})} className="w-full mb-3 px-3 py-2 bg-gray-700 rounded-lg text-white" />
            <input type="text" placeholder="Responsable" value={newEquipe.responsable} onChange={(e) => setNewEquipe({...newEquipe, responsable: e.target.value})} className="w-full mb-3 px-3 py-2 bg-gray-700 rounded-lg text-white" />
            <input type="email" placeholder="Email" value={newEquipe.email} onChange={(e) => setNewEquipe({...newEquipe, email: e.target.value})} className="w-full mb-3 px-3 py-2 bg-gray-700 rounded-lg text-white" />
            <input type="tel" placeholder="Téléphone" value={newEquipe.telephone} onChange={(e) => setNewEquipe({...newEquipe, telephone: e.target.value})} className="w-full mb-4 px-3 py-2 bg-gray-700 rounded-lg text-white" />
            <div className="flex gap-3"><button onClick={ajouterEquipe} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Ajouter</button><button onClick={() => setShowAddEquipeModal(false)} className="flex-1 bg-gray-600 text-white py-2 rounded-lg">Annuler</button></div>
          </div>
        </div>
      )}

      {/* MODAL Détails équipe */}
      {showDetailEquipeModal && selectedEquipeDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-white">📋 {selectedEquipeDetail.nom}</h2>
              <button onClick={() => setShowDetailEquipeModal(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
            </div>
            <div className="space-y-3 text-gray-300">
              <p><span className="font-semibold">Responsable:</span> {selectedEquipeDetail.responsable}</p>
              <p><span className="font-semibold">Email:</span> {selectedEquipeDetail.email}</p>
              <p><span className="font-semibold">Téléphone:</span> {selectedEquipeDetail.telephone}</p>
              <p><span className="font-semibold">Points:</span> {selectedEquipeDetail.points}</p>
              <p><span className="font-semibold">Buts:</span> {selectedEquipeDetail.butsPour} pour / {selectedEquipeDetail.butsContre} contre</p>
              <p><span className="font-semibold">Paiement:</span> {selectedEquipeDetail.statutPaiement ? '✅ Payé' : '⏳ En attente'}</p>
            </div>
            <h3 className="text-lg font-bold text-white mt-4 mb-2">👥 Joueurs</h3>
            <div className="bg-gray-700 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-600"><tr><th className="p-2 text-left">N°</th><th className="p-2 text-left">Nom</th><th className="p-2 text-left">Poste</th></tr></thead>
                <tbody>
                  {joueurs.map(j => <tr key={j.id} className="border-b border-gray-600"><td className="p-2">{j.numero}</td><td className="p-2">{j.nom} {j.prenom}</td><td className="p-2">{j.poste}</td></tr>)}
                </tbody>
              </table>
            </div>
            <button onClick={() => setShowDetailEquipeModal(false)} className="mt-4 w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-lg">Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}