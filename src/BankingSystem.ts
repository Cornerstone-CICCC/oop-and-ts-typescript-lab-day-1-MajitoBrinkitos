// 🏦 Create a banking system where users can create accounts, deposit, withdraw, and check their balance.
// 1. Implement a function `createAccount` that adds a new account to the `accounts` array. It should return a `BankAccount` object.
// 2. Implement a function `processTransaction` that allows deposits and withdrawals and stores them in the transactions array. It should return a string.
// 3. Implement a function `getBalance` that returns the balance of a given account number.
// 4. Implement a function `getTransactionHistory` that returns the list of transactions for an account.
// 5. Implement a function `checkActiveStatus` that returns the active status of an account number.
// 6. Implement a function `closeAccount` that removes an account from the array and returns a confirmation string.

enum TransactionType {
  Deposit,
  Withdraw
}

type Transaction = {
  accountNo: number;
  amount: number;
  type: TransactionType;
};

type BankAccount = {
  accountNo: number;
  firstname: string;
  lastname: string;
  balance: number;
  isActive: boolean;
  transactions: Transaction[]
}

let accounts: BankAccount[] = [];

function createAccount(accountNo: number, firstname: string, lastname: string, initialDeposit: number, isActive = true): BankAccount {
  const newAccount: BankAccount = {
    accountNo,
    firstname,
    lastname,
    balance: initialDeposit,
    isActive,
    transactions: []
  };
  accounts.push(newAccount);
  return newAccount;
}

function processTransaction(accountNo: number, amount: number, transactionType: TransactionType): string {
  //find the account to deposit/withdraw
  const account = accounts.find(acc => acc.accountNo === accountNo);
  if(!account) return `This account does not exist`;

  //deposit/withdraw
  if(transactionType === TransactionType.Deposit){
    account.balance += amount;
    account.transactions.push({ accountNo, amount, type: TransactionType});
    return `The amount of: ${amount} was deposited into the account with number ${accountNo}`;
  } else if (transactionType === TransactionType.Withdraw){
    //insufficient funds
    if(amount > account.balance){
      return `Insufficient funds for this withdrawal. Account number ${accountNo}`
    } else {
      account.balance-= amount;
      account.transactions.push({ accountNo, amount, type: TransactionType });
      return `The amount of: ${amount} was withdrawn from the account with number ${accountNo}`;
    } 
  }
}

function getBalance(accountNo: number): number | string {
  const account = accounts.find(acc => acc.accountNo === accountNo);
  if(!account) {
    return `The account ${account} was not found. Try again.`
  }
  return `Your balance is ${account.balance}`;
}

function getTransactionHistory(accountNo: number): Transaction[] | string {
  const account = accounts.find(acc => acc.accountNo === accountNo);
  if(!account){
    return `The account with number ${accountNo} was not found.`;
  }
  return account.transactions;
}

function checkActiveStatus(accountNo: number): boolean | string {
  const account = accounts.find(acc => acc.accountNo === accountNo);
  if(!account){
    return `The account number ${accountNo} was not found or has a status of: NO ACTIVE.`
  }
  return `The account number ${accountNo} status: ACTIVE --->${account.isActive}`
}

function closeAccount(accountNo: number): string {
  const index = accounts.findIndex(acc => acc.accountNo === accountNo);
  if(index === -1) {
    return `The account number is not in the system. Try again`
  }
  return `The account number ${accountNo} has been successfully closed`
}

// Test cases (students should add more)
console.log(createAccount(1, "John", "Smith", 100)) // { accountNo: 1, firstname: "John", lastname: "Smith", balance: 100, isActive: true, transactions: [] }
console.log(createAccount(2, "Jane", "Doe", 250))
console.log(createAccount(3, "John", "Wick", 159))

//deposit/withdraw
console.log(processTransaction(1, 50, TransactionType.Deposit)) // "50 deposited into account number 1"
console.log(processTransaction(3, 175, TransactionType.Deposit)) //"175 deposited into account number 3"
console.log(processTransaction(1, 20, TransactionType.Withdraw)) // "20 withdrawn from account number 1"
console.log(processTransaction(2, 75, TransactionType.Withdraw))

//Insufficient funds
console.log(processTransaction(1, 500, TransactionType.Withdraw)) // "Insufficient funds for withdrawal"

//Balance
console.log(getBalance(1)) // 130

//Transaction History
console.log(getTransactionHistory(1)) // [{ accountNo: 1, amount: 50, type: TransactionType.Deposit }, { accountNo: 1, amount: 20, type: TransactionType.Withdraw }]
console.log(getTransactionHistory(4))//not found

//Status
console.log(checkActiveStatus(1)) // true
console.log(checkActiveStatus(4))//false

//Closing
console.log(closeAccount(1)) // "Account number 1 closed"
console.log(closeAccount(4)) // "Not in the system"