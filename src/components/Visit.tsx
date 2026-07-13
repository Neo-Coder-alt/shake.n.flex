import { BRAND } from '../lib/brand'

export default function Visit() {
  const mapEmbed = `https://www.google.com/maps?q=${BRAND.lat},${BRAND.lng}&z=15&output=embed`
  return (
    <section id="visit" className="bg-brand-50/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="chip mb-4">Visit Us</span>
            <h2 className="section-title">Find us in Nazimabad</h2>
            <p className="mt-5 text-slate-600">
              Come enjoy fresh juices, shakes &amp; coffees at a reasonable price, or order online for delivery right to your door.
            </p>

            <div className="mt-8 space-y-4">
              <InfoRow icon="📍" title="Address" text={BRAND.address} href={BRAND.mapsUrl} />
              <InfoRow icon="🕐" title="Hours" text={`Open daily · ${BRAND.hours}`} />
              <InfoRow icon="📞" title="Phone" text={BRAND.phone} href={`tel:${BRAND.phoneIntl}`} />
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-lg">🔗</span>
                <div>
                  <p className="font-semibold text-brand-950">Follow us</p>
                  <div className="mt-1.5 flex gap-2">
                    <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="rounded-full bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-700">Instagram</a>
                    <a href={BRAND.facebook} target="_blank" rel="noreferrer" className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-brand-700 ring-1 ring-brand-200 transition hover:bg-brand-50">Facebook</a>
                  </div>
                </div>
              </div>
            </div>

            <a href={BRAND.mapsUrl} target="_blank" rel="noreferrer" className="btn-primary mt-8">
              Get Directions
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-brand-100 shadow-xl">
            <iframe
              title="Shake N Flex location"
              src={mapEmbed}
              className="h-full min-h-[340px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ icon, title, text, href }: { icon: string; title: string; text: string; href?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-lg">{icon}</span>
      <div>
        <p className="font-semibold text-brand-950">{title}</p>
        {href ? (
          <a href={href} className="text-slate-600 underline-offset-2 hover:text-brand-700 hover:underline">{text}</a>
        ) : (
          <p className="text-slate-600">{text}</p>
        )}
      </div>
    </div>
  )
}
