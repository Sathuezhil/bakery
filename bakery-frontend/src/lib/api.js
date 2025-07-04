const API_URL = 'http://localhost:3000'; // Change port if needed

export async function fetchProducts(branch) {
  const res = await fetch(`${API_URL}/products`);
  const all = await res.json();
  return all.filter(p => p.branch === branch);
}

export async function addProduct(product) {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return res.json();
} 