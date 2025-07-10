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
