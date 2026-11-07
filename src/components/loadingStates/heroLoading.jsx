function HeroLoading() {
  return (
    <>
      <section className="relative rounded-md flex flex-col  min-h-[50dvh] sm:min-h-[70dvh]  mb-6 mt-2">
        {/* Background image placeholder */}
        <div className="loading absolute inset-0 z-20 h-full w-full rounded-md" />

        {/* Trending label placeholder */}
        <div className="relative flex-1 px-4 py-1  z-20 ">
          <div className="loading h-5 w-22 rounded-sm" />
        </div>

        <article className="relative z-20 sm:max-w-50 max-w-screen p-4 flex flex-col rounded-md gap-3 ">
          {/* Movie title */}
          <div className="loading h-36 w-64 rounded-md " />

          {/* Year, runtime and genres */}
          <section className="flex gap-2">
            <div className="loading h-4 w-12 rounded-md" />
            <div className="loading h-4 w-16 rounded-md" />
            <div className="loading h-4 w-20 rounded-md" />
          </section>

          {/* Overview text */}
          <section className="flex flex-col gap-2">
            <div className="loading h-4 w-65 rounded-md" />
            <div className="loading h-4 w-68  rounded-md" />
          </section>

          {/* Action buttons */}
          <footer className="flex gap-4 mt-2">
            <div className="loading h-11 w-32 rounded-md" />
            <div className="loading h-11 w-28 rounded-md" />
          </footer>
        </article>
      </section>
    </>
  );
}

export default HeroLoading;
