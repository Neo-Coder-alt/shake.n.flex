import { BRAND } from '../lib/brand'

const REVIEWS = [
  { name: 'BitesAndVibes', source: 'Instagram', text: 'Nazimabad mein Shake n Flex ka visit aur honestly taste bilkul on point. Extensive range of shakes, fresh juices, smoothies and coffee.', rating: 5 },
  { name: 'Minahil Waseem', source: 'Instagram', text: 'I recently discovered this cart while roaming around — a gem in Nazimabad no 4. Premium ingredients and great taste.', rating: 5 },
  { name: 'scrollnshine', source: 'TikTok', text: 'Creamy, refreshing, and packed with goodness in every sip. Definitely worth trying the hazelnut and chocolate brownie shakes!', rating: 5 },
  { name: 'foodpanda customer', source: 'foodpanda', text: 'Quick delivery, well packed and the shakes are consistently great. The Feast Shake is my go-to.', rating: 5 },
  { name: 'Nazia Passion Vlogs', source: 'YouTube', text: 'Best shakes & juice bar in Nazimabad. Many items available, Pistachio Frappe and The Beast are must-tries.', rating: 5 },
  { name: 'Google reviewer', source: 'Google', text: 'Reasonable prices, fresh juices and friendly service. A lovely little spot to grab a drink and relax.', rating: 4 },
]

export default function Reviews() {
  return (
    <section id="reviews" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip mb-4">Loved by Karachi</span>
          <h2 className="section-title">What people are saying</h2>
          <div className="mt-4 flex items-center justify-center gap-3 text-sm">
            <div className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <span className="font-semibold text-slate-700">{BRAND.rating} average</span>
            <span className="text-slate-400">· {BRAND.reviews + BRAND.foodpandaReviews}+ reviews</span>
          </div>
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="mb-5 break-inside-avoid rounded-3xl border border-brand-100 bg-brand-50/40 p-6">
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <blockquote className="mt-3 text-slate-700">“{r.text}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 font-bold text-white">{r.name[0]}</div>
                <div>
                  <p className="font-semibold text-brand-950">{r.name}</p>
                  <p className="text-xs text-slate-400">via {r.source}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
