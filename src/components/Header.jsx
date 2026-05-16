const Header = () => {
  return (
    <header className="flex flex-col gap-4">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-200">
        Random Cat Viewer
      </p>
      <h1 className="max-w-2xl font-[Playfair Display] text-4xl font-semibold text-slate-50 sm:text-5xl">
        Meet a new feline companion every time you tap next.
      </h1>
      <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
        Pulling fresh details from the FreeAPI catalog, this viewer keeps a
        growing gallery you can page through without losing past discoveries.
      </p>
    </header>
  );
};

export default Header;
