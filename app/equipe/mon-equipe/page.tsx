'use client';

import { useState } from 'react';

// Type pour un joueur
type Joueur = {
  id: number;
  nom: string;
  prenom: string;
  age: number;
  poste: string;
  numero: number;
  photo: string | null;
};

export default function MonEquipe() {
  const [joueurs, setJoueurs] = useState<Joueur[]>([
    { id: 1, nom: 'Koffi', prenom: 'Jean', age: 24, poste: 'Attaquant', numero: 9, photo: null },
    { id: 2, nom: 'Traoré', prenom: 'Amadou', age: 26, poste: 'Milieu', numero: 10, photo: null },
    { id: 3, nom: 'Koné', prenom: 'Ibrahim', age: 28, poste: 'Défenseur', numero: 5, photo: null },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingJoueur, setEditingJoueur] = useState<Joueur | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    age: '',
    poste: 'Attaquant',
    numero: '',
  });

  const postes = ['Attaquant', 'Milieu', 'Défenseur', 'Gardien'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openAddModal = () => {
    setEditingJoueur(null);
    setFormData({ nom: '', prenom: '', age: '', poste: 'Attaquant', numero: '' });
    setShowModal(true);
  };

  const openEditModal = (joueur: Joueur) => {
    setEditingJoueur(joueur);
    setFormData({
      nom: joueur.nom,
      prenom: joueur.prenom,
      age: joueur.age.toString(),
      poste: joueur.poste,
      numero: joueur.numero.toString(),
    });
    setShowModal(true);
  };

  const saveJoueur = () => {
    if (!formData.nom || !formData.prenom || !formData.age || !formData.numero) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const newJoueur: Joueur = {
      id: editingJoueur ? editingJoueur.id : Date.now(),
      nom: formData.nom,
      prenom: formData.prenom,
      age: parseInt(formData.age),
      poste: formData.poste,
      numero: parseInt(formData.numero),
      photo: null,
    };

    if (editingJoueur) {
      setJoueurs(joueurs.map(j => j.id === editingJoueur.id ? newJoueur : j));
    } else {
      setJoueurs([...joueurs, newJoueur]);
    }

    setShowModal(false);
    setEditingJoueur(null);
  };

  const deleteJoueur = (id: number) => {
    if (confirm('Voulez-vous vraiment supprimer ce joueur ?')) {
      setJoueurs(joueurs.filter(j => j.id !== id));
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
            <a href="/equipe/mon-equipe" className="py-3 text-blue-600 border-b-2 border-blue-600 font-semibold">
              Mon équipe
            </a>
            <a href="/equipe/matchs" className="py-3 text-gray-600 hover:text-blue-600">
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
        
        {/* En-tête */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">👥 Mon équipe</h1>
            <p className="text-gray-500 mt-1">Gérez votre effectif (maximum 23 joueurs)</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <span>+</span>
            <span>Ajouter un joueur</span>
          </button>
        </div>

        {/* Statistiques effectif */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-gray-500 text-sm">Total joueurs</p>
            <p className="text-2xl font-bold text-gray-800">{joueurs.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-gray-500 text-sm">Attaquants</p>
            <p className="text-2xl font-bold text-green-600">{joueurs.filter(j => j.poste === 'Attaquant').length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-gray-500 text-sm">Milieux</p>
            <p className="text-2xl font-bold text-blue-600">{joueurs.filter(j => j.poste === 'Milieu').length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-gray-500 text-sm">Défenseurs</p>
            <p className="text-2xl font-bold text-yellow-600">{joueurs.filter(j => j.poste === 'Défenseur').length}</p>
          </div>
        </div>

        {/* Liste des joueurs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-gray-600">N°</th>
                  <th className="text-left py-3 px-4 text-gray-600">Nom</th>
                  <th className="text-left py-3 px-4 text-gray-600">Prénom</th>
                  <th className="text-left py-3 px-4 text-gray-600">Âge</th>
                  <th className="text-left py-3 px-4 text-gray-600">Poste</th>
                  <th className="text-left py-3 px-4 text-gray-600">Photo</th>
                  <th className="text-center py-3 px-4 text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {joueurs.map((joueur) => (
                  <tr key={joueur.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-semibold">{joueur.numero}</td>
                    <td className="py-3 px-4">{joueur.nom}</td>
                    <td className="py-3 px-4">{joueur.prenom}</td>
                    <td className="py-3 px-4">{joueur.age} ans</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        joueur.poste === 'Attaquant' ? 'bg-green-100 text-green-700' :
                        joueur.poste === 'Milieu' ? 'bg-blue-100 text-blue-700' :
                        joueur.poste === 'Défenseur' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {joueur.poste}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {joueur.photo ? (
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      ) : (
                        <span className="text-gray-400 text-sm">Aucune</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => openEditModal(joueur)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteJoueur(joueur.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {joueurs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Aucun joueur dans votre effectif</p>
              <button
                onClick={openAddModal}
                className="mt-2 text-blue-600 hover:text-blue-700"
              >
                Ajouter votre premier joueur →
              </button>
            </div>
          )}
        </div>

        {/* Information */}
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            📋 Vous pouvez ajouter jusqu'à 23 joueurs. Les photos seront ajoutées prochainement.
          </p>
        </div>
      </div>

      {/* Modal d'ajout/modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {editingJoueur ? 'Modifier le joueur' : 'Ajouter un joueur'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">Nom *</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Koffi"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">Prénom *</label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Jean"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">Âge *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="24"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">Numéro *</label>
                  <input
                    type="number"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="9"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">Poste *</label>
                <select
                  name="poste"
                  value={formData.poste}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {postes.map(poste => (
                    <option key={poste} value={poste}>{poste}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button
                onClick={saveJoueur}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {editingJoueur ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}