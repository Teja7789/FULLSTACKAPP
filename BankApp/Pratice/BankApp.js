// const mongoose = require('./sever/MongoDB')
const readline = require('readline');
const rl = readline.createInterface({ 
    input:process.stdin, 
    output:process.stdout
 });

function userChoice() {
    return new Promise(resolve =>{
    rl.question("Enter your Choice:" , ch =>{
        console.log(`Your choice is ${ch}`);
        resolve(ch);
        // rl.close();
    });
})
}

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});
async function userInput(){
 while(true){
    let ch1 = await userChoice();
    if (ch1 === "1"){
        console.log("create Acc");
    }else if(ch1 === "2"){
        console.log("create Acc2"); 
    }else if(ch1 === "6"){
        rl.close();
        break;
    }
    else{
        console.log("Invaild Input Entered: Note(1-2) only and 6 to exist");
    }
}
}
userInput();

// const readline = require('readline');
// const rl = readline.createInterface({ 
//     input: process.stdin, 
//     output: process.stdout
// });

// console.log('Hello bankWorld');
// console.log('\n 1. As an user, I would like have create account facility');
// console.log('\n 2. As an user, I would like to deposit money to my account');
// console.log('\n 3. As an user. I would like to withdraw money from my account');
// console.log('\n 4. As an user I would like to check balance of my account');
// console.log('\n 5. As an user I would like to transfer money from my account to other account');
// console.log('\n 6. Exit');

// function getUserChoice() {
//     return new Promise(resolve => {
//         rl.question("Enter your Choice:", ch => {
//             console.log(`Your choice is ${ch}`);
//             resolve(ch);
//         });
//     });
// }

// rl.on("close", function() {
//     console.log("\nBYE BYE !!!");
//     process.exit(0);
// });

// async function userInput() {
//     while (true) {
//         let ch1 = await getUserChoice();
//         if (ch1 === '1') {
//             console.log("create Acc");
//         } else if (ch1 === '2') {
//             console.log("deposit money");
//         } else if (ch1 === '6') {
//             rl.close(); // Close the readline interface to exit the program
//             break; // Exit the loop
//         } else {
//             console.log("Invalid choice");
//         }
//     }
// }

// userInput();