import { BRAND } from '../lib/brand'

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 font-display text-lg text-white">S</span>
              <span className="font-display text-xl text-white">{BRAND.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-brand-200">
              {BRAND.tagline} — Fresh Juices, Shakes &amp; Coffee in Nazimabad, Karachi.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#menu" className="text-brand-200 hover:text-white">Menu</a></li>
              <li><a href="#about" className="text-brand-200 hover:text-white">About</a></li>
              <li><a href="#reviews" className="text-brand-200 hover:text-white">Reviews</a></li>
              <li><a href="#visit" className="text-brand-200 hover:text-white">Visit Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-brand-200">
              <li>{BRAND.address}</li>
              <li><a href={`tel:${BRAND.phoneIntl}`} className="hover:text-white">{BRAND.phone}</a></li>
              <li>{BRAND.hours} daily</li>
            </ul>
            <div className="mt-4 flex gap-2">
              <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20">Instagram</a>
              <a href={BRAND.facebook} target="_blank" rel="noreferrer" className="rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20">Facebook</a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-brand-300">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
