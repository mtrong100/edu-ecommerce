export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

export const saveUser = (user) => {
  const users = getUsers();
  const exists = users.find((u) => u.email === user.email);
  if (exists) return false;
  localStorage.setItem("users", JSON.stringify([...users, user]));
  return true;
};

export const authenticate = (email, password) => {
  const users = getUsers();
  return users.find((u) => u.email === email && u.password === password);
};

export const resetPassword = (email, newPassword) => {
  let users = getUsers();
  const index = users.findIndex((u) => u.email === email);
  if (index !== -1) {
    users[index].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  }
  return false;
};
