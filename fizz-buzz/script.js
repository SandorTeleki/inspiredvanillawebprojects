const input = document.getElementById('input');
const submitButton = document.getElementById('submit');
const fizz = document.getElementById('fizz');
const buzz = document.getElementById('buzz');
const finalMessage = document.getElementById('final-message');

function fizzBuzz(){
    const num = +input.value;
    if (num === 0){
        alert("Your just tried to commit a cardinal sin! Don't try to divide zero!");
    } else if(num % 3 === 0 && num % 5 === 0){
        console.log('FizzBuzz')
        fizz.classList.add('spin');
        buzz.classList.add('spin');
        finalMessage.innerText = `Your number: ${num} is Fizz-Buzzing!`;
    } else if (num % 3 === 0){
        console.log('Fizz');
        fizz.classList.add('spin');
        buzz.classList.remove('spin');
        finalMessage.innerText = `Your number: ${num} is only Fizzing`;
    } else if (num % 5 === 0){
        console.log('Buzz');
        fizz.classList.remove('spin');
        buzz.classList.add('spin');
        finalMessage.innerText = `Your number: ${num} is only Buzzing`;
    } else {
        console.log(`${num} is neither Fizzing nor Buzzing`);
        fizz.classList.remove('spin');
        buzz.classList.remove('spin');
        finalMessage.innerText = `Your number: ${num} is neither Fizzing nor Buzzing :(`;
    }
}

submitButton.addEventListener('click', fizzBuzz);
input.addEventListener('change', fizzBuzz);
