import { BRAND } from '../lib/brand'

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white pt-28 pb-20 sm:pt-36">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand-200/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-brand-100/70 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="animate-fadeUp">
          <span className="chip mb-5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Open daily · {BRAND.hours}
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-950 sm:text-6xl">
            Fresh <span className="font-display text-brand-600">Juices</span>,
            <br />Shakes &amp; Coffee
            <br />in the heart of <span className="text-brand-600">Nazimabad</span>.
          </h1>
          <p className="mt-6 max-w-md text-lg text-slate-600">
            {BRAND.tagline} — premium shakes, fresh juices, smoothies and coffee at a reasonable price. Order online for delivery or pickup.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#menu" className="btn-primary">
              Order Now
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#visit" className="btn-ghost">Find us</a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <span className="font-semibold text-slate-700">{BRAND.rating}</span>
              <span className="text-slate-400">· {BRAND.reviews} Google reviews</span>
            </div>
            <div className="h-4 w-px bg-brand-200" />
            <div className="text-slate-600"><span className="font-semibold text-slate-800">{BRAND.foodpandaRating}</span> on foodpanda ({BRAND.foodpandaReviews}+)</div>
          </div>
        </div>

        <div className="relative animate-fadeUp">
          <div className="relative mx-auto aspect-square max-w-md">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-brand-500 to-brand-700 shadow-2xl shadow-brand-700/30" />
            <img
              src="https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Fresh milkshake from Shake N Flex"
              className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-[2rem] object-cover"
            />
            <div className="absolute -bottom-5 -left-5 animate-float rounded-2xl bg-white p-4 shadow-xl ring-1 ring-brand-100">
              <div className="text-3xl">🥤</div>
              <p className="mt-1 text-xs font-bold text-brand-700">18+ drinks</p>
              <p className="text-[11px] text-slate-500">Freshly made</p>
            </div>
            <div className="absolute -right-4 top-8 animate-float rounded-2xl bg-white p-4 shadow-xl ring-1 ring-brand-100" style={{ animationDelay: '1.5s' }}>
              <p className="text-2xl font-extrabold text-brand-600">Rs 270+</p>
              <p className="text-[11px] text-slate-500">Starting price</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
