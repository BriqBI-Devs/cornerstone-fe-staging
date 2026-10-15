export function CultureBanner() {
  return (
    // Breaks out of the centred page column so the band spans the full window width.
    <header className="relative left-1/2 -ml-[50vw] -mt-6 w-screen border-t-[5px] border-brand-accent bg-brand-navy text-white">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-10 md:px-8 md:py-12">
        <h1 className="text-[clamp(34px,4.6vw,56px)] font-extrabold leading-[1.05] tracking-[-0.035em]">
          Company + Culture
        </h1>
        <p className="max-w-[600px] text-balance text-[15px] leading-[1.65] text-white/75">
          Workiversaries, welcomes, team milestones, and the stories that make L+M feel like home, across every
          office and every team.
        </p>
      </div>
    </header>
  );
}
