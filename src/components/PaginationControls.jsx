import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";

const PaginationControls = ({
  currentIndex,
  total,
  canPrev,
  onPrev,
  onNext,
  onFetchNew,
  loading,
}) => {
  const indexLabel = total ? `${currentIndex + 1} of ${total}` : "0 of 0";

  return (
    <aside className="flex h-full flex-col justify-between gap-6 rounded-3xl border border-slate-800/60 bg-slate-950/70 p-6">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Gallery Navigation
        </p>
        <h3 className="text-2xl font-semibold text-slate-50">
          Keep a trail of favorites
        </h3>
        <p className="text-sm text-slate-300">
          Use the arrows to browse cats you have already fetched. Tap new cat to
          add another to the timeline.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Position
        </p>
        <p className="mt-2 text-3xl font-semibold text-slate-50">
          {indexLabel}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-800/60 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-amber-300/50 hover:text-amber-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <button
          type="button"
          onClick={onFetchNew}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Fetching..." : "New Cat"}
          {loading ? null : <Shuffle size={18} />}
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={loading || currentIndex >= total - 1}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-800/60 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-300/60 hover:text-sky-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </aside>
  );
};

export default PaginationControls;
