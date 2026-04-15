'use client';

import { useState } from 'react';

// Types
type Competition = {
  id: number;
  nom: string;
  logo: string | null;
  nbEquipes: number;
  fraisParticipation: number;
  prixAGagner: number;
  dateDebut: string;
  dateFin: string;
  statut: 'à venir' | 'en cours' | 'terminé';
  description: string;
  reglementPDF: string | null;
};

type Sponsor = {
  id: number;
  nom: string;
  logo: string | null;
  siteWeb: string;
};

type Terrain = {
  id: number;
  nom: string;
  ville: string;
  capacite: number;
  adresse: string;
};

type Arbitre = {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  niveau: 'Principal' | 'Assistant' | 'VAR';
};

type Photo = {
  id: number;
  url: string;
  titre: string;
  date: string;
};

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

type Tirage = {
  poules: {
    [key: string]: string[];
  };
  quarts: { equipeA: string; equipeB: string }[];
  demis: { equipeA: string; equipeB: string }[];
  finale: { equipeA: string; equipeB: string };
};

type NotificationHistory = {
  message: string;
  date: string;
  whatsapp: boolean;
  email: boolean;
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'general' | 'sponsors' | 'terrains' | 'arbitres' | 'galerie' | 'notifications' | 'equipes' | 'matchs' | 'tirage'>('general');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTirageModal, setShowTirageModal] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [showEditEquipeModal, setShowEditEquipeModal] = useState(false);
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [showTerrainModal, setShowTerrainModal] = useState(false);
  const [showArbitreModal, setShowArbitreModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [selectedEquipe, setSelectedEquipe] = useState<Equipe | null>(null);
  const [tirage, setTirage] = useState<Tirage | null>(null);

  // État compétition
  const [competition, setCompetition] = useState({
    nom: 'Strong Compétition 2026',
    nbEquipes: 16,
    fraisParticipation: 25000,
    prixAGagner: 500000,
    dateDebut: '2026-05-01',
    dateFin: '2026-05-30',
    description: 'Tournoi officiel de football',
    reglementPDF: null as File | null,
  });

  // État équipes
  const [equipes, setEquipes] = useState<Equipe[]>([
    { id: 1, nom: 'AS Douanes', responsable: 'Jean Konan', email: 'contact@asdouanes.com', telephone: '+225 01 23 45 67', statutPaiement: true, statutCompetition: 'en_cours', points: 6, butsPour: 5, butsContre: 3, logo: null },
    { id: 2, nom: 'ASEC Mimosas', responsable: 'Amadou Traoré', email: 'asec@mimosas.ci', telephone: '+225 07 89 01 23', statutPaiement: true, statutCompetition: 'en_cours', points: 4, butsPour: 4, butsContre: 2, logo: null },
    { id: 3, nom: 'Africa Sports', responsable: 'Koffi Nguessan', email: 'africa@sports.ci', telephone: '+225 05 67 89 01', statutPaiement: true, statutCompetition: 'elimine', points: 1, butsPour: 2, butsContre: 5, logo: null },
    { id: 4, nom: 'Stade Abidjan', responsable: 'Yao Serge', email: 'stade@abidjan.ci', telephone: '+225 04 56 78 90', statutPaiement: true, statutCompetition: 'en_cours', points: 3, butsPour: 3, butsContre: 3, logo: null },
  ]);

  // État matchs
  const [matchs, setMatchs] = useState<Match[]>([
    { id: 1, equipeA: 'AS Douanes', equipeB: 'ASEC Mimosas', scoreA: null, scoreB: null, date: '2026-05-10', heure: '16:00', terrain: 'Stade Félix', arbitre: 'Koné Ibrahim', statut: 'à venir', phase: 'poule', groupe: 'A' },
    { id: 2, equipeA: 'Africa Sports', equipeB: 'Stade Abidjan', scoreA: null, scoreB: null, date: '2026-05-10', heure: '18:00', terrain: 'Stade Municipal', arbitre: 'Traoré Amadou', statut: 'à venir', phase: 'poule', groupe: 'A' },
  ]);

  // État sponsors
  const [sponsors, setSponsors] = useState<Sponsor[]>([
    { id: 1, nom: 'Orange CI', logo: null, siteWeb: 'www.orange.ci' },
    { id: 2, nom: 'MTN', logo: null, siteWeb: 'www.mtn.ci' },
  ]);

  // État terrains
  const [terrains, setTerrains] = useState<Terrain[]>([
    { id: 1, nom: 'Stade Félix', ville: 'Abidjan', capacite: 35000, adresse: 'Plateau, Abidjan' },
    { id: 2, nom: 'Stade Municipal', ville: 'Yamoussoukro', capacite: 20000, adresse: 'Centre-ville' },
  ]);

  // État arbitres
  const [arbitres, setArbitres] = useState<Arbitre[]>([
    { id: 1, nom: 'Koné', prenom: 'Ibrahim', telephone: '+225 01 23 45 67', niveau: 'Principal' },
    { id: 2, nom: 'Traoré', prenom: 'Amadou', telephone: '+225 07 89 01 23', niveau: 'Assistant' },
  ]);

  // État galerie
  const [photos, setPhotos] = useState<Photo[]>([
    { id: 1, url: '', titre: 'Finale 2025', date: '2025-05-30' },
  ]);

  // État notifications
  const [notification, setNotification] = useState({
    message: '',
    type: 'info' as 'info' | 'warning' | 'success',
    envoyerWhatsapp: true,
    envoyerEmail: false,
  });
  const [notificationsHistory, setNotificationsHistory] = useState<NotificationHistory[]>([]);

  // Nouveau match
  const [newMatch, setNewMatch] = useState({
    equipeA: '',
    equipeB: '',
    date: '',
    heure: '',
    terrain: '',
    arbitre: '',
    phase: 'poule',
    groupe: 'A',
  });

  // Nouveau sponsor
  const [newSponsor, setNewSponsor] = useState({ nom: '', siteWeb: '' });
  
  // Nouveau terrain
  const [newTerrain, setNewTerrain] = useState({ nom: '', ville: '', capacite: '', adresse: '' });
  
  // Nouvel arbitre
  const [newArbitre, setNewArbitre] = useState({ nom: '', prenom: '', telephone: '', niveau: 'Principal' as 'Principal' | 'Assistant' | 'VAR' });

  const [stats] = useState({
    totalEquipes: 12,
    equipesPayees: 10,
    matchsJoues: 8,
    matchsTotal: 32,
    revenus: 250000,
  });

  // Gestion sponsors
  const ajouterSponsor = () => {
    if (!newSponsor.nom) {
      alert('Veuillez entrer un nom');
      return;
    }
    setSponsors([...sponsors, { ...newSponsor, id: Date.now(), logo: null }]);
    setNewSponsor({ nom: '', siteWeb: '' });
    setShowSponsorModal(false);
    alert('✅ Sponsor ajouté avec succès !');
  };

  const supprimerSponsor = (id: number) => {
    if (confirm('Supprimer ce sponsor ?')) {
      setSponsors(sponsors.filter(s => s.id !== id));
    }
  };

  // Gestion terrains
  const ajouterTerrain = () => {
    if (!newTerrain.nom || !newTerrain.ville) {
      alert('Veuillez remplir le nom et la ville');
      return;
    }
    setTerrains([...terrains, { 
      ...newTerrain, 
      id: Date.now(), 
      capacite: parseInt(newTerrain.capacite) || 0 
    }]);
    setNewTerrain({ nom: '', ville: '', capacite: '', adresse: '' });
    setShowTerrainModal(false);
    alert('✅ Terrain ajouté avec succès !');
  };

  const supprimerTerrain = (id: number) => {
    if (confirm('Supprimer ce terrain ?')) {
      setTerrains(terrains.filter(t => t.id !== id));
    }
  };

  // Gestion arbitres
  const ajouterArbitre = () => {
    if (!newArbitre.nom || !newArbitre.prenom || !newArbitre.telephone) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    setArbitres([...arbitres, { ...newArbitre, id: Date.now() }]);
    setNewArbitre({ nom: '', prenom: '', telephone: '', niveau: 'Principal' });
    setShowArbitreModal(false);
    alert('✅ Arbitre ajouté avec succès !');
  };

  const supprimerArbitre = (id: number) => {
    if (confirm('Supprimer cet arbitre ?')) {
      setArbitres(arbitres.filter(a => a.id !== id));
    }
  };

  // Gestion galerie
  const ajouterPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newPhoto: Photo = {
        id: Date.now(),
        url: URL.createObjectURL(e.target.files[0]),
        titre: `Photo ${photos.length + 1}`,
        date: new Date().toISOString().split('T')[0]
      };
      setPhotos([...photos, newPhoto]);
      alert('✅ Photo ajoutée avec succès !');
    }
  };

  const supprimerPhoto = (id: number) => {
    if (confirm('Supprimer cette photo ?')) {
      setPhotos(photos.filter(p => p.id !== id));
    }
  };

  // Gestion notifications
  const envoyerNotification = () => {
    if (!notification.message) {
      alert('Veuillez entrer un message');
      return;
    }
    
    setNotificationsHistory([...notificationsHistory, {
      message: notification.message,
      date: new Date().toLocaleString(),
      whatsapp: notification.envoyerWhatsapp,
      email: notification.envoyerEmail
    }]);
    
    const messageWhatsapp = `📢 *Strong Compétition*\n\n${notification.message}\n\n---\nÉquipe Strong Compétition`;
    console.log('Notification envoyée :', messageWhatsapp);
    alert(`✅ Notification envoyée à toutes les équipes !\n\nMessage : ${notification.message}`);
    
    setNotification({ message: '', type: 'info', envoyerWhatsapp: true, envoyerEmail: false });
    setShowNotifModal(false);
  };

  // Gestion matchs
  const creerMatch = () => {
    if (!newMatch.equipeA || !newMatch.equipeB || !newMatch.date || !newMatch.heure) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    const match: Match = {
      id: matchs.length + 1,
      equipeA: newMatch.equipeA,
      equipeB: newMatch.equipeB,
      scoreA: null,
      scoreB: null,
      date: newMatch.date,
      heure: newMatch.heure,
      terrain: newMatch.terrain || terrains[0]?.nom || 'Stade',
      arbitre: newMatch.arbitre || arbitres[0]?.nom || 'À désigner',
      statut: 'à venir',
      phase: newMatch.phase as any,
      groupe: newMatch.phase === 'poule' ? newMatch.groupe : undefined,
    };
    
    setMatchs([...matchs, match]);
    setShowMatchModal(false);
    setNewMatch({ equipeA: '', equipeB: '', date: '', heure: '', terrain: '', arbitre: '', phase: 'poule', groupe: 'A' });
    alert('✅ Match créé avec succès !');
  };

  // Gestion équipes
  const modifierStatutEquipe = (id: number, nouveauStatut: 'en_cours' | 'elimine' | 'qualifie') => {
    setEquipes(equipes.map(e => 
      e.id === id ? { ...e, statutCompetition: nouveauStatut } : e
    ));
    alert(`✅ Équipe ${nouveauStatut === 'elimine' ? 'éliminée' : nouveauStatut === 'qualifie' ? 'qualifiée' : 'réintégrée'} avec succès !`);
    setShowEditEquipeModal(false);
  };

  // Tirage au sort
  const genererTirageSort = () => {
    const equipesEnCours = equipes.filter(e => e.statutCompetition === 'en_cours').map(e => e.nom);
    const shuffled = [...equipesEnCours].sort(() => 0.5 - Math.random());
    const nbPoules = 4;
    const equipesParPoule = Math.ceil(shuffled.length / nbPoules);
    
    const poules: { [key: string]: string[] } = {};
    const groupes = ['A', 'B', 'C', 'D'];
    
    for (let i = 0; i < shuffled.length; i++) {
      const groupeIndex = Math.floor(i / equipesParPoule);
      if (groupeIndex < nbPoules) {
        if (!poules[groupes[groupeIndex]]) poules[groupes[groupeIndex]] = [];
        poules[groupes[groupeIndex]].push(shuffled[i]);
      }
    }
    
    const qualifes = Object.values(poules).flat().slice(0, 8);
    const quarts = [];
    for (let i = 0; i < qualifes.length; i += 2) {
      if (i + 1 < qualifes.length) {
        quarts.push({ equipeA: qualifes[i], equipeB: qualifes[i + 1] });
      }
    }
    
    const demis = [
      { equipeA: `Vainqueur QF1`, equipeB: `Vainqueur QF2` },
      { equipeA: `Vainqueur QF3`, equipeB: `Vainqueur QF4` },
    ];
    
    const finale = { equipeA: 'Vainqueur DF1', equipeB: 'Vainqueur DF2' };
    
    const nouveauTirage = { poules, quarts, demis, finale };
    setTirage(nouveauTirage);
    
    const nouveauxMatchs: Match[] = [];
    Object.entries(poules).forEach(([groupe, equipesPoule]) => {
      for (let i = 0; i < equipesPoule.length; i++) {
        for (let j = i + 1; j < equipesPoule.length; j++) {
          nouveauxMatchs.push({
            id: matchs.length + nouveauxMatchs.length + 1,
            equipeA: equipesPoule[i],
            equipeB: equipesPoule[j],
            scoreA: null,
            scoreB: null,
            date: competition.dateDebut,
            heure: '16:00',
            terrain: terrains[0]?.nom || 'Stade',
            arbitre: arbitres[0]?.nom || 'À désigner',
            statut: 'à venir',
            phase: 'poule',
            groupe,
          });
        }
      }
    });
    
    setMatchs([...matchs, ...nouveauxMatchs]);
    setShowTirageModal(false);
    alert('✅ Tirage au sort généré avec succès ! Les poules et matchs ont été créés.');
  };

  // Upload règlement PDF
  const uploadReglement = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setCompetition({ ...competition, reglementPDF: URL.createObjectURL(file) });
        alert('✅ Règlement PDF uploadé avec succès !');
      } else {
        alert('❌ Veuillez sélectionner un fichier PDF valide');
      }
    }
  };

  const exporterStats = () => {
    const data = { competition, sponsors, terrains, arbitres, photos, equipes, matchs, tirage, stats };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stats-competition-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    alert('✅ Statistiques exportées avec succès !');
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
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">👑</span>
              <span className="font-bold text-xl text-white">ADMIN - Strong Compétition</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">Admin@strong.com</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm text-white">A</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation Principale */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-16 z-10 overflow-x-auto">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex gap-1 min-w-max">
            <button onClick={() => setActiveTab('general')} className={`px-4 py-3 rounded-t-lg transition ${activeTab === 'general' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}>📊 Dashboard</button>
            <button onClick={() => setActiveTab('equipes')} className={`px-4 py-3 rounded-t-lg transition ${activeTab === 'equipes' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}>🏆 Équipes</button>
            <button onClick={() => setActiveTab('matchs')} className={`px-4 py-3 rounded-t-lg transition ${activeTab === 'matchs' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}>⚽ Matchs</button>
            <button onClick={() => setActiveTab('tirage')} className={`px-4 py-3 rounded-t-lg transition ${activeTab === 'tirage' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}>🎲 Tirage</button>
            <button onClick={() => setActiveTab('sponsors')} className={`px-4 py-3 rounded-t-lg transition ${activeTab === 'sponsors' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}>🤝 Sponsors</button>
            <button onClick={() => setActiveTab('terrains')} className={`px-4 py-3 rounded-t-lg transition ${activeTab === 'terrains' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}>🏟️ Terrains</button>
            <button onClick={() => setActiveTab('arbitres')} className={`px-4 py-3 rounded-t-lg transition ${activeTab === 'arbitres' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}>👨‍⚖️ Arbitres</button>
            <button onClick={() => setActiveTab('galerie')} className={`px-4 py-3 rounded-t-lg transition ${activeTab === 'galerie' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}>📸 Galerie</button>
            <button onClick={() => setActiveTab('notifications')} className={`px-4 py-3 rounded-t-lg transition ${activeTab === 'notifications' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}>📢 Notifications</button>
          </div>
        </div>
      </div>

      {/* ==================== TAB DASHBOARD GENERAL ==================== */}
      {activeTab === 'general' && (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-white">📊 Tableau de bord</h1>
            <div className="flex gap-3">
              <button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">⚙️ Configurer</button>
              <button onClick={() => setShowMatchModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">🏟️ + Créer match</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-blue-400 text-3xl mb-2">🏆</div>
              <p className="text-gray-400 text-sm">Équipes</p>
              <p className="text-3xl font-bold text-white">{equipes.length}/16</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-green-400 text-3xl mb-2">⚽</div>
              <p className="text-gray-400 text-sm">Matchs</p>
              <p className="text-3xl font-bold text-white">{matchs.filter(m => m.statut === 'terminé').length}/{matchs.length}</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-yellow-400 text-3xl mb-2">💰</div>
              <p className="text-gray-400 text-sm">Revenus</p>
              <p className="text-3xl font-bold text-white">{stats.revenus.toLocaleString()} FCFA</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="text-purple-400 text-3xl mb-2">📊</div>
              <p className="text-gray-400 text-sm">Qualifiés</p>
              <p className="text-3xl font-bold text-white">{equipes.filter(e => e.statutCompetition === 'qualifie').length}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-yellow-200 text-sm">🏆 PRIX À GAGNER</p>
                <p className="text-3xl font-bold text-white">{competition.prixAGagner.toLocaleString()} FCFA</p>
              </div>
              <div className="text-center">
                <p className="text-yellow-200 text-sm">📅 Dates</p>
                <p className="text-white font-semibold">{competition.dateDebut} au {competition.dateFin}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-bold text-white mb-4">📄 Règlement de la compétition</h2>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input type="file" accept=".pdf" onChange={uploadReglement} className="text-white" />
              {competition.reglementPDF && (
                <a href={competition.reglementPDF} target="_blank" className="text-blue-400 hover:text-blue-300">📄 Voir le règlement</a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB ÉQUIPES ==================== */}
      {activeTab === 'equipes' && (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <h1 className="text-2xl font-bold text-white mb-6">🏆 Gestion des équipes</h1>
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr><th className="py-3 px-4 text-left text-gray-300">Équipe</th><th className="py-3 px-4 text-left text-gray-300">Responsable</th><th className="py-3 px-4 text-center text-gray-300">Points</th><th className="py-3 px-4 text-center text-gray-300">Diff</th><th className="py-3 px-4 text-center text-gray-300">Statut</th><th className="py-3 px-4 text-center text-gray-300">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {equipes.map((equipe) => (
                    <tr key={equipe.id} className="hover:bg-gray-700/50">
                      <td className="py-3 px-4 font-semibold text-white">{equipe.nom}</td>
                      <td className="py-3 px-4 text-gray-300">{equipe.responsable}</td>
                      <td className="py-3 px-4 text-center text-white font-bold">{equipe.points}</td>
                      <td className={`py-3 px-4 text-center ${equipe.butsPour - equipe.butsContre >= 0 ? 'text-green-400' : 'text-red-400'}`}>{equipe.butsPour - equipe.butsContre}</td>
                      <td className="py-3 px-4 text-center">{getStatutBadge(equipe.statutCompetition)}</td>
                      <td className="py-3 px-4 text-center">
                        <button onClick={() => { setSelectedEquipe(equipe); setShowEditEquipeModal(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">Modifier</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB MATCHS ==================== */}
      {activeTab === 'matchs' && (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">⚽ Gestion des matchs</h1>
            <button onClick={() => setShowMatchModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">+ Nouveau match</button>
          </div>
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr><th className="py-3 px-4 text-left text-gray-300">Équipe A</th><th className="py-3 px-4 text-center text-gray-300">Score</th><th className="py-3 px-4 text-left text-gray-300">Équipe B</th><th className="py-3 px-4 text-center text-gray-300">Date</th><th className="py-3 px-4 text-center text-gray-300">Statut</th><th className="py-3 px-4 text-center text-gray-300">Phase</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {matchs.map((match) => (
                    <tr key={match.id} className="hover:bg-gray-700/50">
                      <td className="py-3 px-4 text-white">{match.equipeA}</td>
                      <td className="py-3 px-4 text-center text-xl font-bold text-white">{match.scoreA !== null ? match.scoreA : '-'} - {match.scoreB !== null ? match.scoreB : '-'}</td>
                      <td className="py-3 px-4 text-white">{match.equipeB}</td>
                      <td className="py-3 px-4 text-center text-gray-400">{match.date} {match.heure}</td>
                      <td className="py-3 px-4 text-center">{match.statut === 'terminé' ? <span className="px-2 py-1 bg-gray-600 rounded-full text-xs">Terminé</span> : <span className="px-2 py-1 bg-blue-600 rounded-full text-xs">À venir</span>}</td>
                      <td className="py-3 px-4 text-center"><span className="px-2 py-1 bg-purple-600 rounded-full text-xs">{match.phase}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB TIRAGE ==================== */}
      {activeTab === 'tirage' && (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">🎲 Tirage au sort</h1>
            <button onClick={() => setShowTirageModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">Générer tirage</button>
          </div>
          
          {tirage ? (
            <>
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">📊 Phase de poules</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(tirage.poules).map(([groupe, equipesPoule]) => (
                    <div key={groupe} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                      <div className="bg-blue-600 p-3 text-center"><h3 className="text-white font-bold">Groupe {groupe}</h3></div>
                      <div className="divide-y divide-gray-700">
                        {equipesPoule.map((equipe, idx) => <div key={idx} className="p-3 text-gray-300">{equipe}</div>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">🎯 Quarts de finale</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {tirage.quarts.map((qf, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-center">
                      <p className="text-white font-semibold">{qf.equipeA} vs {qf.equipeB}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">🔥 Demi-finales</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {tirage.demis.map((df, idx) => (
                    <div key={idx} className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-center">
                      <p className="text-white font-semibold">{df.equipeA} vs {df.equipeB}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-4">🏆 FINALE</h2>
                <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-xl p-6 text-center">
                  <p className="text-2xl font-bold text-white">{tirage.finale.equipeA} vs {tirage.finale.equipeB}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
              <div className="text-6xl mb-4">🎲</div>
              <p className="text-gray-400">Aucun tirage généré pour le moment</p>
              <button onClick={() => setShowTirageModal(true)} className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">Générer le tirage</button>
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB SPONSORS ==================== */}
      {activeTab === 'sponsors' && (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-white">🤝 Sponsors officiels</h1>
            <button onClick={() => setShowSponsorModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto">
              + Ajouter un sponsor
            </button>
          </div>

          {sponsors.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
              <div className="text-5xl mb-4">🤝</div>
              <p className="text-gray-400">Aucun sponsor enregistré</p>
              <button onClick={() => setShowSponsorModal(true)} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                Ajouter votre premier sponsor
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sponsors.map((sponsor) => (
                <div key={sponsor.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">🏢</div>
                    <button onClick={() => supprimerSponsor(sponsor.id)} className="text-red-400 hover:text-red-300 text-sm">🗑️ Supprimer</button>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{sponsor.nom}</h3>
                  <p className="text-gray-400 text-sm break-all">{sponsor.siteWeb}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB TERRAINS ==================== */}
      {activeTab === 'terrains' && (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-white">🏟️ Terrains</h1>
            <button onClick={() => setShowTerrainModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto">
              + Ajouter un terrain
            </button>
          </div>

          {terrains.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
              <div className="text-5xl mb-4">🏟️</div>
              <p className="text-gray-400">Aucun terrain enregistré</p>
              <button onClick={() => setShowTerrainModal(true)} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                Ajouter votre premier terrain
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {terrains.map((terrain) => (
                <div key={terrain.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-3xl">🏟️</div>
                    <button onClick={() => supprimerTerrain(terrain.id)} className="text-red-400 hover:text-red-300 text-sm">🗑️ Supprimer</button>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{terrain.nom}</h3>
                  <p className="text-gray-400">📍 {terrain.ville}</p>
                  <p className="text-gray-400 text-sm">Capacité: {terrain.capacite.toLocaleString()} places</p>
                  <p className="text-gray-500 text-xs mt-2 break-all">{terrain.adresse}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB ARBITRES ==================== */}
      {activeTab === 'arbitres' && (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-white">👨‍⚖️ Corps arbitral</h1>
            <button onClick={() => setShowArbitreModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto">
              + Ajouter un arbitre
            </button>
          </div>

          {arbitres.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
              <div className="text-5xl mb-4">👨‍⚖️</div>
              <p className="text-gray-400">Aucun arbitre enregistré</p>
              <button onClick={() => setShowArbitreModal(true)} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                Ajouter votre premier arbitre
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {arbitres.map((arbitre) => (
                <div key={arbitre.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg">👨‍⚖️</div>
                      <div>
                        <h3 className="text-white font-bold">{arbitre.nom} {arbitre.prenom}</h3>
                        <p className="text-gray-400 text-sm">{arbitre.niveau}</p>
                      </div>
                    </div>
                    <button onClick={() => supprimerArbitre(arbitre.id)} className="text-red-400 hover:text-red-300 text-sm">🗑️</button>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">📞 {arbitre.telephone}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB GALERIE ==================== */}
      {activeTab === 'galerie' && (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-white">📸 Galerie photos</h1>
            <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer w-full sm:w-auto text-center">
              + Ajouter des photos
              <input type="file" accept="image/*" className="hidden" onChange={ajouterPhoto} />
            </label>
          </div>

          {photos.length === 0 || (photos.length === 1 && !photos[0].url) ? (
            <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
              <div className="text-5xl mb-4">📸</div>
              <p className="text-gray-400">Aucune photo dans la galerie</p>
              <label className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-block cursor-pointer">
                Ajouter votre première photo
                <input type="file" accept="image/*" className="hidden" onChange={ajouterPhoto} />
              </label>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.filter(p => p.url).map((photo) => (
                <div key={photo.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition">
                  <div className="h-48 bg-gray-700 flex items-center justify-center">
                    <img src={photo.url} alt={photo.titre} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold">{photo.titre}</h3>
                    <p className="text-gray-400 text-sm">{photo.date}</p>
                    <button onClick={() => supprimerPhoto(photo.id)} className="mt-2 text-red-400 hover:text-red-300 text-sm">🗑️ Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==================== TAB NOTIFICATIONS ==================== */}
      {activeTab === 'notifications' && (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-white">📢 Notifications WhatsApp</h1>
            <button onClick={() => setShowNotifModal(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto">
              + Nouvelle notification
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-bold text-white mb-4">📜 Historique des notifications</h2>
            {notificationsHistory.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">💬</div>
                <p className="text-gray-400">Aucune notification envoyée</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notificationsHistory.map((notif, idx) => (
                  <div key={idx} className="bg-gray-700 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <p className="text-gray-300 text-sm">{notif.message}</p>
                      <span className="text-xs text-gray-500">{notif.date}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {notif.whatsapp && <span className="text-xs text-green-400">✓ WhatsApp</span>}
                      {notif.email && <span className="text-xs text-blue-400">✓ Email</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== MODALS ==================== */}

      {/* MODAL : Configurer compétition */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold text-white mb-4">🏆 Configuration</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Nom" value={competition.nom} onChange={(e) => setCompetition({...competition, nom: e.target.value})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
              <select value={competition.nbEquipes} onChange={(e) => setCompetition({...competition, nbEquipes: parseInt(e.target.value)})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                <option value={8}>8 équipes</option><option value={16}>16 équipes</option><option value={32}>32 équipes</option>
              </select>
              <input type="number" placeholder="Frais participation" value={competition.fraisParticipation} onChange={(e) => setCompetition({...competition, fraisParticipation: parseInt(e.target.value)})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
              <input type="number" placeholder="Prix à gagner" value={competition.prixAGagner} onChange={(e) => setCompetition({...competition, prixAGagner: parseInt(e.target.value)})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
              <div className="grid grid-cols-2 gap-4">
                <input type="date" value={competition.dateDebut} onChange={(e) => setCompetition({...competition, dateDebut: e.target.value})} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                <input type="date" value={competition.dateFin} onChange={(e) => setCompetition({...competition, dateFin: e.target.value})} className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
              </div>
              <textarea placeholder="Description" rows={3} value={competition.description} onChange={(e) => setCompetition({...competition, description: e.target.value})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
            </div>
            <div className="flex gap-3 mt-6"><button onClick={() => setShowCreateModal(false)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Enregistrer</button><button onClick={() => setShowCreateModal(false)} className="flex-1 bg-gray-600 text-white py-2 rounded-lg">Annuler</button></div>
          </div>
        </div>
      )}

      {/* MODAL : Créer match */}
      {showMatchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">🏟️ Créer un match</h2>
            <div className="space-y-4">
              <select value={newMatch.equipeA} onChange={(e) => setNewMatch({...newMatch, equipeA: e.target.value})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                <option value="">Sélectionner Équipe A</option>{equipes.map(e => <option key={e.id}>{e.nom}</option>)}
              </select>
              <select value={newMatch.equipeB} onChange={(e) => setNewMatch({...newMatch, equipeB: e.target.value})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                <option value="">Sélectionner Équipe B</option>{equipes.map(e => <option key={e.id}>{e.nom}</option>)}
              </select>
              <input type="date" value={newMatch.date} onChange={(e) => setNewMatch({...newMatch, date: e.target.value})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
              <input type="time" value={newMatch.heure} onChange={(e) => setNewMatch({...newMatch, heure: e.target.value})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
              <select value={newMatch.phase} onChange={(e) => setNewMatch({...newMatch, phase: e.target.value as any})} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                <option value="poule">Poule</option><option value="quart">Quart</option><option value="demi">Demi</option><option value="finale">Finale</option>
              </select>
              <div className="flex gap-3"><button onClick={creerMatch} className="flex-1 bg-green-600 text-white py-2 rounded-lg">Créer</button><button onClick={() => setShowMatchModal(false)} className="flex-1 bg-gray-600 text-white py-2 rounded-lg">Annuler</button></div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL : Modifier équipe */}
      {showEditEquipeModal && selectedEquipe && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">Modifier {selectedEquipe.nom}</h2>
            <div className="space-y-3 mb-6">
              <button onClick={() => modifierStatutEquipe(selectedEquipe.id, 'en_cours')} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">✅ En cours</button>
              <button onClick={() => modifierStatutEquipe(selectedEquipe.id, 'qualifie')} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">⭐ Qualifier</button>
              <button onClick={() => modifierStatutEquipe(selectedEquipe.id, 'elimine')} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">❌ Éliminer</button>
            </div>
            <button onClick={() => setShowEditEquipeModal(false)} className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg">Fermer</button>
          </div>
        </div>
      )}

      {/* MODAL : Ajouter sponsor */}
      {showSponsorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">🤝 Ajouter un sponsor</h2>
            <input type="text" placeholder="Nom du sponsor" value={newSponsor.nom} onChange={(e) => setNewSponsor({...newSponsor, nom: e.target.value})} className="w-full mb-3 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
            <input type="text" placeholder="Site web" value={newSponsor.siteWeb} onChange={(e) => setNewSponsor({...newSponsor, siteWeb: e.target.value})} className="w-full mb-4 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
            <div className="flex gap-3"><button onClick={ajouterSponsor} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Ajouter</button><button onClick={() => setShowSponsorModal(false)} className="flex-1 bg-gray-600 text-white py-2 rounded-lg">Annuler</button></div>
          </div>
        </div>
      )}

      {/* MODAL : Ajouter terrain */}
      {showTerrainModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">🏟️ Ajouter un terrain</h2>
            <input type="text" placeholder="Nom du terrain" value={newTerrain.nom} onChange={(e) => setNewTerrain({...newTerrain, nom: e.target.value})} className="w-full mb-3 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
            <input type="text" placeholder="Ville" value={newTerrain.ville} onChange={(e) => setNewTerrain({...newTerrain, ville: e.target.value})} className="w-full mb-3 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
            <input type="number" placeholder="Capacité" value={newTerrain.capacite} onChange={(e) => setNewTerrain({...newTerrain, capacite: e.target.value})} className="w-full mb-3 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
            <input type="text" placeholder="Adresse" value={newTerrain.adresse} onChange={(e) => setNewTerrain({...newTerrain, adresse: e.target.value})} className="w-full mb-4 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
            <div className="flex gap-3"><button onClick={ajouterTerrain} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Ajouter</button><button onClick={() => setShowTerrainModal(false)} className="flex-1 bg-gray-600 text-white py-2 rounded-lg">Annuler</button></div>
          </div>
        </div>
      )}

      {/* MODAL : Ajouter arbitre */}
      {showArbitreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">👨‍⚖️ Ajouter un arbitre</h2>
            <input type="text" placeholder="Nom" value={newArbitre.nom} onChange={(e) => setNewArbitre({...newArbitre, nom: e.target.value})} className="w-full mb-3 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
            <input type="text" placeholder="Prénom" value={newArbitre.prenom} onChange={(e) => setNewArbitre({...newArbitre, prenom: e.target.value})} className="w-full mb-3 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
            <input type="tel" placeholder="Téléphone" value={newArbitre.telephone} onChange={(e) => setNewArbitre({...newArbitre, telephone: e.target.value})} className="w-full mb-3 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
            <select value={newArbitre.niveau} onChange={(e) => setNewArbitre({...newArbitre, niveau: e.target.value as any})} className="w-full mb-4 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
              <option>Principal</option><option>Assistant</option><option>VAR</option>
            </select>
            <div className="flex gap-3"><button onClick={ajouterArbitre} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">Ajouter</button><button onClick={() => setShowArbitreModal(false)} className="flex-1 bg-gray-600 text-white py-2 rounded-lg">Annuler</button></div>
          </div>
        </div>
      )}

      {/* MODAL : Notification */}
      {showNotifModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">📱 Envoyer une notification</h2>
            <textarea rows={5} placeholder="Entrez votre message..." value={notification.message} onChange={(e) => setNotification({...notification, message: e.target.value})} className="w-full mb-4 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
            <div className="space-y-2 mb-4">
              <label className="flex items-center gap-2"><input type="checkbox" checked={notification.envoyerWhatsapp} onChange={(e) => setNotification({...notification, envoyerWhatsapp: e.target.checked})} className="w-4 h-4" /><span className="text-gray-300">📱 Envoyer via WhatsApp</span></label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={notification.envoyerEmail} onChange={(e) => setNotification({...notification, envoyerEmail: e.target.checked})} className="w-4 h-4" /><span className="text-gray-300">✉️ Envoyer par email</span></label>
            </div>
            <div className="flex gap-3"><button onClick={envoyerNotification} className="flex-1 bg-green-600 text-white py-2 rounded-lg">📤 Envoyer</button><button onClick={() => setShowNotifModal(false)} className="flex-1 bg-gray-600 text-white py-2 rounded-lg">Annuler</button></div>
          </div>
        </div>
      )}

      {/* MODAL : Tirage */}
      {showTirageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 text-center">
            <div className="text-5xl mb-4">🎲</div>
            <h2 className="text-xl font-bold text-white mb-2">Générer le tirage</h2>
            <p className="text-gray-400 mb-6">Cette action va créer les poules et les matchs automatiquement.<br /><span className="text-yellow-400">⚠️ Irréversible.</span></p>
            <div className="flex gap-3"><button onClick={genererTirageSort} className="flex-1 bg-green-600 text-white py-2 rounded-lg">Confirmer</button><button onClick={() => setShowTirageModal(false)} className="flex-1 bg-gray-600 text-white py-2 rounded-lg">Annuler</button></div>
          </div>
        </div>
      )}
    </div>
  );
}