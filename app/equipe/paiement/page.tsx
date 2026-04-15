'use client';

import { useState } from 'react';

export default function PaiementWave() {
  const [loading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'ussd' | 'success'>('form');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const handleWavePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation d'appel API Wave (à remplacer par votre vraie intégration)
    setTimeout(() => {
      // Génération d'un ID de transaction fictif
      const fakeTransactionId = 'WAVE_' + Math.random().toString(36).substr(2, 10).toUpperCase();
      setTransactionId(fakeTransactionId);
      setPaymentStep('ussd');
      setLoading(false);
    }, 1500);
  };

  const handleConfirmPayment = () => {
    setPaymentStep('success');
    // Redirection vers le dashboard après 2 secondes
    setTimeout(() => {
      window.location.href = '/equipe/dashboard';
    }, 2000);
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

      {/* Contenu principal */}
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        
        {/* ÉTAPE 1 : Formulaire de paiement */}
        {paymentStep === 'form' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">💰</div>
              <h1 className="text-3xl font-bold text-gray-800">Paiement Wave</h1>
              <p className="text-gray-500 mt-2">Finalisez votre inscription au tournoi</p>
            </div>

            {/* Récapitulatif */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Frais d'inscription :</span>
                <span className="text-2xl font-bold text-blue-600">25 000 FCFA</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-700">Équipe :</span>
                <span className="font-semibold">AS Douanes</span>
              </div>
            </div>

            <form onSubmit={handleWavePayment} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Numéro Wave Mobile Money *
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+225 XX XX XX XX"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Vous recevrez une notification Wave pour confirmer le paiement
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-bold text-white transition flex items-center justify-center space-x-2 ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Traitement en cours...</span>
                  </>
                ) : (
                  <>
                    <span>💳</span>
                    <span>Payer 25 000 FCFA via Wave</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800 text-center">
                🔒 Paiement sécurisé via Wave Mobile Money
              </p>
            </div>
          </div>
        )}

        {/* ÉTAPE 2 : Instructions USSD */}
        {paymentStep === 'ussd' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">📱</div>
              <h1 className="text-2xl font-bold text-gray-800">Code de transaction généré</h1>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-gray-600 text-center mb-4">
                Ouvrez votre application Wave et effectuez le paiement avec le code suivant :
              </p>
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <p className="text-sm text-blue-600">Code de transaction</p>
                <p className="text-3xl font-bold text-blue-800 font-mono">{transactionId}</p>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-500">Montant à payer : <span className="font-bold">25 000 FCFA</span></p>
                <p className="text-gray-500">Numéro Wave : <span className="font-bold">{phoneNumber}</span></p>
              </div>
            </div>

            <button
              onClick={handleConfirmPayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
            >
              J'ai confirmé le paiement
            </button>

            <p className="text-center text-gray-400 text-sm mt-4">
              Après confirmation, vous serez redirigé vers votre espace équipe
            </p>
          </div>
        )}

        {/* ÉTAPE 3 : Succès */}
        {paymentStep === 'success' && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-green-600 mb-2">Paiement réussi !</h1>
            <p className="text-gray-600 mb-4">
              Votre inscription est maintenant validée.
              <br />
              Vous allez être redirigé vers votre espace équipe.
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        )}

        {/* Informations de support */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Une difficulté ? Contactez-nous au <span className="font-semibold">+225 XX XXX XXX</span>
          </p>
        </div>
      </div>
    </div>
  );
}