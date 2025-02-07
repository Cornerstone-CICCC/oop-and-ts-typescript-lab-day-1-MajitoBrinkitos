"use strict";
// 🏦 Create a banking system where users can create accounts, deposit, withdraw, and check their balance.
// 1. Implement a function `createAccount` that adds a new account to the `accounts` array. It should return a `BankAccount` object.
// 2. Implement a function `processTransaction` that allows deposits and withdrawals and stores them in the transactions array. It should return a string.
// 3. Implement a function `getBalance` that returns the balance of a given account number.
// 4. Implement a function `getTransactionHistory` that returns the list of transactions for an account.
// 5. Implement a function `checkActiveStatus` that returns the active status of an account number.
// 6. Implement a function `closeAccount` that removes an account from the array and returns a confirmation string.
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["Deposit"] = 0] = "Deposit";
    TransactionType[TransactionType["Withdraw"] = 1] = "Withdraw";
})(TransactionType || (TransactionType = {}));
var accounts = [];
function createAccount(accountNo, firstname, lastname, initialDeposit, isActive) {
    if (isActive === void 0) { isActive = true; }
    var newAccount = {
        accountNo: accountNo,
        firstname: firstname,
        lastname: lastname,
        balance: initialDeposit,
        isActive: isActive,
        transactions: []
    };
    accounts.push(newAccount);
    return newAccount;
}
function processTransaction(accountNo, amount, transactionType) {
    //find the account to deposit/withdraw
    var account = accounts.find(function (acc) { return acc.accountNo === accountNo; });
    if (!account)
        return "This account does not exist";
    //deposit/withdraw
    if (transactionType === TransactionType.Deposit) {
        account.balance += amount;
        account.transactions.push({ accountNo: accountNo, amount: amount, type: TransactionType });
        return "The amount of: ".concat(amount, " was deposited into the account with number ").concat(accountNo);
    }
    else if (transactionType === TransactionType.Withdraw) {
        //insufficient funds
        if (amount > account.balance) {
            return "Insufficient funds for this withdrawal. Account number ".concat(accountNo);
        }
        else {
            account.balance -= amount;
            account.transactions.push({ accountNo: accountNo, amount: amount, type: TransactionType });
            return "The amount of: ".concat(amount, " was withdrawn from the account with number ").concat(accountNo);
        }
    }
}
function getBalance(accountNo) {
    var account = accounts.find(function (acc) { return acc.accountNo === accountNo; });
    if (!account) {
        return "The account ".concat(account, " was not found. Try again.");
    }
    return "Your balance is ".concat(account.balance);
}
function getTransactionHistory(accountNo) {
    var account = accounts.find(function (acc) { return acc.accountNo === accountNo; });
    if (!account) {
        return "The account with number ".concat(accountNo, " was not found.");
    }
    return account.transactions;
}
function checkActiveStatus(accountNo) {
    var account = accounts.find(function (acc) { return acc.accountNo === accountNo; });
    if (!account) {
        return "The account number ".concat(accountNo, " was not found or has a status of: NO ACTIVE.");
    }
    return "The account number ".concat(accountNo, " status: ACTIVE --->").concat(account.isActive);
}
function closeAccount(accountNo) {
    var index = accounts.findIndex(function (acc) { return acc.accountNo === accountNo; });
    if (index === -1) {
        return "The account number is not in the system. Try again";
    }
    return "The account number ".concat(accountNo, " has been successfully closed");
}
// Test cases (students should add more)
console.log(createAccount(1, "John", "Smith", 100)); // { accountNo: 1, firstname: "John", lastname: "Smith", balance: 100, isActive: true, transactions: [] }
console.log(createAccount(2, "Jane", "Doe", 250));
console.log(createAccount(3, "John", "Wick", 159));
//deposit/withdraw
console.log(processTransaction(1, 50, TransactionType.Deposit)); // "50 deposited into account number 1"
console.log(processTransaction(3, 175, TransactionType.Deposit)); //"175 deposited into account number 3"
console.log(processTransaction(1, 20, TransactionType.Withdraw)); // "20 withdrawn from account number 1"
console.log(processTransaction(2, 75, TransactionType.Withdraw));
//Insufficient funds
console.log(processTransaction(1, 500, TransactionType.Withdraw)); // "Insufficient funds for withdrawal"
//Balance
console.log(getBalance(1)); // 130
//Transaction History
console.log(getTransactionHistory(1)); // [{ accountNo: 1, amount: 50, type: TransactionType.Deposit }, { accountNo: 1, amount: 20, type: TransactionType.Withdraw }]
console.log(getTransactionHistory(4)); //not found
//Status
console.log(checkActiveStatus(1)); // true
console.log(checkActiveStatus(4)); //false
//Closing
console.log(closeAccount(1)); // "Account number 1 closed"
console.log(closeAccount(4)); // "Not in the system"
