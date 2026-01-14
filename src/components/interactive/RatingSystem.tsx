import { useState, useEffect } from 'preact/hooks';
import { Star } from 'lucide-preact';

interface Props {
  promptId: string; // ID unik untuk setiap prompt biar rating gak ketukar
}

export default function RatingSystem({ promptId }: Props) {
  const [rating, setRating] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Load rating dari LocalStorage pas komponen muncul
  useEffect(() => {
    setIsMounted(true);
    const savedRating = localStorage.getItem(`rate_${promptId}`);
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
  }, [promptId]);

  const handleRate = (star: number) => {
    setRating(star);
    localStorage.setItem(`rate_${promptId}`, star.toString());
  };

  // Jangan render apa-apa di server (mencegah layout shift/flicker)
  if (!isMounted) return <div className="h-5 w-24 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRate(star)}
          className="focus:outline-none transition-transform active:scale-90"
          aria-label={`Rate ${star} stars`}
        >
          <Star
            size={16}
            className={`${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-transparent text-gray-300 dark:text-gray-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
}