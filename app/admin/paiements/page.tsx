'use client';

import { useState } from 'react';

type Paiement = {
  id: number;
  equipe: string;
  montant: number;
  telephone: string;
  date: string;
  statut: 'validé' | 'en_attente';
  transactionId: string;
};

export default function AdminPaiements() {
  const [paiements, setPaiements] = useState<Paiement[]>([
    { id: 1, equipe: 'AS Douanes', montant: 25000, telephone: '+225 01 23 45 67', date: '15/04/2026', statut: 'validé', transactionId: 'WAVE_ABC123' },
    { id: 2, equipe: 'ASEC Mimosas', montant: 25000, telephone: '+225 07 89 01 23', date: '15/04/2026', statut: 'validé', transactionId: 'WAVE_DEF456' },
    { id: 3, equipe: 'Africa Sports', montant: 25000, telephone: '+225 05 67 89 01', date: '14/04/2026', statut: 'en_attente', transactionId: 'WAVE_GHI789' },
  ]);

  const validerPaiement = (id: number) => {
    setPaiements(paiements.map(p => 
      p.id === id ? { ...p, statut: 'validé' } : p
    ));
    alert('Paiement validé avec succès');
  };

  const totalValide = paiements.filter(p => p.statut === 'validé').reduce((sum, p) => sum + p.montant, 0);
  const totalAttente = paiements.filter(p => p.statut === 'en_attente').reduce((sum, p) => sum + p.montant, 0);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">👑</span>
              <span className="font-bold text-xl text-white">ADMIN - Strong Compétition</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1">
            <a href="/admin/dashboard" className="px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-t-lg transition">Dashboard</a>
            <a href="/admin/matchs" className="px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-t-lg transition">Matchs</a>
            <a href="/admin/equipes" className="px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-t-lg transition">Équipes</a>
            <a href="/admin/paiements" className="px-4 py-3 text-white bg-gray-700 rounded-t-lg">Paiements</a>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-6 py-8">
        
        <h1 className="text-2xl font-bold text-white mb-6">💰 Gestion des paiements Wave</h1>

        {/* Cartes */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-900/30 border border-green-700 rounded-xl p-6">
            <p className="text-gray-400 text-sm">Total validé</p>
            <p className="text-3xl font-bold text-green-400">{totalValide.toLocaleString()} FCFA</p>
          </div>
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-6">
            <p className="text-gray-400 text-sm">En attente</p>
            <p className="text-3xl font-bold text-yellow-400">{totalAttente.toLocaleString()} FCFA</p>
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-300">Équipe</th>
                  <th className="py-3 px-4 text-center text-gray-300">Montant</th>
                  <th className="py-3 px-4 text-left text-gray-300">Téléphone Wave</th>
                  <th className="py-3 px-4 text-left text-gray-300">Transaction ID</th>
                  <th className="py-3 px-4 text-center text-gray-300">Date</th>
                  <th className="py-3 px-4 text-center text-gray-300">Statut</th>
                  <th className="py-3 px-4 text-center text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {paiements.map((paiement) => (
                  <tr key={paiement.id} className="hover:bg-gray-700/50">
                    <td className="py-3 px-4 font-semibold text-white">{paiement.equipe}</td>
                    <td className="py-3 px-4 text-center text-yellow-400 font-bold">{paiement.montant.toLocaleString()} FCFA</td>
                    <td className="py-3 px-4 text-gray-300">{paiement.telephone}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm font-mono">{paiement.transactionId}</td>
                    <td className="py-3 px-4 text-center text-gray-400">{paiement.date}</td>
                    <td className="py-3 px-4 text-center">
                      {paiement.statut === 'validé' ? (
                        <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs">✓ Validé</span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-600 text-white rounded-full text-xs">⏳ En attente</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {paiement.statut === 'en_attente' && (
                        <button
                          onClick={() => validerPaiement(paiement.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Valider
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}