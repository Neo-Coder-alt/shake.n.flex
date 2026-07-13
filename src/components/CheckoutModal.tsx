import { useState } from 'react'
import { useCart } from '../lib/cart'
import { supabase } from '../lib/supabase'
import { BRAND } from '../lib/brand'

const DELIVERY_FEE = 150

type Status = 'idle' | 'locating' | 'submitting' | 'success' | 'error'

export default function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, subtotal, clear } = useCart()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery')
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [locError, setLocError] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [orderId, setOrderId] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)

  const total = deliveryType === 'delivery' ? subtotal + DELIVERY_FEE : subtotal

  const useCurrentLocation = () => {
    setLocError(null)
    if (!('geolocation' in navigator)) {
      setLocError('Geolocation is not supported by your browser.')
      return
    }
    setStatus('locating')
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords
        setCoords({ lat: latitude, lng: longitude })
        setStatus('idle')
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(r => r.json())
          .then(d => { if (d?.display_name) setAddress(a => (a ? a : d.display_name)) })
          .catch(() => {})
      },
      err => { setLocError(err.message || 'Unable to get your location.'); setStatus('idle') },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    )
  }

  const clearLocation = () => { setCoords(null); setLocError(null) }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (lines.length === 0) { setFormError('Your cart is empty.'); return }
    if (!name.trim() || !phone.trim()) { setFormError('Please enter your name and phone number.'); return }
    if (deliveryType === 'delivery' && !address.trim()) { setFormError('Please enter a delivery address.'); return }

    setStatus('submitting')
    const { data, error } = await supabase.from('orders').insert({
      customer_name: name.trim(),
      customer_phone: phone.trim(),
      delivery_type: deliveryType,
      address: deliveryType === 'pickup' ? `Pickup at ${BRAND.address}` : address.trim(),
      latitude: coords?.lat ?? null,
      longitude: coords?.lng ?? null,
      items: lines.map(l => ({ menu_item_id: l.item.id, name: l.item.name, price: l.item.price, quantity: l.quantity })),
      subtotal,
      delivery_fee: deliveryType === 'delivery' ? DELIVERY_FEE : 0,
      total,
      notes: notes.trim() || null,
      status: 'pending',
    }).select('id').maybeSingle()

    if (error || !data) {
      setStatus('error')
      setFormError(error?.message ?? 'Could not place your order. Please try again.')
      return
    }
    setOrderId(data.id)
    setStatus('success')
    clear()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-brand-950/50 p-4 backdrop-blur-sm">
      <div className="relative my-8 w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700 hover:bg-brand-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>

        {status === 'success' ? (
          <div className="p-8 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl">✓</div>
            <h3 className="mt-5 text-2xl font-extrabold text-brand-950">Order placed!</h3>
            <p className="mt-2 text-slate-600">Thank you, {name || 'friend'}! Your order has been received. We'll call you on {phone} to confirm.</p>
            {orderId && <p className="mt-3 rounded-xl bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">Order reference: {orderId.slice(0, 8).toUpperCase()}</p>}
            {coords && <p className="mt-3 text-xs text-slate-500">GPS location shared with the rider: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</p>}
            <button onClick={onClose} className="btn-primary mt-6 w-full">Done</button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-6 sm:p-8">
            <h3 className="text-2xl font-extrabold text-brand-950">Checkout</h3>
            <p className="mt-1 text-sm text-slate-500">Enter your details to place the order.</p>

            <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-brand-50 p-1.5">
              {(['delivery', 'pickup'] as const).map(t => (
                <button type="button" key={t} onClick={() => setDeliveryType(t)}
                  className={`rounded-xl py-2.5 text-sm font-semibold capitalize transition ${deliveryType === t ? 'bg-white text-brand-700 shadow' : 'text-brand-600'}`}>
                  {t === 'delivery' ? '🛵 Delivery' : '🏪 Pickup'}
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-brand-950">Full name</span>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="input" required />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-brand-950">Phone number</span>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="03XX XXXXXXX" inputMode="tel" className="input" required />
              </label>

              {deliveryType === 'delivery' && (
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-brand-950">Delivery address</span>
                  <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="House #, street, area…" rows={2} className="input" required />
                </label>
              )}

              {deliveryType === 'delivery' && (
                <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-brand-950">Share current location (GPS)</p>
                      <p className="text-xs text-slate-500">Helps the rider find you faster. Tap to allow location access.</p>
                    </div>
                    {coords ? (
                      <button type="button" onClick={clearLocation} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 ring-1 ring-rose-200 hover:bg-rose-50">Clear</button>
                    ) : (
                      <button type="button" onClick={useCurrentLocation} disabled={status === 'locating'}
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
                        {status === 'locating' ? (
                          <><span className="h-3 w-3 animate-spinSlow rounded-full border-2 border-white/40 border-t-white" /> Locating…</>
                        ) : (
                          <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Use current location</>
                        )}
                      </button>
                    )}
                  </div>

                  {coords && (
                    <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      Location captured: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
                      <a href={`https://www.google.com/maps?q=${coords.lat},${coords.lng}`} target="_blank" rel="noreferrer" className="ml-auto font-semibold underline">View map</a>
                    </div>
                  )}
                  {locError && <p className="mt-2 text-xs text-rose-600">{locError}</p>}
                </div>
              )}

              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-brand-950">Notes (optional)</span>
                <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. extra ice, no sugar…" className="input" />
              </label>
            </div>

            <div className="mt-6 rounded-2xl border border-brand-100 p-4">
              <h4 className="text-sm font-bold text-brand-950">Order summary</h4>
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {lines.map(l => (
                  <li key={l.item.id} className="flex justify-between">
                    <span>{l.quantity}× {l.item.name}</span>
                    <span>Rs {l.item.price * l.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 space-y-1 border-t border-brand-100 pt-3 text-sm">
                <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>Rs {subtotal}</span></div>
                {deliveryType === 'delivery' && <div className="flex justify-between text-slate-500"><span>Delivery fee</span><span>Rs {DELIVERY_FEE}</span></div>}
                <div className="flex justify-between text-base font-extrabold text-brand-950"><span>Total</span><span>Rs {total}</span></div>
              </div>
            </div>

            {formError && <p className="mt-4 rounded-xl bg-rose-50 px-4 py-2.5 text-sm text-rose-700">{formError}</p>}

            <button type="submit" disabled={status === 'submitting'} className="btn-primary mt-6 w-full disabled:opacity-60">
              {status === 'submitting' ? (
                <><span className="h-4 w-4 animate-spinSlow rounded-full border-2 border-white/40 border-t-white" /> Placing order…</>
              ) : (
                <>Place order · Rs {total}</>
              )}
            </button>
            <p className="mt-2 text-center text-xs text-slate-400">Cash on delivery. We'll call to confirm your order.</p>
          </form>
        )}
      </div>
    </div>
  )
}
