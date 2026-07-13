import { BRAND } from '../lib/brand'

const FEATURES = [
  { icon: '🥤', title: 'Premium Shakes', text: 'Thick, creamy shakes loaded with real chocolate, fruit and brownie mix-ins.' },
  { icon: '🍊', title: 'Fresh Juices', text: 'Hand-pressed seasonal fruits — no concentrates, no added sugar.' },
  { icon: '☕', title: 'Coffee & Chillers', text: 'Iced lattes, frappes and cool mint lemonades for every mood.' },
  { icon: '📍', title: 'Fast Delivery', text: 'Order online with GPS location for quick delivery across Nazimabad.' },
]

export default function About() {
  return (
    <section id="about" className="bg-brand-50/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3019018/pexels-photo-3019018.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Freshly prepared drinks at Shake N Flex"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-white p-5 shadow-xl ring-1 ring-brand-100 sm:block">
              <p className="font-display text-2xl text-brand-600">Since day one</p>
              <p className="text-sm text-slate-500">Always fresh, always flex.</p>
            </div>
          </div>

          <div>
            <span className="chip mb-4">About Us</span>
            <h2 className="section-title">A gem in Nazimabad No. 4</h2>
            <p className="mt-5 text-slate-600">
              {BRAND.name} is a juice, shake &amp; coffee bar in the heart of Nazimabad, Karachi.
              We use premium ingredients to craft fresh juices, thick milkshakes, smoothies and coffee —
              all at reasonable prices. Whether you walk in or order online, we make every drink the way you love it.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {FEATURES.map(f => (
                <div key={f.title} className="rounded-2xl border border-brand-100 bg-white p-5 transition hover:shadow-md">
                  <div className="text-2xl">{f.icon}</div>
                  <h3 className="mt-2 font-bold text-brand-950">{f.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
