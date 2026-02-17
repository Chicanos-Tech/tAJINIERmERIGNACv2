
import { useState, useEffect } from 'react';
import WheelCanvas from './components/WheelCanvas';
import EmailForm from './components/EmailForm';
import ConfettiEffect from './components/ConfettiEffect';
import MarrakechHeader from './components/MarrakechHeader';
import FoodIllustrations from './components/FoodIllustrations';

const RESTAURANT_CONFIG = {
  name: 'Tajinier',
  slogan: 'LE MEILLEUR DE LA CUISINE ET DE L\'HOSPITALITÉ MAROCAINE',
  logo: 'https://static.readdy.ai/image/a9d3bcc67c991056923061701e9fee80/4a7d196d11346653920a62c18f370093.png',
  googlePlaceId: 'ChIJ5yphIvDZVA0Rykpm0HohmHA',
  prizes: [
    { label: 'Thé offert', probability: 0.25, color: '#1B4D3E' },
    { label: 'Dessert gratuit', probability: 0.20, color: '#8B1538' },
    { label: '10% de réduction', probability: 0.15, color: '#C9A227' },
    { label: 'Café offert', probability: 0.20, color: '#2D5F4F' },
    { label: 'Réessayez', probability: 0.20, color: '#A62639' },
  ],
};

