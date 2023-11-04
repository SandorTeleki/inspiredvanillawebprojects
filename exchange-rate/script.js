const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');
const currencyDescription_one = document.getElementById('firstcurrency');
const currencyDescription_two = document.getElementById('secondcurrency');


// const currencyNames = {
//   "AED": "United Arab Emirates dirham",
//   "ARS": "Argentine Peso",
//   "AUD": "Australian dollar",
//   "BGN": "Bulgarian lev",
//   "BRL": "Brazilian real",
//   "BSD": "Bahamian dollar",
//   "CAD": "Canadian dollar",
//   "CHF": "Swiss franc",
//   "CLP": "Chilean peso",
//   "CNY": "Renminbi",
//   "COP": "Colombian peso",
//   "CZK": "Czech koruna",
//   "DKK": "Danish krone",
//   "DOP": "Dominican peso",
//   "EGP": "Egyptian pound",
//   "EUR": "Euro",
//   "FJD": "Fiji dollar",
//   "GBP": "Pound sterling",
//   "GTQ": "Gutemalan quetzal",
//   "HKD": "Hong Kong dollar",
//   "HRK": "Croatian kuna",
//   "HUF": "Hungarian forint",
//   "IDR": "Indonesian rupiah",
//   "ILS": "Israeli new shekel",
//   "INR": "Indian rupee",
//   "ISK": "Icelandic krona",
//   "JPY": "Japenese yen",
//   "KRW": "South Korean won",
//   "KZT": "Kazakhstani tenge",
//   "MXN": "Mexican peso",
//   "MYR": "Malaysian ringgit",
//   "NOK": "Norwegian krone",
//   "NZD": "New Zealand dollar",
//   "PAB": "Panamanian balboa",
//   "PEN": "Peruvian sol",
//   "PHP": "Philippine peso",
//   "PKR": "Pakistani rupee",
//   "PLN": "Polish zloty",
//   "PYG": "Paraguayan guarani",
//   "RON": "Romanian leu",
//   "RUB": "Russian ruble",
//   "SAR": "Saudi riyal",
//   "SEK": "Swedish krona",
//   "SGD": "Singapore dollar",
//   "THB": "Thai baht",
//   "TRY": "Turkish lira",
//   "TWD": "New Taiwan dollar",
//   "UAH": "Ukrainian hryvnia",
//   "USD": "United States dollar",
//   "UYU": "Uruguayan peso",
//   "VND": "Vietnamese dong",
//   "ZAR": "South African rand",
// }

