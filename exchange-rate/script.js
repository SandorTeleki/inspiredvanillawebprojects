const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');
const currencyDescription_one = document.getElementById('firstcurrency');
const currencyDescription_two = document.getElementById('secondcurrency');


const currencyNames = {
  "AED": "United Arab Emirates dirham",
  "ARS": "Argentine Peso",
  "AUD": "Australian dollar",
  "BGN": "Bulgarian lev",
  "BRL": "Brazilian real",
  "BSD": "Bahamian dollar",
  "CAD": "Canadian dollar",
  "CHF": "Swiss franc",
  "CLP": "Chilean peso",
  "CNY": "Renminbi",
  "COP": "Colombian peso",
  "CZK": "Czech koruna",
  "DKK": "Danish krone",
  "DOP": "Dominican peso",
  "EGP": "Egyptian pound",
  "EUR": "Euro",
  "FJD": "Fiji dollar",
  "GBP": "Pound sterling",
  "GTQ": "Gutemalan quetzal",
  "HKD": "Hong Kong dollar",
  "HRK": "Croatian kuna",
  "HUF": "Hungarian forint",
  "IDR": "Indonesian rupiah",
  "ILS": "Israeli new shekel",
  "INR": "Indian rupee",
  "ISK": "Icelandic krona",
  "JPY": "Japenese yen",
  "KRW": "South Korean won",
  "KZT": "Kazakhstani tenge",
  "MXN": "Mexican peso",
  "MYR": "Malaysian ringgit",
  "NOK": "Norwegian krone",
  "NZD": "New Zealand dollar",
  "PAB": "Panamanian balboa",
  "PEN": "Peruvian sol",
  "PHP": "Philippine peso",
  "PKR": "Pakistani rupee",
  "PLN": "Polish zloty",
  "PYG": "Paraguayan guarani",
  "RON": "Romanian leu",
  "RUB": "Russian ruble",
  "SAR": "Saudi riyal",
  "SEK": "Swedish krona",
  "SGD": "Singapore dollar",
  "THB": "Thai baht",
  "TRY": "Turkish lira",
  "TWD": "New Taiwan dollar",
  "UAH": "Ukrainian hryvnia",
  "USD": "United States dollar",
  "UYU": "Uruguayan peso",
  "VND": "Vietnamese dong",
  "ZAR": "South African rand",
}

// Sets full currency name for first currency
function getCurrencyDescriptionOne(currency){
  if (currency in currencyNames){
    currency = currencyNames[currency];
  }
  currencyDescription_one.innerText = currency;
}

// Sets full currency name for second currency
function getCurrencyDescriptionTwo(currency){
  if (currency in currencyNames){
    currency = currencyNames[currency];
  }
  currencyDescription_two.innerText = currency;
}

// Calculates exchange rate using API
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  fetch("https://open.exchangerate-api.com/v6/latest")
    .then(res => res.json())
    .then(data => {
      //console.log(data); 
      const rate = data.rates[currency_two] / data.rates[currency_one];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * (rate)).toFixed(2);

      getCurrencyDescriptionOne(currency_one);
      getCurrencyDescriptionTwo(currency_two);

      // const transformAmountOne = +amountEl_one.value;
      // const transformAmountTwo = +amountEl_two.value;
      // function modifyData(){
      //   document.getElementById('amount-one').value = formatMoney(transformAmountOne);
      //   document.getElementById('amount-two').value = formatMoney(transformAmountTwo);
      // }
      // modifyData();
      // console.log(transformAmountOne);
      // console.log(transformAmountTwo)

      // WIP to get proper money formatting working
      //amountEl_two.innerHTML = `${formatMoney(+amountEl_two.value)}`
      //amountEl_two.innerText = formatMoney(+amountEl_two.value);
      //formatMoney(+amountEl_two.value);
      //console.log(formatMoney(+amountEl_one.value));
      //amountEl_one.value.setAttribute(value, formatMoney(+amountEl_one.value));
      //innertext not working as exptected

      // Partially working
      //console.log(amountEl_one);
      //console.log(amountEl_one.value); //works
      //console.log(formatMoney(+amountEl_one.value)); //works as expected, just need to change input stuff
      //console.log(formatMoney(+amountEl_two.value)); //works as expected, just need to change input stuff

    });
}


// Event Listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

// Swaps location of currencies
swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

// Formats large monetary amounts
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

calculate();
