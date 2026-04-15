'use client';

import { useState, useEffect } from 'react';

type Joueur = {
  id: number;
  nom: string;
  prenom: string;
  age: number;
  poste: string;
  numero: number;
  photo: string | null;
};

export default function DashboardEquipe() {
  const [user, setUser] = useState<any>(null);
  const [showProfilModal, setShowProfilModal] = useState(false);
  
  const [equipe, setEquipe] = useState({
    id: 1,
    nom: 'AS Douanes',
    logo: null,
    responsable: 'Jean Konan',
    email: 'contact@asdouanes.com',
    telephone: '+225 01 23 45 67',
    statutPaiement: true,
    dateInscription: '15/04/2026'
  });

  const [profilData, setProfilData] = useState({
    nom: 'AS Douanes',
    responsable: 'Jean Konan',
    email: 'contact@asdouanes.com',
    telephone: '+225 01 23 45 67',
    logo: null as File | null,
  });

  const [joueurs, setJoueurs] = useState<Joueur[]>([
    { id: 1, nom: 'Koffi', prenom: 'Jean', age: 24, poste: 'Attaquant', numero: 9, photo: null },
    { id: 2, nom: 'Traoré', prenom: 'Amadou', age: 26, poste: 'Milieu', numero: 10, photo: null },
    { id: 3, nom: 'Koné', prenom: 'Ibrahim', age: 28, poste: 'Défenseur', numero: 5, photo: null },
  ]);

  const [prochainMatch] = useState({
    adversaire: 'ASEC Mimosas',
    date: 'Samedi 20 Avril 2026',
    heure: '16h00',
    terrain: 'Stade Municipal'
  });

  const [stats] = useState({
    matchsJoues: 0,
    victoires: 0,
    nuls: 0,
    defaites: 0,
    butsPour: 0,
    butsContre: 0
  });

  useEffect(() => {
    const stored = localStorage.getItem('strong_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleProfilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfilData({ ...profilData, [e.target.name]: e.target.value });
  };

  const sauvegarderProfil = () => {
    setEquipe({
      ...equipe,
      nom: profilData.nom,
      responsable: profilData.responsable,
      email: profilData.email,
      telephone: profilData.telephone,
    });
    alert('✅ Profil modifié avec succès !');
    setShowProfilModal(false);
  };

  const deconnexion = () => {
    localStorage.removeItem('strong_user');
    window.location.href = '/login';
  };

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
            <div className="flex items-center gap-4">
              <span className="text-sm hidden sm:inline">{equipe.nom}</span>
              <button onClick={() => setShowProfilModal(true)} className="text-gray-300 hover:text-white text-sm">⚙️ Profil</button>
              <button onClick={deconnexion} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg text-sm transition">🚪 Déconnexion</button>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation secondaire */}
      <div className="bg-white border-b shadow-sm overflow-x-auto">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex gap-6 min-w-max">
            <a href="/equipe/dashboard" className="py-3 text-blue-600 border-b-2 border-blue-600 font-semibold">Dashboard</a>
            <a href="/equipe/mon-equipe" className="py-3 text-gray-600 hover:text-blue-600">Mon équipe</a>
            <a href="/equipe/matchs" className="py-3 text-gray-600 hover:text-blue-600">Mes matchs</a>
            <a href="/classement" className="py-3 text-gray-600 hover:text-blue-600">Classement</a>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Bienvenue */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white mb-8">
          <h1 className="text-2xl font-bold">Bienvenue {equipe.responsable} ! 👋</h1>
          <p className="text-blue-100 mt-1">Préparez votre équipe pour la compétition</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="text-blue-600 text-2xl sm:text-3xl mb-2">📊</div>
            <p className="text-gray-500 text-xs sm:text-sm">Matchs joués</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.matchsJoues}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="text-green-600 text-2xl sm:text-3xl mb-2">🏆</div>
            <p className="text-gray-500 text-xs sm:text-sm">Victoires</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.victoires}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="text-yellow-600 text-2xl sm:text-3xl mb-2">⚽</div>
            <p className="text-gray-500 text-xs sm:text-sm">Buts marqués</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stats.butsPour}</p>
          </div>
        </div>

        {/* Prochain match */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">📅 Prochain match</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">Adversaire</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{prochainMatch.adversaire}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">Date & Heure</p>
              <p className="text-base sm:text-lg font-semibold">{prochainMatch.date}</p>
              <p className="text-blue-600 font-semibold">{prochainMatch.heure}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 text-sm">Terrain</p>
              <p className="text-base sm:text-lg font-semibold">{prochainMatch.terrain}</p>
            </div>
          </div>
        </div>

        {/* Effectif */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">👥 Effectif</h2>
            <a href="/equipe/mon-equipe">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition w-full sm:w-auto">
                + Gérer l'effectif
              </button>
            </a>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-gray-500 text-xs sm:text-sm">
                  <th className="text-left py-3">N°</th>
                  <th className="text-left py-3">Nom</th>
                  <th className="text-left py-3 hidden sm:table-cell">Prénom</th>
                  <th className="text-left py-3 hidden md:table-cell">Âge</th>
                  <th className="text-left py-3">Poste</th>
                </tr>
              </thead>
              <tbody>
                {joueurs.map((joueur) => (
                  <tr key={joueur.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-semibold text-sm">{joueur.numero}</td>
                    <td className="py-3 text-sm">{joueur.nom}</td>
                    <td className="py-3 text-sm hidden sm:table-cell">{joueur.prenom}</td>
                    <td className="py-3 text-sm hidden md:table-cell">{joueur.age} ans</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        joueur.poste === 'Attaquant' ? 'bg-green-100 text-green-700' :
                        joueur.poste === 'Milieu' ? 'bg-blue-100 text-blue-700' :
                        joueur.poste === 'Défenseur' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {joueur.poste}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL Profil */}
      {showProfilModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">⚙️ Modifier mon profil</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">Nom de l'équipe</label>
                <input type="text" name="nom" value={profilData.nom} onChange={handleProfilChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Nom du responsable</label>
                <input type="text" name="responsable" value={profilData.responsable} onChange={handleProfilChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Email</label>
                <input type="email" name="email" value={profilData.email} onChange={handleProfilChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Téléphone Wave</label>
                <input type="tel" name="telephone" value={profilData.telephone} onChange={handleProfilChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Nouveau logo</label>
                <input type="file" accept="image/*" onChange={(e) => setProfilData({...profilData, logo: e.target.files?.[0] || null})} className="w-full" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={sauvegarderProfil} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">Enregistrer</button>
              <button onClick={() => setShowProfilModal(false)} className="flex-1 bg-gray-300 hover:bg-gray-400 py-2 rounded-lg transition">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}