// List of all currencies supported by the API
const currencyNames = {
  "AED":	"UAE Dirham",
  "AFN":	"Afghan Afghani",
  "AMD":	"Armenian Dram",
  "ALL":	"Albanian Lek",
  "ANG":	"Netherlands Antillian Guilder",
  "AOA":	"Angolan Kwanza",
  "ARS":	"Argentine Peso",
  "AUD":	"Australian Dollar",
  "AWG":	"Aruban Florin",
  "AZN":	"Azerbaijani Manat",
  "BAM":	"Bosnia and Herzegovina Mark",
  "BBD":	"Barbados Dollar",
  "BDT":	"Bangladeshi Taka",
  "BGN":	"Bulgarian Lev",
  "BHD":	"Bahraini Dinar",
  "BIF":	"Burundian Franc",
  "BMD":	"Bermudian Dollar",
  "BND":	"Brunei Dollar",
  "BOB":	"Bolivian Boliviano",
  "BRL":	"Brazilian Real",
  "BSD":	"Bahamian Dollar",
  "BTN":	"Bhutanese Ngultrum",
  "BWP":	"Botswana Pula",
  "BYN":	"Belarusian Ruble",
  "BZD":	"Belize Dollar",
  "CAD":	"Canadian Dollar",
  "CDF":	"Congolese Franc",
  "CHF":	"Swiss Franc",
  "CLP":	"Chilean Peso",
  "CNY":	"Chinese Renminbi",
  "COP":	"Colombian Peso",
  "CRC":	"Costa Rican Colon",
  "CUP":	"Cuban Peso",
  "CVE":	"Cape Verdean Escudo",
  "CZK":	"Czech Koruna",
  "DJF":	"Djiboutian Franc",
  "DKK":	"Danish Krone",
  "DOP":	"Dominican Peso",
  "DZD":	"Algerian Dinar",
  "EGP":	"Egyptian Pound",
  "ERN":	"Eritrean Nakfa",
  "ETB":	"Ethiopian Birr",
  "EUR":	"Euro",
  "FJD":	"Fiji Dollar",
  "FKP":	"Falkland Islands Pound",
  "FOK":	"Faroese Króna",
  "GBP":	"Pound Sterling",
  "GEL":	"Georgian Lari",
  "GGP":	"Guernsey Pound",
  "GHS":	"Ghanaian Cedi",
  "GIP":	"Gibraltar Pound",
  "GMD":	"Gambian Dalasi",
  "GNF":	"Guinean Franc",
  "GTQ":	"Guatemalan Quetzal",
  "GYD":	"Guyanese Dollar",
  "HKD":	"Hong Kong Dollar",
  "HNL":	"Honduran Lempira",
  "HRK":	"Croatian Kuna",
  "HTG":	"Haitian Gourde",
  "HUF":	"Hungarian Forint",
  "IDR":	"Indonesian Rupiah",
  "ILS":	"Israeli New Shekel",
  "IMP":	"Manx Pound",
  "INR":	"Indian Rupee",
  "IQD":	"Iraqi Dinar",
  "IRR":	"Iranian Rial",
  "ISK":	"Icelandic Króna",
  "JEP":	"Jersey Pound",
  "JMD":	"Jamaican Dollar",
  "JOD":	"Jordanian Dinar",
  "JPY":	"Japanese Yen",
  "KES":	"Kenyan Shilling",
  "KGS":	"Kyrgyzstani Som",
  "KHR":	"Cambodian Riel",
  "KID":	"Kiribati Dollar",
  "KMF":	"Comorian Franc",
  "KRW":	"South Korean Won",
  "KWD":	"Kuwaiti Dinar",
  "KYD":	"Cayman Islands Dollar",
  "KZT":	"Kazakhstani Tenge",
  "LAK":	"Lao Kip",
  "LBP":	"Lebanese Pound",
  "LKR":	"Sri Lanka Rupee",
  "LRD":	"Liberian Dollar",
  "LSL":	"Lesotho Loti",
  "LYD":	"Libyan Dinar",
  "MAD":	"Moroccan Dirham",
  "MDL":	"Moldovan Leu",
  "MGA":	"Malagasy Ariary",
  "MKD":	"Macedonian Denar",
  "MMK":	"Burmese Kyat",
  "MNT":	"Mongolian Tögrög",
  "MOP":	"Macanese Pataca",
  "MRU":	"Mauritanian Ouguiya",
  "MUR":	"Mauritian Rupee",
  "MVR":	"Maldivian Rufiyaa",
  "MWK":	"Malawian Kwacha",
  "MXN":	"Mexican Peso",
  "MYR":	"Malaysian Ringgit",
  "MZN":	"Mozambican Metical",
  "NAD":	"Namibian Dollar",
  "NGN":	"Nigerian Naira",
  "NIO":	"Nicaraguan Córdoba",
  "NOK":	"Norwegian Krone",
  "NPR":	"Nepalese Rupee",
  "NZD":	"New Zealand Dollar",
  "OMR":	"Omani Rial",
  "PAB":	"Panamanian Balboa",
  "PEN":	"Peruvian Sol",
  "PGK":	"Papua New Guinean Kina",
  "PHP":	"Philippine Peso",
  "PKR":	"Pakistani Rupee",
  "PLN":	"Polish Złoty",
  "PYG":	"Paraguayan Guaraní",
  "QAR":	"Qatari Riyal",
  "RON":	"Romanian Leu",
  "RSD":	"Serbian Dinar",
  "RUB":	"Russian Ruble",
  "RWF":	"Rwandan Franc",
  "SAR":	"Saudi Riyal",
  "SBD":	"Solomon Islands Dollar",
  "SCR":	"Seychellois Rupee",
  "SDG":	"Sudanese Pound",
  "SEK":	"Swedish Krona",
  "SGD":	"Singapore Dollar",
  "SHP":	"Saint Helena Pound",
  "SLE":	"Sierra Leonean Leone",
  "SOS":	"Somali Shilling",
  "SRD":	"Surinamese Dollar",
  "SSP":	"South Sudanese Pound",
  "STN":	"São Tomé and Príncipe Dobra",
  "SYP":	"Syrian Pound",
  "SZL":	"Eswatini Lilangeni",
  "THB":	"Thai Baht",
  "TJS":	"Tajikistani Somoni",
  "TMT":	"Turkmenistan Manat",
  "TND":	"Tunisian Dinar",
  "TOP":	"Tongan Paʻanga",
  "TRY":	"Turkish Lira",
  "TTD":	"Trinidad and Tobago Dollar",
  "TVD":	"Tuvaluan Dollar",
  "TWD":	"New Taiwan Dollar",
  "TZS":	"Tanzanian Shilling",
  "UAH":	"Ukrainian Hryvnia",
  "UGX":	"Ugandan Shilling",
  "USD":	"United States Dollar",
  "UYU":	"Uruguayan Peso",
  "UZS":	"Uzbekistani So'm",
  "VES":	"Venezuelan Bolívar Soberano",
  "VND":	"Vietnamese Đồng",
  "VUV":	"Vanuatu Vatu",
  "WST":	"Samoan Tālā",
  "XAF":	"Central African CFA Franc",
  "XCD":	"East Caribbean Dollar",
  "XDR":	"Special Drawing Rights",
  "XOF":	"West African CFA franc",
  "XPF":	"CFP Franc",
  "YER":	"Yemeni Rial",
  "ZAR":	"South African Rand",
  "ZMW":	"Zambian Kwacha",
  "ZWL":	"Zimbabwean Dollar",
}

// Dynamically add all currencies to the DOM for first currency
for (const [key] of Object.entries(currencyNames)){
  const currencyOption = document.createElement('option');
  currencyOption.innerHTML = `
   <option value="${key}">${key}</option>
  `;
  currencyEl_one.appendChild(currencyOption);
}

// Dynamically add all currencies to the DOM for second currency
for (const [key] of Object.entries(currencyNames)){
  const currencyOption = document.createElement('option');
  currencyOption.innerHTML = `
   <option value="${key}">${key}</option>
  `;
  currencyEl_two.appendChild(currencyOption);
}

// Set default for both currencies and update currency names
window.onload = function () {
  const selectOne = document.querySelector('#currency-one');
  selectOne.value = "EUR";
  getCurrencyDescriptionOne("EUR");
  const  selectTwo = document.querySelector('#currency-two');
  selectTwo.value = "USD";
  getCurrencyDescriptionTwo("USD");
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
      // console.log(data); 
      const rate = data.rates[currency_two] / data.rates[currency_one];
      rateEl.innerText = `1 ${currency_one} = ${Number(rate.toPrecision(3))} ${currency_two}`;
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
      //innertext will not work, since there is no place to add an innertext to, need to use value
      // https://stackoverflow.com/questions/20604299/what-is-innerhtml-on-input-elements

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
