## Exchange Rate

Select countries to get the exchange rate for a specific amount

## Project Specifications

- Display UI with 2 select lists for countries and 2 inputs for amounts
- Fetch exchange rates from API (https://api.exchangerate-api.com)
- Display the values for both countries
- Update values on amount change
- Swap country rates

## Changes:
- Refactor CSS to BEM style
- Minor HTML/CSS tweaks (header navigation to return to main page, footer link to API, tweaked some colors, etc.)
- Created function to display full name of selected currencies
- Added all 161 supported currencies
- Currencies are populated dynamically (rather than being statically coded into DOM)
- Selected currency is added by JS (rather than coded into DOM)

## Possible future improvements:
- Refactor various functions to shorter version
