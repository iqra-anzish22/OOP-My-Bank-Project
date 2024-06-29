#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";


console.log(chalk.blue("\t WELCOME TO OOP MY BANK "));
    console.log("-".repeat(60))

interface BankAcount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

class BankAcount implements BankAcount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance
    }
withdraw(amount: number): void {
      if (this.balance >= amount) {
        this.balance -= amount;
        console.log(chalk.greenBright(`\n Withdrwal of $${amount} successfull. Remaining balance:$ ${this.balance}`))
      }else{
        console.log(chalk.redBright("\n Insufficient balance"));
      }
}

deposit(amount: number): void {
    if(amount > 100){
        amount -= 1;
    }this.balance += amount;
    console.log(chalk.greenBright(`\n Deposit of $${amount} successfull.  Remaining balance: $ ${this.balance}`));
    
}

checkBalance(): void {
    console.log(chalk.greenBright(`\n Current balnace:$ ${this.balance}`));
    
}

}

class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAcount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNmuber: number, acconut: BankAcount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNmuber;
        this.account = acconut
    }
}


const accounts : BankAcount[] = [
    new BankAcount (1001, 500),
    new BankAcount (1002, 1000),
    new BankAcount (1003, 2000)
];


const customers: Customer[] = [
    new Customer ("Ali"," khan", "Male",25,3163356789, accounts[0]),
    new Customer ("Iqra"," Waqas", "Female",24,3163356789, accounts[1]),
    new Customer ("Hamza"," khan", "Male",35,3163356789, accounts[2])
]

 async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
        name: "accountNumber",
        type: "number",
        message:chalk.yellow("Enter your account number:")

        })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
if(customer){
  console.log(chalk.magenta(`\n Welcome, ${customer.firstName} ${customer.lastName}!\n`));
  const ans = await inquirer.prompt([{
name: "Select",
type: "list",
message:chalk.yellow("Select an operation"),
choices: ["Deposit","Wthdraw","Check Balance","Exit"]
  
}]);



switch(ans.Select) {
    case "Deposit":
        const depositAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: chalk.yellow("Enter the amount to Deposit:")
        });

        customer.account.deposit(depositAmount.amount);
        break;
     case "Wthdraw":
            const withdrawAmount = await inquirer.prompt({
                name: "amount",
                type: "number",
                message: chalk.yellow("Enter the amount to Withdraw:")
            });
    
            customer.account.withdraw(withdrawAmount.amount);
            break;
            case "Check Balance":
                customer.account.checkBalance();
                break;

                case "Exit":
                    console.log(chalk.redBright("\n Exiting bank program..."));
                    console.log(chalk.greenBright("\n thank you  for using our bank services. Have a great day!!"));

                    return;

     }
  
      }else {
        console.log(chalk.redBright("\n Invalid account number, please try again.!!"));
        
      }
      
      
            
        
    } while(true)
    
}

service();



















