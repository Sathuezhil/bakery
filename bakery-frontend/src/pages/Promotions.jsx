import { useEffect, useState } from "react";

export default function Promotions() {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/promotions")
      .then(res => res.json())
      .then(setPromos);
  }, []);

  return (
    <div>
      <h2>Available Promotions</h2>
      <ul>
        {promos.map(promo => (
          <li key={promo._id}>
            <b>{promo.code}</b>: {promo.description}
          </li>
        ))}
      </ul>
    </div>
  );
} 