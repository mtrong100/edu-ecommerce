export const getLocal = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const setLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const addToLocalArrayUnique = (key, value) => {
  const current = getLocal(key);
  if (!current.includes(value)) {
    const updated = [value, ...current]; // prepend để sản phẩm mới nhất nằm đầu
    setLocal(key, updated.slice(0, 6)); // giới hạn tối đa 6 sản phẩm
  }
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const setCart = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

export const addToCart = (product) => {
  const current = getCart();
  const exists = current.find((p) => p.id === product.id);
  if (!exists) {
    const updated = [...current, product];
    setCart(updated);
  }
};
