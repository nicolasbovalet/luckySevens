let allTestsPassed = true; // Track overall test success

//Test Function
function assertCondition(condition, message) {
    if (!condition) {
        console.error(message);
        return false;
    }
    return true;
}

// Test Case 1: Checks if User() object is created correctly
let test1 = new User("John", "Doe", "JohnthegoatDoe", "8192988192", "Gatineau", "doe.john@gmail.com");

let test1Passed = true; 

if (!assertCondition(test1.firstName === "John", "Test Case 1 Failed: Incorrect First Name")) test1Passed = false;
if (!assertCondition(test1.lastName === "Doe", "Test Case 1 Failed: Incorrect Last Name")) test1Passed = false;
if (!assertCondition(test1.username === "JohnthegoatDoe", "Test Case 1 Failed: Incorrect Username")) test1Passed = false;
if (!assertCondition(test1.phone === "8192988192", "Test Case 1 Failed: Incorrect Phone Number")) test1Passed = false;
if (!assertCondition(test1.city === "Gatineau", "Test Case 1 Failed: Incorrect City")) test1Passed = false;
if (!assertCondition(test1.email === "doe.john@gmail.com", "Test Case 1 Failed: Incorrect Email")) test1Passed = false;
if (!assertCondition(test1.bank === 100, "Test Case 1 Failed: Incorrect Initial Bank Amount")) test1Passed = false;
if (!assertCondition(test1.betAmount === 0, "Test Case 1 Failed: Incorrect Initial Bet Amount")) test1Passed = false;
if (!assertCondition(test1.guess === "", "Test Case 1 Failed: Incorrect Initial Guess")) test1Passed = false;

if (test1Passed) {
    console.log("Test Case 1 Passed! User() object is created correctly");
} else {
    allTestsPassed = false;
}

// Test Case 2: Checks if Dice() object works correctly
let test2 = new Dice();
let test2Passed = true;

if (!assertCondition(test2.dice1 >= 1 && test2.dice1 <= 6, "Test Case 2 Failed: Dice number 1 is out of range")) test2Passed = false;
if (!assertCondition(test2.dice2 >= 1 && test2.dice2 <= 6, "Test Case 2 Failed: Dice number 2 is out of range")) test2Passed = false;

test2.roll();

if (!assertCondition(test2.dice1 >= 1 && test2.dice1 <= 6, "Test Case 2 Failed: Dice Number 1 After The Roll Is Out Of Range")) test2Passed = false;
if (!assertCondition(test2.dice2 >= 1 && test2.dice2 <= 6, "Test Case 2 Failed: Dice Number 2 After The Roll Is Out Of Range")) test2Passed = false;

if (test2Passed) {
    console.log("Test Case 2 Passed! Dice() object works correctly and rolls between 1 and 6");
} else {
    allTestsPassed = false;
}

// Test Case 3: Checks if Game() object is created correctly
let test3User = new User("Jane", "Doe", "JanethequeenDoe", "6132988192", "Aylmer", "doe.jane@gmail.com");
let test3 = new Game(test3User);

let test3Passed = true;

if (!assertCondition(test3.user === test3User, "Test Case 3 Failed: Game should be linked to the correct user")) test3Passed = false;
if (!assertCondition(test3.dice instanceof Dice, "Test Case 3 Failed: Dice should be an instance of Dice")) test3Passed = false;

if (test3Passed) {
    console.log("Test Case 3 Passed! Game() object is created correctly");
} else {
    allTestsPassed = false;
}

// Test Case 4: Checks if User can place a bet
let test4Passed = true;

test1.betAmount = 25;
if (!assertCondition(test1.canBet() === true, "Test Case 4 Failed: User should be allowed to bet")) test4Passed = false;

test1.betAmount = 200;
if (!assertCondition(test1.canBet() === false, "Test Case 4 Failed: User should not be allowed to bet an amount over their balance")) test4Passed = false;

if (test4Passed) {
    console.log("Test Case 4 Passed! User can place a bet");
} else {
    allTestsPassed = false;
}

// Test Case 5: Check the sum of both dice after rolling
let test5Passed = true;

let game1 = new Game(test1);
let sum = game1.rollDice();
if (!assertCondition(sum >= 2 && sum <= 12, "Test Case 5 Failed: Incorrect range for sum of dice")) test5Passed = false;

if (test5Passed) {
    console.log("Test Case 5 Passed! The sum of both dice after rolling is in range");
} else {
    allTestsPassed = false;
}

// Test Case 6: Check winning condition when user guesses Exactly 7
let test6Passed = true;

test3User.bank = 100;
test3User.betAmount = 50;
test3User.guess = "Exactly 7";
test3.dice.dice1 = 3;
test3.dice.dice2 = 4;
test3.round();

if (!assertCondition(test3User.bank === 300, "Test Case 6 Failed: Expected bank to be 300")) test6Passed = false;

if (test6Passed) {
    console.log("Test Case 6 Passed! Correct winning condition when user guesses Exactly 7");
} else {
    allTestsPassed = false;
}

// Test Case 7: Check winning condition when user guesses Under 7
let test7Passed = true;

