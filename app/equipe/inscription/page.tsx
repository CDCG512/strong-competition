'use client';

import { useState } from 'react';

export default function InscriptionEquipe() {
  const [formData, setFormData] = useState({
    nomEquipe: '',
    responsable: '',
    email: '',
    telephone: '',
    logo: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        logo: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation d'envoi (plus tard on connectera à la base de données)
    setTimeout(() => {
      console.log('Données envoyées:', formData);
      alert('Inscription réussie ! Vous allez être redirigé vers le paiement.');
      setLoading(false);
      // Redirection vers la page de paiement
      window.location.href = '/equipe/paiement';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⚽</span>
            <span className="font-bold text-xl">STRONG COMPÉTITION</span>
          </div>
        </div>
      </nav>

      {/* Formulaire */}
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Inscription Équipe</h1>
            <p className="text-gray-500 mt-2">Rejoignez le tournoi Strong Compétition 2026</p>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800">💰 Frais d'inscription : <span className="font-bold">25 000 FCFA</span></p>
              <p className="text-sm text-blue-600 mt-1">Paiement via Wave Mobile Money après inscription</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom de l'équipe */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nom de l'équipe *</label>
              <input
                type="text"
                name="nomEquipe"
                required
                value={formData.nomEquipe}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ex: AS Douanes"
              />
            </div>

            {/* Responsable */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nom du responsable *</label>
              <input
                type="text"
                name="responsable"
                required
                value={formData.responsable}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nom complet"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="contact@equipe.com"
              />
            </div>

            {/* Téléphone Wave */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Téléphone Wave *</label>
              <input
                type="tel"
                name="telephone"
                required
                value={formData.telephone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+225 XX XX XX XX"
              />
              <p className="text-sm text-gray-400 mt-1">Le numéro utilisé pour le paiement Wave</p>
            </div>

            {/* Logo équipe */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Logo de l'équipe</label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-400 mt-1">Format PNG, JPG (max 2MB)</p>
            </div>

            {/* Bouton soumission */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-white transition ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Inscription en cours...' : 'S\'inscrire et payer 25 000 FCFA'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            En vous inscrivant, vous acceptez les conditions générales du tournoi
          </p>
        </div>
      </div>
    </div>
  );
}