const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const usernamediv = document.getElementById('usernamediv');
const emaildiv = document.getElementById('emaildiv');
const passworddiv = document.getElementById('passworddiv');
const password2div = document.getElementById('password2div');




// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const span = formControl.querySelector('span');
  span.innerText = message;
}

// Show success outline
// function showSuccess(input) {
//   const formControl = input.parentElement;
//   formControl.className = 'form-control success';
// }

//New success outline - Bad test #1
// function showSuccess(input) {
//   const formControl = document.getElementById("username_input");
//   formControl.className = 'form-control__input form-control__input_success';
// }

//New success outline - Bad test #2
// function showSuccess(input) {
//   const formControl = input.currentTarget;
//   console.log(input.currentTarget);
//   formControl.className = 'form-control__input form-control__input_success';
// }

// Show success outline - Bad Test #3
// function showSuccess(input) {
//   const formControl = input.getElementByTagName(span);
//   formControl.className = 'form-control__input form-control__input_success';
// }

// Show success outline - Test #4
function showSuccess(input) {
  const formControl = input.parentElement;
  console.log(`First child element: ` + formControl.firstElementChild);
  console.log(`Amount of children: `+formControl.childElementCount);
  console.log(`Selecting all the children: `+ formControl.children);
  console.log(formControl.children[1]); // does return the second child, use this to add needed class
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();

  if(checkRequired([username, email, password, password2])){
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
  }
});