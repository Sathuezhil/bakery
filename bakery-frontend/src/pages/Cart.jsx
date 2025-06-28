import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item._id}>
            {item.name} x {item.quantity} - LKR {item.price * item.quantity}
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
} 
