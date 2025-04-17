let $$ = sel => document.querySelector(sel);

let myForm = $$("#form");
let firstName = $$("#firstName");
let lastName = $$("#lastName");
let username = $$("#userName");
let phone = $$("#phoneNumber");
let mail = $$("#email");
let city = $$("#city");
let bank = $$("#money");

let firstNameError = $$("#firstNameError")
let lastNameError = $$("#lastNameError")
let userNameError = $$("#userNameError")
let phoneError = $$("#phoneNumberError")
let emailError = $$("#emailNameError")
let cityError = $$("#cityError")
let bankError = $$("#moneyError")

let firstNameRegex = /^[A-Za-z][A-Za-z~\s'-]{0,33}[A-Za-z~'-]$/
let lastNameRegex = /^[A-Za-z][A-Za-z~\s'-]{0,43}[A-Za-z~'-]$/
let userNameRegex = /^\d[A-Z]{3}[a-z][$&*@!]$/
let phoneRegex = /^[0-9]{3}\.[0-9]{3}\.[0-9]{4}$/
let emailRegex = /^[A-Za-z0-9.-]+@[A-Za-z0-9-]+\.(com|ca)$/
let cityRegex = /^[A-Za-z]{1,50}$/

firstName.addEventListener("change", firstNameValidate);
lastName.addEventListener("change", lastNameValidate);
username.addEventListener("change", usernameValidate);
phone.addEventListener("change", phoneValidate);
mail.addEventListener("change", emailValidate);
city.addEventListener("change", cityValidate);
bank.addEventListener("change", bankValidate);
myForm.addEventListener("submit", testForm)

function firstNameValidate(){
    let fName = firstName.value.trim();
    if (fName !== "" && firstNameRegex.test(fName)){
        firstNameError.style.display = "none"
        return true
    } else{
        firstNameError.style.display = "block"
        return false
    }
}

function lastNameValidate(){
    let lName = lastName.value.trim();
    if (lName !== "" && lastNameRegex.test(lName)){
        lastNameError.style.display = "none"
        return true
    } else{
        lastNameError.style.display = "block"
        return false
    }
}

function usernameValidate() {
    let uname = username.value.trim();
    if (uname !== "" && userNameRegex.test(uname)) {
        userNameError.style.display = "none";
        return true;
    } else {
        userNameError.style.display = "block";
        return false;
    }
}

function phoneValidate() {
    let phoneValue = phone.value.trim();
    if (phoneValue !== "" && phoneRegex.test(phoneValue)) {
        phoneError.style.display = "none";
        return true;
    } else {
        phoneError.style.display = "block";
        return false;
    }
}

function emailValidate() {
    let email = mail.value.trim();
    if (email !== "" && emailRegex.test(email)) {
        emailError.style.display = "none";
        return true;
    } else {
        emailError.style.display = "block";
        return false;
    }
}

function cityValidate() {
    let cityName = city.value.trim();
    if (cityName !== "" && cityRegex.test(cityName)) {
        cityError.style.display = "none";
        return true;
    } else {
        cityError.style.display = "block";
        return false;
    }
}

function bankValidate() {
    let amount = parseInt(bank.value.trim());
    if (!isNaN(amount) && amount >= 5 && amount <= 5000 && amount % 2 === 0) {
        bankError.style.display = "none";
        return true;
    } else {
        bankError.style.display = "block";
        return false;
    }
}

function validateForm(){
    let isValid = true
    if (!firstNameValidate()) isValid = false
    if (!lastNameValidate()) isValid = false
    if (!usernameValidate()) isValid = false
    if (!phoneValidate()) isValid = false
    if (!emailValidate()) isValid = false
    if (!cityValidate()) isValid = false
    if (!bankValidate()) isValid = false
    return isValid
}

function testForm(e) {
    e.preventDefault(); 

    if (validateForm()) {
        localStorage.setItem("firstName", firstName.value.trim());
        localStorage.setItem("lastName", lastName.value.trim());
        localStorage.setItem("username", username.value.trim());
        localStorage.setItem("phone", phone.value.trim());
        localStorage.setItem("email", mail.value.trim());
        localStorage.setItem("city", city.value.trim());
        localStorage.setItem("bank", bank.value.trim());

        window.location.href = "game.html";
    }
}
