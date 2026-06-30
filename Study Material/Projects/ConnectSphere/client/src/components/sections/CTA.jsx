function CTA() {
  return (
    <section className="bg-slate-950 px-6 py-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-blue-500/20 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 p-12 text-center shadow-[0_0_80px_rgba(59,130,246,0.25)]">

        <h2 className="text-4xl font-bold text-white md:text-6xl">
          Ready to Build Your Next Project?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
          Connect with talented students, collaborate on real-world ideas,
          and build an impressive portfolio together.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">

          <button className="rounded-2xl bg-white px-8 py-4 font-semibold text-blue-600 transition hover:scale-105">
            Join ConnectSphere
          </button>

          <button className="rounded-2xl border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white/10">
            Explore Projects
          </button>

        </div>

      </div>
    </section>
  );
}

export default CTA;