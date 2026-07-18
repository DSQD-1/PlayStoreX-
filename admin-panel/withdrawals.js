let withdrawals = [];

function createWithdrawal(data) {
  withdrawals.push({
    id: Date.now(),

    userId: data.userId,
    amount: data.amount,

    method: data.method,
    details: data.details,

    status: "waiting",

    createdAt: new Date()
  });
}


function approveWithdrawal(id) {
  const withdrawal = withdrawals.find(
    w => w.id === id
  );

  if (withdrawal) {
    withdrawal.status = "approved";
  }
}


function rejectWithdrawal(id) {
  const withdrawal = withdrawals.find(
    w => w.id === id
  );

  if (withdrawal) {
    withdrawal.status = "rejected";
  }
}


function getWithdrawals() {
  return withdrawals;
}


export {
  createWithdrawal,
  approveWithdrawal,
  rejectWithdrawal,
  getWithdrawals
};