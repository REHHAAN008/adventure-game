import inquirer, { Answers, Question } from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.bgBlueBright.cyanBright(`\nWELCOME TO ADVENTURE GAME\n`));

class Player {
    name: string;
    fuel: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    fuelDecrease() {
        this.fuel -= 25;
    }

    fuelIncrease() {
        this.fuel = Math.min(this.fuel + 25, 100); // Ensure fuel does not exceed 100
    }
}

class Opponent {
    name: string;
    fuel: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    fuelDecrease() {
        this.fuel -= 25;
    }
}

const playerNameQuestion: Question<Answers> = {
    name: "name",
    type: "input",
    message: "Please enter your name",
};

const opponentSelectionQuestion: Question<Answers> = {
    name: "select",
    type: "list",
    message: "SELECT YOUR WEAPON",
    choices: ["Skeleton", "Alien", "Zombie"],
};

const actionQuestion: Question<Answers> = {
    name: "opt",
    type: "list",
    message: "WHAT WOULD YOU LIKE TO DO?",
    choices: ["Attack", "Drink Potion", "Run For Your Life..."],
};

async function main() {
    const playerResponse = await inquirer.prompt([playerNameQuestion]);
    const opponentResponse = await inquirer.prompt(opponentSelectionQuestion);

    const p1 = new Player(playerResponse.name);
    const o1 = new Opponent(opponentResponse.select);

    while (true) {
        const actionResponse = await inquirer.prompt(actionQuestion);

        if (actionResponse.opt === "Attack") {
            const num = Math.floor(Math.random() * 2);
            if (num > 0) {
                p1.fuelDecrease();
            } else {
                o1.fuelDecrease();
            }

            console.log(`${p1.name} fuel is ${p1.fuel}`);
            console.log(`${o1.name} fuel is ${o1.fuel}`);

            if (p1.fuel <= 0) {
                console.log(chalk.bold.redBright("You have no fuel left. You lose!"));
                break;
            }
            if (o1.fuel <= 0) {
                console.log(chalk.bold.greenBright(`Congratulations ${p1.name}, you have defeated the ${o1.name}!`));
                break;
            }
        } else if (actionResponse.opt === "Drink Potion") {
            p1.fuelIncrease();
            console.log(`You drink a health potion. Your fuel is ${p1.fuel}`);
        } else if (actionResponse.opt === "Run For Your Life...") {
            console.log(chalk.bold.cyanBright("You lose, better luck next time"));
            break;
        }
    }
}

main().catch((error) => {
    console.error("An error occurred:", error);
});
