
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://api.exchangeratesapi.io/v1/latest?access_key=f463d8dd3c1494aae0aeca639bb18eee", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));