export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header / Navigation */}
      <nav className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚽</span>
              <span className="font-bold text-xl">STRONG COMPÉTITION</span>
            </div>
            <div className="space-x-4">
              <a href="/classement" className="hover:text-blue-300 transition">Classement</a>
              <a href="/matchs" className="hover:text-blue-300 transition">Matchs</a>
              <a href="/tirage" className="hover:text-blue-300 transition">Tirage</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">TOURNOI OFFICIEL 2026</h1>
          <p className="text-xl md:text-2xl mb-8">Rejoignez la plus grande compétition de football</p>
          
          {/* Compteur */}
          <div className="bg-white/20 rounded-lg p-4 inline-block mb-12 backdrop-blur-sm">
            <p className="text-2xl font-semibold">🔥 12 équipes inscrites / 16</p>
          </div>

          {/* Boutons CTA */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="/equipe/inscription">
              <button className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg text-xl transition transform hover:scale-105 shadow-lg">
                🏆 INSCRIPTION ÉQUIPE
                <br />
                <span className="text-sm font-normal">Cliquez ici</span>
              </button>
            </a>
            <a href="/matchs/en-direct">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-lg text-xl transition shadow-lg border border-white/20">
                👀 ESPACE SPECTATEUR
                <br />
                <span className="text-sm font-normal">Matchs en direct</span>
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Cartes d'information */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Carte 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="text-blue-600 text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Frais d'inscription</h3>
            <p className="text-3xl font-bold text-blue-600">25 000 FCFA</p>
            <p className="text-gray-500 mt-2">Par équipe</p>
          </div>

          {/* Carte 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="text-blue-600 text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Prix à gagner</h3>
            <p className="text-3xl font-bold text-blue-600">500 000 FCFA</p>
            <p className="text-gray-500 mt-2">+ Trophée</p>
          </div>

          {/* Carte 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
            <div className="text-blue-600 text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Tirage au sort</h3>
            <p className="text-3xl font-bold text-blue-600">1er Mai</p>
            <p className="text-gray-500 mt-2">À 16h00</p>
          </div>
        </div>
      </div>

      {/* Section informations supplémentaires */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">📋 Format du tournoi</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ • 16 équipes réparties en 4 poules</li>
                <li>✓ • Phase de poules + éliminatoires directes</li>
                <li>✓ • Arbitrage officiel</li>
                <li>✓ • Matchs diffusés en direct</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🎁 Avantages</h3>
              <ul className="space-y-2 text-gray-600">
                <li>✓ • Lots pour les 3 premiers</li>
                <li>✓ • Médaille pour tous les participants</li>
                <li>✓ • Photos et vidéos des matchs</li>
                <li>✓ • Meilleur buteur récompensé</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© 2026 Strong Compétition - Tous droits réservés</p>
          <p className="text-sm text-blue-300 mt-2">Contact: contact@strongcompetition.com</p>
        </div>
      </footer>
    </div>
  );
}