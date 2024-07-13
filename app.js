#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// PALYER CLASS
class Player {
    name;
    fuel = 100;
    numOfHealthPortion = 3;
    healthportionAmount = 30;
    constructor(name) {
        this.name = name;
    }
}
// ENEMY CLASS
class Enemy {
    name;
    fuel = 75;
    constructor(name) {
        this.name = name;
    }
}
console.log(chalk.whiteBright("================================================================="));
console.log(chalk.redBright.bold.italic("               ##    Welcome To Advanture Game    ##               "));
console.log(chalk.whiteBright("================================================================="));
//  INPUT USER NAME 
let heroname = await inquirer.prompt({
    name: "p1name",
    type: "input",
    message: "Enter your name: ",
});
//  NEXT STEP : SELECT WHAT DO YOU WANT
let gameRunnning = true;
while (gameRunnning) {
    //  SELECT ENEMY NAME
    let enemyName = await inquirer.prompt({
        name: "e1name",
        type: "list",
        message: "Select Your Enemy",
        choices: ["Zombie", "Skeleton", "Assassin", "Alien", "Worrior"]
    });
    // CLASS INSTANCE 
    const p1 = new Player(heroname.p1name);
    const e1 = new Enemy(enemyName.e1name);
    console.log(chalk.greenBright.bold("\n\t\t\t GAME STARTED "));
    console.log("\n \t\t\t" + chalk.yellow.bold(p1.name) + " " + chalk.cyan.italic("V/S") + " " + chalk.yellow.bold(e1.name));
    console.log(chalk.yellow.bold(`${p1.name} Health : ${p1.fuel}`));
    console.log(chalk.yellow.bold(`${e1.name} Health : ${e1.fuel}`));
    while (e1.fuel > 0) {
        let ask = await inquirer.prompt({
            name: "ans",
            type: "list",
            message: chalk.bold.underline("\nWhat do you want to do?"),
            choices: ["1. Attack", "2. Drink Health Boaster", "3. Escape From The Enemy"]
        });
        //  SELECT 1. ATTACK 
        if (ask.ans === "1. Attack") {
            let damageToEnemy = Math.floor(Math.random() * 25 + 1);
            let damageToHero = Math.floor(Math.random() * 30 + 1);
            p1.fuel -= damageToHero;
            e1.fuel -= damageToEnemy;
            console.log((`\n${e1.name} damage to ${p1.name} : `) + chalk.green(`${damageToHero}`));
            console.log((`${p1.name} damage to ${e1.name} : `) + chalk.green(`${damageToEnemy}\n`));
            console.log(chalk.magenta.italic.underline("Score:"));
            console.log(chalk.yellow.bold(`${p1.name} Health : ${p1.fuel}`));
            console.log(chalk.yellow.bold(`${e1.name} Health : ${e1.fuel}\n`));
            if (p1.fuel < 1) {
                console.log(chalk.red(`Oppss!!! You Loose. You Don't have enough fuel!`));
                break;
            }
        }
        //  SELECT 2. DRINK HEALTH BOASTER
        else if (ask.ans === "2. Drink Health Boaster") {
            if (p1.numOfHealthPortion > 0) {
                p1.fuel += p1.healthportionAmount;
                p1.numOfHealthPortion--;
                console.log(chalk.greenBright(`\nYou Drink health boaster (fuel) : ${p1.healthportionAmount}!`));
                console.log(chalk.greenBright(`Your current health is ${p1.fuel}!`));
                console.log(chalk.greenBright(`Remaining  Health Boaster : ${p1.numOfHealthPortion} !\n
                    `));
            }
            else {
                console.log(chalk.red.underline(`\nYou have no health boaster. Defeat enemy for a chance to get health boaster!\n`));
            }
        }
        //  SELECT 3. RUN
        else if (ask.ans === "3. Escape From The Enemy") {
            console.log(chalk.redBright(` Looser! You run away from ${e1.name}!`));
            process.exit();
        }
    }
    if (p1.fuel < 1) {
        console.log(chalk.redBright.italic(`You are out from Game. You are weak !`));
        break;
    }
    console.log(chalk.cyanBright(`\nChamp !!! You Defeated ${e1.name} Enemy!`));
    console.log(chalk.cyanBright(`Your Health is ${p1.fuel} !\n`));
    let randomNum = Math.floor(Math.random() * 100 + 1);
    if (randomNum < 50) {
        p1.numOfHealthPortion++;
        console.log(chalk.bold.magentaBright(`Hurry !!! You Win the health portion after defeated the ${e1.name} enemy !`));
        console.log(chalk.bold.magentaBright(`Enemy ${e1.name} give you health boaster!\n`));
        console.log(chalk.yellowBright.italic(`Your Health is ${p1.fuel}`));
        console.log(chalk.yellowBright.italic(`Your health boaster is ${p1.numOfHealthPortion}\n`));
    }
    // CONFIRMATION
    let confirm = await inquirer.prompt({
        name: "ans2",
        type: "list",
        message: chalk.bold.underline("\nWould you like to countinue this game ?"),
        choices: ["1. Continue", "2. Exit"]
    });
    if (confirm.ans2 === "1. Continue") {
        console.log("\t\t" + chalk.underline.magenta("\nYou are continue on your advanture game!\n") + "\t\t");
    }
    else {
        console.log("\n\t\t" + chalk.underline.cyanBright(`## You are Successfully exit from the Advanture Game! ##`));
        console.log("\n\t\t" + chalk.italic.underline.bold.yellowBright(`## "Thank You For Playing Advanture Game" ##\n`) + "\t\t\n");
        break;
    }
}
