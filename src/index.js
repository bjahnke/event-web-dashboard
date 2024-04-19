import './styles.css'
import * as html from './html-templates.js'

const formContainer = document.querySelector('#form-container')
const tableContainer = document.querySelector('#table-container')
const apiBase = 'https://api.seatgeek.com/2'
const apiKey = '' // You may need to include your API key

function createLoadFormListener (button, formContainer, formHtml) {
  button.addEventListener('click', function () {
    const tabLinks = document.querySelectorAll('.tablink')
    tabLinks.forEach(link => {
      link.classList.remove('active-tab')
    })
    button.classList.add('active-tab')
    formContainer.innerHTML = formHtml
    const form = formContainer.querySelector('form')
    form.addEventListener('submit', onFormSubmit)
  })
}

createLoadFormListener(document.querySelector('#events-form-button'), formContainer, html.eventForm)
createLoadFormListener(document.querySelector('#venues-form-button'), formContainer, html.venueForm)

/*
  Creates a table element from an array of objects
*/
function onFormSubmit (event) {
  event.preventDefault()
  const form = formContainer.querySelector('form')

  const formData = new FormData(form)

  let data = Object.fromEntries(formData.entries())
  data = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value.trim()]).filter(([key, value]) => value !== ''))
  const urlSearchParams = new URLSearchParams(data)

  const endpoint = form.action.split('/').pop()

  // Construct the full URL with filtered query parameters and API key
  const url = `${form.action}?${urlSearchParams.toString()}&client_id=${apiKey}`

  fetch(url) // Make the API call
    .then(response => response.json())
    .then(data => {
      console.log(data.meta)
      console.table(data[endpoint])
      tableContainer.innerHTML = ''
      tableContainer.appendChild(document.createTextNode(JSON.stringify(data.meta)))
      tableContainer.appendChild(createTable(data[endpoint]))
      tableContainer.appendChild(tableContainer)
      return data[endpoint]
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

/*
  Creates a table element from an array of objects
*/
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

  data.forEach(respObj => {
    const row = document.createElement('tr')

    headers.forEach(header => {
      const cell = document.createElement('td')
      cell.textContent = respObj[header]
      row.appendChild(cell)
    })

    tableBody.appendChild(row)
  })

  table.appendChild(tableBody)
  return table
}