test3User.bank = 100;
test3User.betAmount = 50;
test3User.guess = "Under 7";
test3.dice.dice1 = 3;
test3.dice.dice2 = 3;
test3.round();

if (!assertCondition(test3User.bank === 175, "Test Case 7 Failed: Expected bank to be 175")) test7Passed = false;

if (test7Passed) {
    console.log("Test Case 7 Passed! Correct winning condition when user guesses Under 7");
} else {
    allTestsPassed = false;
}

// Test Case 8: Check winning condition when user guesses Over 7
let test8Passed = true;

test3User.bank = 100;
test3User.betAmount = 50;
test3User.guess = "Over 7";
test3.dice.dice1 = 4;
test3.dice.dice2 = 4;
test3.round();

if (!assertCondition(test3User.bank === 175, "Test Case 8 Failed: Expected bank to be 175")) test8Passed = false;

if (test8Passed) {
    console.log("Test Case 8 Passed! Correct winning condition when user guesses Over 7");
} else {
    allTestsPassed = false;
}

// Test Case 9: Checks game win condition
let test9Passed = true;

test3User.bank = 300;
if (!assertCondition(test3.isGameOver() === "Win", "Test Case 9 Failed: Expected outcome is Win")) test9Passed = false;

if (test9Passed) {
    console.log("Test Case 9 Passed! User reaches Win condition when reaching goal");
} else {
    allTestsPassed = false;
}

// Test Case 10: Checks game loss condition
let test10Passed = true;

test3User.bank = 0;
if (!assertCondition(test3.isGameOver() === "Loss", "Test Case 10 Failed: Expected outcome is Loss")) test10Passed = false;

if (test10Passed) {
    console.log("Test Case 10 Passed! User reaches Loss condition when out of money");
} else {
    allTestsPassed = false;
}

// Test Case 11: Checks game no condition (ongoing game)
let test11Passed = true;

test3User.bank = 100;
if (!assertCondition(test3.isGameOver() === "No", "Test Case 11 Failed: Expected outcome is No")) test11Passed = false;

if (test11Passed) {
    console.log("Test Case 11 Passed! User reaches No condition when they still have money");
} else {
    allTestsPassed = false;
}

// Test Case 12: Checks if balance goes into the negatives
let test12Passed = true;

test3User.bank = 10;
test3User.betAmount = 25;
if (!assertCondition(test3User.canBet() === false, "Test Case 12 Failed: Balance went into the negatives")) test12Passed = false;

if (test12Passed) {
    console.log("Test Case 12 Passed! User cannot bet when balance reaches negative");
} else {
    allTestsPassed = false;
}

// Test Case 13: Checks if game stops when goal is met
let test13Passed = true;

test3User.bank = 300 - 20; // Win condition minus 20
test3User.betAmount = 20;
test3User.guess = "Over 7";
test3.dice.dice1 = 4;
test3.dice.dice2 = 6;
test3.round(); // Balance now 310, which is over the win condition

if (!assertCondition(test3.isGameOver() === "Win", "Test Case 13 Failed: Expected outcome is Win")) test13Passed = false;

if (test13Passed) {
    console.log("Test Case 13 Passed! Game stops when user meets goal");
} else {
    allTestsPassed = false;
}

// Test Case 14: Checks if game stops when reaching zero dollars
let test14Passed = true;

test3User.bank = 20;
test3User.betAmount = 20;
test3User.guess = "Over 7";
test3.dice.dice1 = 4;
test3.dice.dice2 = 2;
test3.round();

if (!assertCondition(test3.isGameOver() === "Loss", "Test Case 14 Failed: Expected outcome is Loss")) test14Passed = false;

if (test14Passed) {
    console.log("Test Case 14 Passed! Game stops when user reaches zero dollars");
} else {
    allTestsPassed = false;
}

// Test Case 15: Checks if balance updates after multiple wins
let test15Passed = true;

test3User.bank = 100;
test3User.betAmount = 50;
test3User.guess = "Over 7";
test3.dice.dice1 = 4;
test3.dice.dice2 = 4;
test3.round(); // First game, bank now 175
test3.round(); // Second game, bank now 250

if (!assertCondition(test3User.bank === 250, "Test Case 15 Failed: Expected bank to be 250")) test15Passed = false;

if (test15Passed) {
    console.log("Test Case 15 Passed! Bank updates correctly after multiple wins");
} else {
    allTestsPassed = false;
}

// Test Case 16: Checks if balance updates after multiple losses
let test16Passed = true;

test3User.bank = 100;
test3User.betAmount = 20;
test3User.guess = "Over 7";
test3.dice.dice1 = 4;
test3.dice.dice2 = 2;
test3.round(); // First game, bank now 80
test3.round(); // Second game, bank now 60

if (!assertCondition(test3User.bank === 60, "Test Case 16 Failed: Expected bank to be 60")) test16Passed = false;

if (test16Passed) {
    console.log("Test Case 16 Passed! Bank updates correctly after multiple losses");
} else {
    allTestsPassed = false;
}

if (allTestsPassed) {
    console.log("All test cases passed successfully!");
} else {
    console.log("Some test cases failed.");
}
