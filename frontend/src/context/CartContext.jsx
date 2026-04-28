import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const ex = state.find(i => i._id === action.item._id);
      if (ex) return state.map(i => i._id === action.item._id ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.item, qty: 1 }];
    }
    case 'REMOVE': return state.filter(i => i._id !== action.id);
    case 'INC': return state.map(i => i._id === action.id ? { ...i, qty: i.qty + 1 } : i);
    case 'DEC': return state.map(i => i._id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i);
    case 'CLEAR': return [];
    case 'INIT': return action.payload || [];
    default: return state;
  }
};

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    try { dispatch({ type: 'INIT', payload: JSON.parse(localStorage.getItem('cart')) || [] }); } catch {}
  }, []);
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(items)); }, [items]);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, subtotal, count, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
