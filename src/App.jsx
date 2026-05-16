import { useCallback, useEffect, useMemo, useState } from "react";
import CatCard from "./components/CatCard.jsx";
import Header from "./components/Header.jsx";
import PaginationControls from "./components/PaginationControls.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const normalizeCat = (data) => {
  const imageUrl =
    typeof data.image === "string" ? data.image : data.image?.url;

  return {
    id: data.id,
    name: data.name,
    image: imageUrl,
    description: data.description,
    temperament: data.temperament,
    origin: data.origin,
    lifeSpan: data.life_span,
    weight: data.weight?.metric,
    energy: data.energy_level,
    affection: data.affection_level,
    grooming: data.grooming,
    wiki: data.wikipedia_url,
  };
};

const App = () => {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentCat = useMemo(() => cats[currentIndex], [cats, currentIndex]);

  const fetchCat = useCallback(async () => {
    if (!API_URL) {
      setError("Missing API url in .env");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch a cat");
      }
      const payload = await response.json();
      const data = payload?.data;
      if (!data) {
        throw new Error("Unexpected API response");
      }

      const nextCat = normalizeCat(data);
      setCats((prev) => {
        const updated = [...prev, nextCat];
        setCurrentIndex(updated.length - 1);
        return updated;
      });
    } catch (fetchError) {
      setError(fetchError.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    if (cats.length === 0) {
      fetchCat();
    }
  }, [cats.length, fetchCat]);

  const handleNext = () => {
    if (currentIndex < cats.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }
    fetchCat();
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber-400/30 blur-3xl" />
          <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-rose-400/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
          <Header />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <CatCard cat={currentCat} loading={loading} error={error} />

            <PaginationControls
              currentIndex={currentIndex}
              total={cats.length}
              canPrev={currentIndex > 0}
              onPrev={handlePrev}
              onNext={handleNext}
              onFetchNew={fetchCat}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
