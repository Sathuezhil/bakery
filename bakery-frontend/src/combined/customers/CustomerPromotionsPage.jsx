const mockPromotions = [
  { id: 1, title: '10% Off on Cakes', desc: 'Get 10% off on all cakes this week!' },
  { id: 2, title: 'Buy 2 Get 1 Free', desc: 'On all buns and rolls.' },
];

export default function CustomerPromotionsPage() {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Promotions</h3>
      <ul className="space-y-4">
        {mockPromotions.map((promo) => (
          <li key={promo.id} className="p-4 bg-orange-50 rounded-lg">
            <div className="font-semibold">{promo.title}</div>
            <div>{promo.desc}</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 