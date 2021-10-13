// grab elements X
// password display X
// form X
// include checkboxes X
// range and number input X

// connect the range to number input to each other X
// create a function to generate the password X
// it should take length of the password X
// it should take include uppercase X
// it should take include number X
// it should take incule special characters X
// create a function to get character codes and store them in an array X
// get the uppercase, lowercase, numbers,and special characters using the above function X
// Create copy to clipboard functionality
// grab clipboard element


const passwordDisplay = document.querySelector('[data-password-display]');
const form = document.querySelector('[data-form]');
const includeUppercase = document.querySelector('[data-uppercase-chars]');
const includeNumbers = document.querySelector('[data-number-chars]');
const includeSpecialChars = document.querySelector('[data-special-chars]');

const numberOfCharacters = document.querySelector('[data-length-number]');
const rangeOfCharacters = document.querySelector('[data-length-range]');


numberOfCharacters.addEventListener('input', syncLength);
rangeOfCharacters.addEventListener('input', syncLength);

// Characters (based on ASCII codes)
const UPPERCASE_CHARACTERS = getCharacters(65, 90);
const LOWERCASE_CHARACTERS = getCharacters(97, 122);
const NUMBER_CHARACTERS = getCharacters(48, 57);
const SPECIAL_CHARACTERS = getCharacters(33, 47)
    .concat(getCharacters(58, 64))
    .concat(getCharacters(91, 95))
    .concat(getCharacters(123, 126));



// sync range slider with number input
function syncLength(e) {
    let length = e.target.value;
    numberOfCharacters.value = length;
    rangeOfCharacters.value = length;

}


form.addEventListener('submit', e => {
    e.preventDefault()

    let length = numberOfCharacters.value;
    let uppercaseChars = includeUppercase.checked;
    let numberChars = includeNumbers.checked;
    let specialChars = includeSpecialChars.checked;

    let password = generatePassword(length, uppercaseChars, numberChars, specialChars);
    passwordDisplay.value = password;
})

function generatePassword(length, uppercase, number, special) {
    let charCodes = LOWERCASE_CHARACTERS;

    if (uppercase) charCodes = charCodes.concat(UPPERCASE_CHARACTERS)
    if (number) charCodes = charCodes.concat(NUMBER_CHARACTERS)
    if (special) charCodes = charCodes.concat(SPECIAL_CHARACTERS)


    let passwordCharacters = [];

    for (let i = 0; i < length; i++) {
        let charCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(charCode));
    }
    return passwordCharacters.join('')
}

function getCharacters(from, to) {
    let array = [];
    for (let i = from; i <= to; i++) {
        if (i === 34 || i === 39) {
            continue;
        } else {

            array.push(i)
        }
    }
    return array;
}


const clipboard = document.querySelector('[data-clipboard]')


clipboard.addEventListener('click', e => {
    let copyPassoword = passwordDisplay.value;

    navigator.clipboard.writeText(copyPassoword)
})