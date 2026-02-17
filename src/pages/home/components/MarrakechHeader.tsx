
export default function MarrakechHeader({
  logo,
  name,
  slogan,
}: {
  logo: string;
  name: string;
  slogan: string;
}) {
  return (
    <div className="text-center w-full mb-2">
      {/* Arche marocaine décorative autour du logo */}
      <div className="relative inline-block">
        {/* Halo doré derrière le logo - RÉDUIT */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#C9A227]/10 via-[#D4AF37]/5 to-[#C9A227]/10 blur-2xl" />
        </div>

        {/* Cercle décoratif extérieur - PLUS GRAND */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto flex items-center justify-center">
          {/* Anneau doré extérieur */}
          <div className="absolute inset-0 rounded-full border-2 border-[#C9A227]/60" />
          <div className="absolute inset-[3px] rounded-full border border-[#C9A227]/30" />

          {/* Petits losanges décoratifs sur l'anneau */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#C9A227]" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#C9A227]" />
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#C9A227]" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#C9A227]" />

          {/* Fond du logo */}
          <div className="absolute inset-[6px] rounded-full bg-gradient-to-b from-[#1A0A0E] via-[#200E14] to-[#1A0A0E] border border-[#C9A227]/20" />

          {/* Logo - PLUS GRAND ET SANS FLOU */}
          <img
            src={logo}
            alt={name}
            className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 object-contain"
          />
        </div>
      </div>

      {/* Nom du restaurant */}
      <h1
        className="text-2xl sm:text-3xl font-bold text-[#C9A227] mt-2 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        {name}
      </h1>

      {/* Séparateur décoratif */}
      <div className="flex items-center justify-center gap-2 my-2">
        <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#C9A227]/70" />
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rotate-45 bg-[#8B1538]" />
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-star-fill text-[10px] text-[#C9A227]" />
          </div>
          <div className="w-1 h-1 rotate-45 bg-[#8B1538]" />
        </div>
        <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#C9A227]/70" />
      </div>

      {/* Slogan */}
      <p className="text-[#E8DFD3]/70 text-[8px] sm:text-[9px] px-6 leading-relaxed font-medium tracking-[0.2em] uppercase">
        {slogan}
      </p>
    </div>
  );
}
