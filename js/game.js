class User {
  constructor(firstName, lastName, username, phone, city, email, bank) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.phone = phone;
    this.city = city;
    this.email = email;
    this.bank = bank;
    this.betAmount = 0;
    this.guess = "";
  }
  getFullName() {
    return `${this.firstName} +${this.lastName}`;
  }
  getBetAmount() {
    return "$" + this.betAmount.toFixed(2);
  }
  getBank() {
    return "$" + this.bank.toFixed(2);
  }
  canBet() {
    return this.betAmount <= this.bank;
  }
}
class Dice {
  constructor() {
    this.dice1 = Math.floor(Math.random() * 6) + 1;
    this.dice2 = Math.floor(Math.random() * 6) + 1;
  }
  roll() {
    this.dice1 = Math.floor(Math.random() * 6) + 1;
    this.dice2 = Math.floor(Math.random() * 6) + 1;
  }
}
class Game {
  constructor(usr) {
    this.balance = 100;
    this.dice = new Dice();
    this.user = usr;
  }

  round() {
    this.dice.roll();
    let total = this.dice.dice1 + this.dice.dice2;
    if (this.user.guess === "Exactly 7" && total === 7) {
      return this.addSum(4);
    } else if (this.user.guess === "Over 7" && total > 7) {
      return this.addSum(1.5);
    } else if (this.user.guess === "Under 7" && total < 7) {
      return this.addSum(1.5);
    } else {
      this.user.bank -= this.user.betAmount;
      return -this.user.betAmount;
    }
  }
  isGameOver() {
    if (this.user.bank >= 300) {
      return "Win";
    } else if (this.user.bank === 0) {
      return "Loss";
    }
    return "No";
  }

  addSum(time) {
    let win = time * this.user.betAmount;
    this.user.bank += win;
    return win;
  }
}

let $$ = (sel) => document.querySelector(sel);

//Add ons
let pfp = $$("#pfp");
let dropdown = $$("#profileDropdown");
let value = $$(".value");

//Boxes for user info
let nameBox = $$("#profileName");
let usernameBox = $$("#profileUsername");
let phoneBox = $$("#profilePhone");
let cityBox = $$("#profileCity");
let emailBox = $$("#profileEmail");
let bankBox = $$("#profileBank");
let welcomeBox = $$("#welcomeBox");
let bankBalance = $$("#bankBalance");

//Buttons
let logButton = $$("#logOutButton");
let rollButton = $$("#rollButton");
let againButton = $$("#againButton")
let stopButton = $$("#stopButton")

//Fields for user input
let betField = $$("#bet");
let userGuess = $$("#betType");

//Error Fields
let betError = $$("#betError");
let betErrorEmpty = $$("#betErrorEmpty")

//Game output
let diceResult = $$("#diceOutput");
let profitResult = $$("#profitOutput");
let lossResult = $$("#lossOutput");

//Dices
let dice1IMG = $$("#Dice1");
let dice2IMG = $$("#Dice2");

//Divs
let results = $$("#resultsDiv");

let user;
window.addEventListener("DOMContentLoaded", () => {
  //Gets all items from local storage
  user = new User(
    localStorage.getItem("firstName"),
    localStorage.getItem("lastName"),
    localStorage.getItem("username"),
    localStorage.getItem("phone"),
    localStorage.getItem("city"),
    localStorage.getItem("email"),
    parseInt(localStorage.getItem("bank"))
  );

  //Checks if local storage is Nan, if yes, send the user back to form
  if (
    !user.firstName ||
    !user.lastName ||
    !user.username ||
    !user.phone ||
    !user.city ||
    !user.email ||
    isNaN(user.bank)
  ) {
    logOut();
    return;
  }
  //Shows all local storage on page
  nameBox.textContent = `${user.firstName} ${user.lastName}`;
  usernameBox.textContent = `${user.username}`;
  phoneBox.textContent = `${user.phone}`;
  cityBox.textContent = `${user.city}`;
  emailBox.textContent = `${user.email}`;
  bankBox.textContent = `${user.bank}`;
  welcomeBox.textContent = `${user.firstName}`;
  bankBalance.textContent = `${user.bank}`;
});

//Event listeners
logButton.addEventListener("click", logOut);
pfp.addEventListener("click", toggleProfileDropdown);
rollButton.addEventListener("click", startGame);
againButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);

//Functions
// Toggles visibility of the profile dropdown menu
function toggleProfileDropdown() {
  const isVisible = dropdown.style.display === "block";
  dropdown.style.display = isVisible ? "none" : "block";
}

// Logs the user out and redirects to login page
function logOut() {
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("username");
  localStorage.removeItem("phone");
  localStorage.removeItem("city");
  localStorage.removeItem("email");
  localStorage.removeItem("bank");
  window.location.href = "index.html";
}

// Starts a game round if inputs are valid, rolls dice, and updates results
function startGame() {
  let game = new Game(user);
  // Input validation check: ensure bet and guess fields are not empty
  if (betField.value.trim() !== "" && userGuess.value !== "") {
    // Clear previous error messages and invalid styles
    betError.style.display = "none";
    betErrorEmpty.style.display = "none";
    betField.classList.remove("is-invalid");
    userGuess.classList.remove("is-invalid");
    // Bet amount assignment and validation
    user.betAmount = betField.value;
    if (!user.canBet()) {
      // Error handling for invalid bet: bet exceeds bank amount
      betError.style.display = "block";
      betField.classList.add("is-invalid");
      return;
    } else {
      betError.style.display = "none";
    }
    // Game setup: display results section and set user guess
    results.style.display = "block";
    user.guess =
      userGuess.value === "exact"
        ? "Exactly 7"
        : userGuess.value === "over"
        ? "Over 7"
        : userGuess.value === "under"
        ? "Under 7"
        : "";

    // Game setup and dice rolling
    const roundResult = game.round();
    diceDiv.style.display = "block";
    const diceImages = {
      1: "./images/dice-six-faces-one.png",
      2: "./images/dice-six-faces-two.png",
      3: "./images/dice-six-faces-three.png",
      4: "./images/dice-six-faces-four.png",
      5: "./images/dice-six-faces-five.png",
      6: "./images/dice-six-faces-six.png",
    };

    // UI updates: update dice images, bank balance, and result text
    dice1IMG.src = diceImages[game.dice.dice1];
    dice2IMG.src = diceImages[game.dice.dice2];

    bankBalance.textContent = user.bank;
    bankBox.textContent = user.bank;
    localStorage.setItem("bank", user.bank);

    diceResult.textContent = `You rolled: ${game.dice.dice1} + ${game.dice.dice2} = ${game.dice.dice1 + game.dice.dice2}`;

    const gameState = game.isGameOver();
    if (roundResult > 0) {
      profitResult.textContent = `You won ${roundResult}$`;
      lossResult.textContent = "";
    } else {
      lossResult.textContent = `You lost ${-roundResult}$.`;
      profitResult.textContent = "";
    }
  } else {
    // Error handling for empty or invalid input: show error message and mark fields as invalid
    betErrorEmpty.style.display = "block";
    betField.classList.add("is-invalid");
    userGuess.classList.add("is-invalid");
  }
}
// Resets the game UI and clears input fields
function stopGame(){
  // Hiding result section
  results.style.display = "none";
  // Resetting errors and input fields
  betErrorEmpty.style.display = "none";
  betError.style.display = "none";
  betField.value = "";
  userGuess.value = "";
  betField.classList.remove("is-invalid");
  userGuess.classList.remove("is-invalid");
}
