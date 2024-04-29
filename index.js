#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const randomNumber = Math.floor(10000 + Math.random() * 90000);
let myBalance = 0;
let answer = await inquirer.prompt([
    {
        name: "students",
        type: "input",
        message: chalk.magenta("Enter Student name:"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        },
    },
    {
        name: "courses",
        type: "list",
        message: chalk.cyanBright("Select the course to enrolled"),
        choices: ["Ms.office", "HTML", "Javascript", "Typescript", "Python"],
    },
]);
const tutionFee = {
    "Ms.office": 2000,
    HTML: 2500,
    Javascript: 5000,
    Typescript: 6000,
    Python: 10000,
};
console.log(chalk.underline(`\nTution Fees: ${tutionFee[answer.courses]}/-\n`));
console.log(chalk.underline(`Balance:${myBalance}\n`));
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: chalk.blue("Select payment method"),
        choices: ["Bank Transfer", "EasyPaisa", "Jazzcash"],
    },
    {
        name: "amount",
        type: "input",
        message: chalk.magenta("Transfer Money"),
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        },
    },
]);
console.log(chalk.yellow(`\nYou select payment type ${paymentType.payment}`));
const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);
if (tutionFees === paymentAmount) {
    console.log(chalk.underline(`Congratulatons,You have Successfully Enrolled in ${answer.courses}.\n`));
    {
        let ans = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: chalk.blueBright("Would you like to do next"),
                choices: ["View Status", "Exit"],
            },
        ]);
        if (ans.select === "View Status") {
            console.log(chalk.blue("\n*********STATUS***********\n"));
            console.log(chalk.blue(`Student Name: ${answer.students}`));
            console.log(chalk.blue(`Student Id : ${randomNumber}`));
            console.log(chalk.blue(`course: ${answer.courses}`));
            console.log(chalk.blue(`Tution Fees Paid:${paymentAmount}`));
            console.log(chalk.blue(`Balance: ${myBalance += paymentAmount}`));
        }
        else {
            console.log(chalk.inverse("\n **********Exiting Student Management System**********\n"));
        }
    }
}
else {
    console.log(chalk.redBright("Inavalid Amount Due To Course!!!!!!!!"));
}
