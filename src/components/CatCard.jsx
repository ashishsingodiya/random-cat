import { ExternalLink, MapPin, Sparkles } from "lucide-react";

const StatBadge = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between rounded-full bg-slate-900/70 px-4 py-2 text-sm text-slate-200">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-slate-50">{value}</span>
    </div>
  );
};

const CatCard = ({ cat, loading, error }) => {
  if (loading && !cat) {
    return (
      <div className="flex flex-col gap-6 rounded-3xl border border-slate-800/60 bg-slate-950/60 p-6 shadow-2xl shadow-black/30">
        <div className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-slate-800/60" />
        <div className="h-6 w-1/2 animate-pulse rounded-full bg-slate-800/60" />
        <div className="h-16 w-full animate-pulse rounded-2xl bg-slate-800/60" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full flex-col justify-center gap-3 rounded-3xl border border-rose-500/40 bg-rose-500/10 p-8 text-rose-100">
        <p className="text-lg font-semibold">We could not fetch a cat.</p>
        <p className="text-sm text-rose-200">{error}</p>
      </div>
    );
  }

  if (!cat) {
    return null;
  }

  return (
    <div className="flex h-full flex-col gap-6 rounded-3xl border border-slate-800/60 bg-slate-950/70 p-6 shadow-2xl shadow-black/30">
      <div className="group relative overflow-hidden rounded-2xl border border-slate-800/60">
        <img
          src={cat.image}
          alt={cat.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-amber-200">
          <Sparkles size={14} />
          Featured Cat
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-50">{cat.name}</h2>
          {cat.wiki && (
            <a
              href={cat.wiki}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-200 transition hover:text-amber-100"
            >
              Learn more <ExternalLink size={16} />
            </a>
          )}
        </div>

        <p className="text-sm leading-relaxed text-slate-300">
          {cat.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-4 py-2">
            <MapPin size={14} />
            {cat.origin}
          </span>
          <span className="rounded-full bg-slate-900/70 px-4 py-2">
            {cat.lifeSpan} years
          </span>
          <span className="rounded-full bg-slate-900/70 px-4 py-2">
            {cat.weight} kg
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <StatBadge label="Energy" value={`${cat.energy}/5`} />
          <StatBadge label="Affection" value={`${cat.affection}/5`} />
          <StatBadge label="Grooming" value={`${cat.grooming}/5`} />
        </div>

        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4 text-sm text-slate-200">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Temperament
          </p>
          <p className="mt-2 text-base text-slate-100">{cat.temperament}</p>
        </div>
      </div>
    </div>
  );
};

export default CatCard;
