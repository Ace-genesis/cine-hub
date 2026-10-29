function HeroLoading() {
  return (
    <main className="p-sm-fluid overflow-y-hidden">
      <section className="relative rounded-md hero flex flex-col justify-end p-lg-fluid mb-6 mt-2">
        {/* Background image placeholder */}
        <div className="loading absolute inset-0 z-20 h-full w-full rounded-md" />

        {/* Trending label placeholder */}
        <div className="relative flex-grow z-20 ">
          <div className="loading h-5 w-28 rounded-sm" />
        </div>

        <article className="relative z-20 sm:max-w-50 max-w-screen py-8 flex flex-col rounded-md gap-4 ">
          {/* Movie title */}
          <div className="loading h-16 w-2/3 rounded-md " />

          {/* Year, runtime and genres */}
          <section className="flex gap-2">
            <div className="loading h-4 w-12 rounded-md" />
            <div className="loading h-4 w-16 rounded-md" />
            <div className="loading h-4 w-20 rounded-md" />
          </section>

          {/* Overview text */}
          <section className="flex flex-col gap-2">
            <div className="loading h-4 w-full rounded-md" />
            <div className="loading h-4 w-full rounded-md" />
            <div className="loading h-4 w-4/5 rounded-md" />
          </section>

          {/* Action buttons */}
          <footer className="flex gap-4 mt-2">
            <div className="loading h-11 w-32 rounded-md" />
            <div className="loading h-11 w-28 rounded-md" />
          </footer>
        </article>
      </section>
    </main>
  );
}

export default HeroLoading;
