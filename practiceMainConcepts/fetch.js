const myHeaders = new Headers();
myHeaders.append("apikey", "f463d8dd3c1494aae0aeca639bb18eee");

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
}

try {
    const result = await fetch("https://api.apilayer.com/exchangerates_data/latest?base=USD", requestOptions)
    const resultObj = await result.json();
    console.log(JSON.stringify(resultObj, null, 2))
} catch(err) {
    console.error(`Could not fetch currency data`)
    throw err;
}