export default function Home() {
  const [step, setStep] = useState<'email' | 'review' | 'wheel' | 'result'>('email');
  const [userEmail, setUserEmail] = useState('');
  const [prize, setPrize] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // -------------------------------------------------------------------------
  // Load persisted state (email & review flag) on component mount
  // -------------------------------------------------------------------------
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('userEmail');
      const hasReviewed = localStorage.getItem('hasReviewed');
      if (savedEmail && hasReviewed === 'true') {
        setUserEmail(savedEmail);
        setStep('wheel');
      } else if (savedEmail) {
        setUserEmail(savedEmail);
        setStep('review');
      }
    } catch (e) {
      console.error('Failed to read from localStorage', e);
    }
  }, []);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------
  const handleEmailSubmit = (email: string) => {
    setUserEmail(email);
    try {
      localStorage.setItem('userEmail', email);
    } catch (e) {
      console.error('Error saving email to localStorage', e);
    }
    setStep('review');
  };

  const handleOpenReview = () => {
    const reviewUrl = `https://search.google.com/local/writereview?placeid=${RESTAURANT_CONFIG.googlePlaceId}`;
    window.open(reviewUrl, '_blank');
    // Give the user a moment before we assume the review is done
    setTimeout(() => {
      try {
        localStorage.setItem('hasReviewed', 'true');
      } catch (e) {
        console.error('Error persisting review flag', e);
      }
      setStep('wheel');
    }, 1000);
  };

  const handleSpinComplete = (selectedPrize: string) => {
    setPrize(selectedPrize);
    setShowConfetti(true);
    setStep('result');

    try {
      const logs = JSON.parse(localStorage.getItem('prizeLogs') || '[]');
      logs.push({
        email: userEmail,
        prize: selectedPrize,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('prizeLogs', JSON.stringify(logs));
    } catch (e) {
      console.error('Error logging prize to localStorage', e);
    }

    // Hide confetti after a short period
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const handleSpin = () => {
    setIsSpinning(true);
  };

  const handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
    setStep('email');
    setUserEmail('');
    setPrize('');
    setShowConfetti(false);
    setIsSpinning(false);
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-3 py-3">
      {/* Fond Marrakech */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://readdy.ai/api/search-image?query=Moroccan%20riad%20interior%20warm%20terracotta%20walls%20with%20intricate%20zellige%20tile%20patterns%20ornate%20carved%20plaster%20archways%20warm%20golden%20lantern%20light%20traditional%20Marrakech%20architecture%20rich%20earthy%20tones%20red%20orange%20gold%20ambient%20atmosphere%20no%20people%20elegant%20moroccan%20design&width=800&height=1400&seq=bg001&orientation=portrait"
          alt="Riad marocain"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {showConfetti && <ConfettiEffect />}

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        {/* Header Marrakech avec logo en grand */}
        <MarrakechHeader
          logo={RESTAURANT_CONFIG.logo}
          name={RESTAURANT_CONFIG.name}
          slogan={RESTAURANT_CONFIG.slogan}
        />

        {/* Illustrations de plats cartoon */}
        <FoodIllustrations />

        {/* Carte principale */}
        <div className="relative w-full mt-3">
          {/* Bordure ornementale dorée */}
          <div className="absolute -inset-[3px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A227] via-[#D4AF37] to-[#C9A227]" />
            {/* Motif dans la bordure */}
            <div className="absolute inset-[2px] rounded-2xl bg-[#1A0A0E]" />
          </div>

          <div className="relative bg-gradient-to-b from-[#1A0A0E] via-[#200E14] to-[#1A0A0E] rounded-2xl p-4 sm:p-5 border border-[#C9A227]/40 shadow-2xl">
            {/* Coins décoratifs marocains */}
            <div className="absolute top-1 left-1 w-6 h-6">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#C9A227] to-transparent" />
              <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-[#C9A227] to-transparent" />
              <div className="absolute top-[3px] left-[3px] w-1.5 h-1.5 rotate-45 bg-[#C9A227]/60" />
            </div>
            <div className="absolute top-1 right-1 w-6 h-6">
              <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#C9A227] to-transparent" />
              <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#C9A227] to-transparent" />
              <div className="absolute top-[3px] right-[3px] w-1.5 h-1.5 rotate-45 bg-[#C9A227]/60" />
            </div>
            <div className="absolute bottom-1 left-1 w-6 h-6">
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#C9A227] to-transparent" />
              <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-[#C9A227] to-transparent" />
              <div className="absolute bottom-[3px] left-[3px] w-1.5 h-1.5 rotate-45 bg-[#C9A227]/60" />
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6">
              <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#C9A227] to-transparent" />
              <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-[#C9A227] to-transparent" />
              <div className="absolute bottom-[3px] right-[3px] w-1.5 h-1.5 rotate-45 bg-[#C9A227]/60" />
            </div>

            {/* Ligne décorative supérieure */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent" />
              <div className="flex gap-1">
                <div className="w-1 h-1 rotate-45 bg-[#C9A227]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#8B1538] border border-[#C9A227]/60" />
                <div className="w-1 h-1 rotate-45 bg-[#C9A227]" />
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent" />
            </div>

            {/* STEP: EMAIL */}
            {step === 'email' && <EmailForm onSubmit={handleEmailSubmit} />}

            {/* STEP: REVIEW */}
            {step === 'review' && (
              <div className="text-center space-y-3">
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-[#C9A227]/20 to-[#D4AF37]/10 rounded-full flex items-center justify-center border-2 border-[#C9A227]/40 relative">
                  <div className="absolute inset-0 rounded-full animate-pulse bg-[#C9A227]/10" />
                  <i className="ri-star-fill text-2xl text-[#C9A227]" />
                </div>
                <h2 className="text-lg font-bold text-[#C9A227]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Laissez-nous un avis
                </h2>
                <p className="text-[#E8DFD3]/80 text-xs leading-relaxed px-2">
                  Votre avis nous aide à vous offrir la meilleure expérience culinaire marocaine.
                </p>
                <button
                  onClick={handleOpenReview}
                  className="w-full bg-gradient-to-r from-[#8B1538] to-[#A62639] hover:from-[#7A1230] hover:to-[#952235] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg text-xs whitespace-nowrap cursor-pointer border border-[#C9A227]/30"
                >
                  <i className="ri-google-fill mr-2" />
                  Laisser un avis Google
                </button>
                <p className="text-[10px] text-[#E8DFD3]/50 mt-2 px-2">
                  Après votre avis, revenez tourner la roue !
                </p>
              </div>
            )}

            {/* STEP: WHEEL */}
            {step === 'wheel' && (
              <div className="text-center space-y-2">
                <h2 className="text-lg font-bold text-[#C9A227]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Tournez la roue !
                </h2>
                <p className="text-[#E8DFD3]/70 text-xs">
                  Tentez votre chance et gagnez un cadeau
                </p>
                <WheelCanvas
                  prizes={RESTAURANT_CONFIG.prizes}
                  onSpinComplete={handleSpinComplete}
                  isSpinning={isSpinning}
                  setIsSpinning={setIsSpinning}
                />
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform shadow-lg text-xs whitespace-nowrap cursor-pointer ${
                    isSpinning
                      ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                      : 'bg-gradient-to-r from-[#1B4D3E] to-[#2D5F4F] hover:from-[#163D32] hover:to-[#265248] text-white hover:scale-[1.02] border border-[#C9A227]/30'
                  }`}
                >
                  {isSpinning ? (
                    <>
                      <i className="ri-loader-4-line animate-spin mr-2" />
                      En cours...
                    </>
                  ) : (
                    <>
                      <i className="ri-refresh-line mr-2" />
                      Tourner la roue
                    </>
                  )}
                </button>
              </div>
            )}

            {/* STEP: RESULT */}
            {step === 'result' && (
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#C9A227] to-[#D4AF37] rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-[#C9A227]/30">
                  <i className="ri-gift-2-fill text-2xl text-[#1A0A0E]" />
                </div>
                <h2 className="text-xl font-bold text-[#C9A227]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Mabrouk ! 🎉
                </h2>
                <div className="bg-gradient-to-r from-[#1B4D3E]/20 via-[#2D5F4F]/20 to-[#1B4D3E]/20 rounded-xl p-4 border-2 border-[#C9A227]/30 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B1538] via-[#C9A227] to-[#1B4D3E]" />
                  <p className="text-lg font-bold text-[#C9A227]">{prize}</p>
                </div>
                <p className="text-[#E8DFD3]/60 text-xs px-2">
                  Présentez cet écran pour récupérer votre cadeau !
                </p>
                <div className="pt-2 border-t border-[#C9A227]/20">
                  <p className="text-[10px] text-[#E8DFD3]/40">Email : {userEmail}</p>
                </div>
              </div>
            )}

            {/* Ligne décorative inférieure */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent" />
              <div className="flex gap-1">
                <div className="w-1 h-1 rotate-45 bg-[#C9A227]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#1B4D3E] border border-[#C9A227]/60" />
                <div className="w-1 h-1 rotate-45 bg-[#C9A227]" />
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 space-y-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center px-3 py-1.5 text-[10px] text-[#E8DFD3]/40 hover:text-[#C9A227] bg-black/30 hover:bg-black/50 rounded-lg border border-[#C9A227]/20 hover:border-[#C9A227]/40 transition-all duration-300 shadow-sm whitespace-nowrap cursor-pointer backdrop-blur-sm"
          >
            <i className="ri-restart-line mr-1" />
            Recommencer (pour test)
          </button>
          <div className="flex items-center justify-center gap-2">
            <div className="h-[1px] w-6 bg-[#C9A227]/30" />
            <div className="w-1 h-1 rotate-45 bg-[#C9A227]/40" />
            <div className="h-[1px] w-6 bg-[#C9A227]/30" />
          </div>
          <p className="text-[#E8DFD3]/30 text-[9px]">
            © 2025 {RESTAURANT_CONFIG.name} • Cuisine Marocaine Authentique
          </p>
          <a
            href="https://readdy.ai/?ref=logo"
            rel="nofollow"
            className="text-[#E8DFD3]/20 text-[8px] hover:text-[#C9A227]/40 transition-colors cursor-pointer"
          >
            Powered by Readdy
          </a>
        </div>
      </div>
    </div>
  );
}
