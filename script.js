const form = document.querySelector('form')
  
form.addEventListener('submit', function(event) {
  event.preventDefault();

  var clientId = document.querySelector('#client-id').value;
  var venueName = document.querySelector('#venue-name').value.replace(/\s+/g, '-');

  var url = `https://api.seatgeek.com/2/venues?name=${venueName}&client_id=${clientId}`
  fetch(url, {
      method: 'GET',
  })
  .then(response => response.json())
  .then( data => {
      console.log(data)

      const outputElement = document.querySelector('#output');
      const preElement = document.createElement('pre');
      preElement.textContent = JSON.stringify(data, null, 2);
      outputElement.innerHTML = '';
      outputElement.appendChild(preElement);
  })
  .catch((error) => {
      document.querySelector('#output').textContent = error.message
      console.error('Error:', error);
  });
});



