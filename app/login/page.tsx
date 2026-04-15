'use client';

import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'equipe' | 'admin'>('equipe');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulation connexion (à remplacer par API réelle)
    setTimeout(() => {
      if (role === 'admin' && email === 'admin@strong.com' && password === 'admin123') {
        localStorage.setItem('strong_user', JSON.stringify({ role: 'admin', email, name: 'Administrateur' }));
        window.location.href = '/admin/dashboard';
      } else if (role === 'equipe' && email && password) {
        localStorage.setItem('strong_user', JSON.stringify({ role: 'equipe', email, equipeId: 1, equipeNom: 'AS Douanes' }));
        window.location.href = '/equipe/dashboard';
      } else {
        setError('Email ou mot de passe incorrect');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">⚽</div>
          <h1 className="text-2xl font-bold text-gray-800">Strong Compétition</h1>
          <p className="text-gray-500 mt-1">Connectez-vous à votre espace</p>
        </div>

        {/* Choix du rôle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setRole('equipe')}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              role === 'equipe' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🏆 Équipe
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              role === 'admin' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            👑 Administrateur
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="exemple@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
              ❌ {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-white transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        {role === 'equipe' && (
          <p className="text-center text-gray-500 text-sm mt-6">
            Pas encore inscrit ?{' '}
            <a href="/equipe/inscription" className="text-blue-600 font-semibold hover:underline">
              Inscrivez-vous
            </a>
          </p>
        )}

        {role === 'admin' && (
          <p className="text-center text-gray-400 text-xs mt-6">
            Démo: admin@strong.com / admin123
          </p>
        )}
      </div>
    </div>
  );
}