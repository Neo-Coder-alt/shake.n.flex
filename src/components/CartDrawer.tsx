import { useCart } from '../lib/cart'
import { BRAND } from '../lib/brand'

export default function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const { lines, openCart, setOpenCart, dec, add, remove, subtotal, count } = useCart()

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-brand-950/40 backdrop-blur-sm transition-opacity duration-300 ${openCart ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setOpenCart(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${openCart ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="flex items-center justify-between border-b border-brand-100 px-5 py-4">
          <h3 className="text-lg font-bold text-brand-950">Your Cart ({count})</h3>
          <button onClick={() => setOpenCart(false)} className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-700 hover:bg-brand-100">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-5xl">🥤</div>
              <p className="mt-4 font-semibold text-brand-950">Your cart is empty</p>
              <p className="mt-1 text-sm text-slate-500">Add some shakes, juices or coffee to get started.</p>
              <button onClick={() => setOpenCart(false)} className="btn-primary mt-6">Browse menu</button>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map(l => (
                <li key={l.item.id} className="flex items-center gap-3 rounded-2xl border border-brand-100 p-3">
                  <img src={l.item.image_url ?? 'https://images.pexels.com/photos/3727250/pexels-photo-3727250.jpeg?auto=compress&cs=tinysrgb&w=200'} alt={l.item.name} className="h-14 w-14 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold text-brand-950">{l.item.name}</p>
                    <p className="text-sm text-slate-500">Rs {l.item.price} each</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <button onClick={() => dec(l.item.id)} className="grid h-7 w-7 place-items-center rounded-full bg-brand-50 font-bold text-brand-700 hover:bg-brand-100">−</button>
                      <span className="w-6 text-center text-sm font-bold">{l.quantity}</span>
                      <button onClick={() => add(l.item)} className="grid h-7 w-7 place-items-center rounded-full bg-brand-600 font-bold text-white hover:bg-brand-700">+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-brand-700">Rs {l.item.price * l.quantity}</p>
                    <button onClick={() => remove(l.item.id)} className="mt-1 text-xs text-rose-500 hover:underline">Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t border-brand-100 px-5 py-4">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Subtotal</span><span>Rs {subtotal}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm text-slate-500">
              <span>Delivery</span><span>Calculated at checkout</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-lg font-extrabold text-brand-950">
              <span>Total</span><span>Rs {subtotal}+</span>
            </div>
            <button onClick={onCheckout} className="btn-primary mt-4 w-full">
              Checkout
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <p className="mt-2 text-center text-xs text-slate-400">Orders handled by {BRAND.name} · {BRAND.phone}</p>
          </footer>
        )}
      </aside>
    </>
  )
}
