
export default function FoodIllustrations() {
  const dishes = [
    {
      src: "https://readdy.ai/api/search-image?query=Cartoon%20illustration%20of%20a%20traditional%20Moroccan%20tajine%20dish%20with%20colorful%20vegetables%20and%20meat%20steaming%20hot%20clay%20pot%20with%20conical%20lid%20warm%20earthy%20colors%20flat%20design%20style%20cute%20food%20illustration%20simple%20clean%20background%20transparent%20style%20vector%20art%20vibrant%20colors%20appetizing%20moroccan%20cuisine&width=200&height=200&seq=tajine01&orientation=squarish",
      alt: "Tajine marocain",
      label: "Tajine",
    },
    {
      src: "https://readdy.ai/api/search-image?query=Cartoon%20illustration%20of%20a%20traditional%20Moroccan%20couscous%20dish%20with%20semolina%20vegetables%20chickpeas%20and%20meat%20served%20in%20a%20beautiful%20decorated%20bowl%20warm%20golden%20colors%20flat%20design%20style%20cute%20food%20illustration%20simple%20clean%20background%20vector%20art%20vibrant%20appetizing%20moroccan%20cuisine%20steaming%20delicious&width=200&height=200&seq=couscous01&orientation=squarish",
      alt: "Couscous marocain",
      label: "Couscous",
    },
    {
      src: "https://readdy.ai/api/search-image?query=Cartoon%20illustration%20of%20a%20traditional%20Moroccan%20pastilla%20pie%20golden%20crispy%20phyllo%20pastry%20dusted%20with%20powdered%20sugar%20and%20cinnamon%20on%20a%20decorative%20plate%20warm%20colors%20flat%20design%20style%20cute%20food%20illustration%20simple%20clean%20background%20vector%20art%20vibrant%20appetizing%20moroccan%20cuisine&width=200&height=200&seq=pastilla01&orientation=squarish",
      alt: "Pastilla marocaine",
      label: "Pastilla",
    },
    {
      src: "https://readdy.ai/api/search-image?query=Cartoon%20illustration%20of%20a%20traditional%20Moroccan%20roasted%20chicken%20with%20preserved%20lemons%20and%20olives%20golden%20crispy%20skin%20served%20on%20ornate%20plate%20warm%20colors%20flat%20design%20style%20cute%20food%20illustration%20simple%20clean%20background%20vector%20art%20vibrant%20appetizing%20moroccan%20cuisine&width=200&height=200&seq=poulet01&orientation=squarish",
      alt: "Poulet marocain",
      label: "Poulet",
    },
  ];

  return (
    <div className="w-full mt-1 mb-1">
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        {dishes.map((dish, index) => (
          <div
            key={dish.label}
            className="flex flex-col items-center group"
            style={{
              animation: `floatDish 3s ease-in-out ${index * 0.4}s infinite`,
            }}
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#C9A227]/50 shadow-lg shadow-black/30 group-hover:border-[#C9A227] transition-all duration-300 group-hover:scale-110 cursor-pointer bg-[#1A0A0E]">
              <img
                src={dish.src}
                alt={dish.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to a placeholder image if the source fails to load
                  e.currentTarget.src =
                    "https://via.placeholder.com/200?text=Image+Not+Found";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <span
              className="text-[8px] sm:text-[9px] text-[#C9A227]/80 mt-1 font-medium tracking-wide"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {dish.label}
            </span>
          </div>
        ))}
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes floatDish {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
