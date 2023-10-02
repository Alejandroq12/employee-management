let access_key = "f463d8dd3c1494aae0aeca639bb18eee";

// Currency data ----------------------------------------
export const getCurrencyConversionData = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const response = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${access_key}&base=EUR`, requestOptions)
    if(!response.ok) {
      throw new Error("Cannot fetch currency data");
    }
    return await response.json();
  }
  
  export const getSalary = (amountEUR, currency, currencyData) => {
    const amount = (currency === "EUR") ? amountEUR : amountEUR * currencyData.rates[currency];
    const formatter = Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency
    });
    return formatter.format(amount);
  }