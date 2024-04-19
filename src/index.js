import './styles.css'

const form = document.querySelector('form')
const tableContainer = document.querySelector('#table-container')

form.addEventListener('submit', function (event) {
  event.preventDefault()

  const formData = new FormData(form)

  let data = Object.fromEntries(formData.entries())
  data = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value.trim()]).filter(([key, value]) => value !== ''))
  const urlSearchParams = new URLSearchParams(data)

  const apiEndpoint = 'https://api.seatgeek.com/2/venues' // Replace this with the actual API endpoint
  const apiKey = 'MzQxMzc3Nzd8MTcxMzQ2NjU0NS40NjE4Nzc2' // You may need to include your API key

  // Construct the full URL with filtered query parameters and API key
  const url = `${apiEndpoint}?${urlSearchParams.toString()}&client_id=${apiKey}`

  fetch(url) // Make the API call
    .then(response => response.json())
    .then(data => {
      console.log(data.meta)
      console.table(data.venues)
      tableContainer.innerHTML = ''
      tableContainer.appendChild(document.createTextNode(JSON.stringify(data.meta)))
      tableContainer.appendChild(createTable(data.venues))
      tableContainer.appendChild(tableContainer)
      return data.venues
    })
    .catch((error) => {
      console.error('Error:', error)
    })
})

function createTable (data) {
  const table = document.createElement('table')
  const tableBody = document.createElement('tbody')
  const tableHeader = document.createElement('thead')
  const headerRow = document.createElement('tr')

  // Get all headers from data[0]
  const headers = Object.keys(data[0])

  headers.forEach(header => {
    const headerCell = document.createElement('th')
    headerCell.textContent = header
    headerRow.appendChild(headerCell)
  })

  tableHeader.appendChild(headerRow)
  table.appendChild(tableHeader)

  data.forEach(venue => {
    const row = document.createElement('tr')

    headers.forEach(header => {
      const cell = document.createElement('td')
      cell.textContent = venue[header]
      row.appendChild(cell)
    })

    tableBody.appendChild(row)
  })

  table.appendChild(tableBody)
  return table
}
