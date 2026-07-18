let users = [];

function addUser(user) {
  users.push({
    id: Date.now(),
    balance: 0,
    banned: false,
    ...user
  });
}

function addBalance(userId, amount) {
  const user = users.find(
    u => u.id === userId
  );

  if (user) {
    user.balance += amount;
  }
}

function removeBalance(userId, amount) {
  const user = users.find(
    u => u.id === userId
  );

  if (user) {
    user.balance -= amount;
  }
}

function banUser(userId) {
  const user = users.find(
    u => u.id === userId
  );

  if (user) {
    user.banned = true;
  }
}

function getUsers() {
  return users;
}

export {
  addUser,
  addBalance,
  removeBalance,
  banUser,
  getUsers
};