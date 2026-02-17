
import { useState, FormEvent } from 'react';

interface EmailFormProps {
  onSubmit: (email: string) => void;
}

export default function EmailForm({ onSubmit }: EmailFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Veuillez entrer votre email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Email invalide');
      return;
    }

    setError('');
    try {
      onSubmit(trimmedEmail);
    } catch (err) {
      console.error('Error in onSubmit callback:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        {/* Icône style lanterne marocaine */}
        <div className="w-14 h-14 mx-auto bg-gradient-to-br from-[#C9A227]/20 to-[#D4AF37]/10 rounded-full flex items-center justify-center mb-3 border-2 border-[#C9A227]/30 relative">
          <div className="absolute inset-0 rounded-full animate-pulse bg-[#C9A227]/5" />
          <i className="ri-mail-fill text-2xl text-[#C9A227]" />
        </div>

        <h2
          className="text-lg font-bold text-[#C9A227] mb-1"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {/* Directly use the emoji instead of a Unicode escape sequence */}
          Marhaba ! 👋
        </h2>
        <p className="text-[#E8DFD3]/70 text-xs">
          Entrez votre email pour participer
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full px-4 py-3 bg-[#2A1520]/80 border-2 border-[#C9A227]/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227] text-xs text-[#E8DFD3] placeholder-[#E8DFD3]/30 transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
              <i className="ri-at-line text-[#C9A227]/60" />
            </div>
          </div>
          {error && (
            <p className="text-[#A62639] text-[10px] mt-1.5 flex items-center gap-1">
              <i className="ri-error-warning-line" />
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#8B1538] to-[#A62639] hover:from-[#7A1230] hover:to-[#952235] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-[#8B1538]/30 text-xs whitespace-nowrap cursor-pointer border border-[#C9A227]/20 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Continuer
            <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </form>

      <p className="text-center text-[#E8DFD3]/30 text-[10px] flex items-center justify-center gap-1">
        <i className="ri-shield-check-line text-[#1B4D3E]" />
        Vos données sont sécurisées
      </p>
    </div>
  );
}
