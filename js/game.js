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
  user = new User(
    localStorage.getItem("firstName"),
    localStorage.getItem("lastName"),
    localStorage.getItem("username"),
    localStorage.getItem("phoneNumber"),
    localStorage.getItem("city"),
    localStorage.getItem("email"),
    parseInt(localStorage.getItem("bank"))
  );

  nameBox.textContent = `${user.firstName} ${user.lastName}`;
  usernameBox.textContent = `${user.username}`;
  phoneBox.textContent = `${user.phoneNumber}`;
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
function toggleProfileDropdown() {
  const isVisible = dropdown.style.display === "block";
  dropdown.style.display = isVisible ? "none" : "block";
}

function logOut() {
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("username");
  localStorage.removeItem("phoneNumber");
  localStorage.removeItem("city");
  localStorage.removeItem("email");
  localStorage.removeItem("bank");
  window.location.href = "intro.html";
}

function startGame() {
  let game = new Game(user);
  if (betField.value.trim() !== "" && userGuess.value !== "") {
    betError.style.display = "none";
    betField.classList.remove("is-invalid")
    userGuess.classList.remove("is-invalid")
    user.betAmount = betField.value;
    if (!user.canBet()) {
      betError.style.display = "block";
      betField.classList.add("is-invalid");
      return;
    } else {
      betError.style.display = "none";
    }
    results.style.display = "block";
    user.guess =
      userGuess.value === "exact"
        ? "Exactly 7"
        : userGuess.value === "over"
        ? "Over 7"
        : userGuess.value === "under"
        ? "Under 7"
        : "";

    const roundResult = game.round();
    diceDiv.style.display = "block";
    const diceImages = {
      1: "../images/dice-six-faces-one.png",
      2: "../images/dice-six-faces-two.png",
      3: "../images/dice-six-faces-three.png",
      4: "../images/dice-six-faces-four.png",
      5: "../images/dice-six-faces-five.png",
      6: "../images/dice-six-faces-six.png",
    };

    dice1IMG.src = diceImages[game.dice.dice1];
    dice2IMG.src = diceImages[game.dice.dice2];

    bankBalance.textContent = user.bank;
    bankBox.textContent = user.bank;
    localStorage.setItem("bank", user.bank);

    diceResult.textContent = `You rolled: ${game.dice.dice1} + ${
      game.dice.dice2
    } = ${game.dice.dice1 + game.dice.dice2}`;

    const gameState = game.isGameOver();
    if (roundResult > 0) {
      profitResult.textContent = `You won ${roundResult}$`;
      lossResult.textContent = "";
    } else {
      lossResult.textContent = `You lost ${-roundResult}$.`;
      profitResult.textContent = "";
    }
  } else{
    betError.style.display = "block";
    betField.classList.add("is-invalid");
    userGuess.classList.add("is-invalid");
  }
}
function stopGame(){
  results.style.display = "none";
  betField.value = ""
  userGuess.value = "";
}
