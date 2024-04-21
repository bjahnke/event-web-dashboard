/*
  assigns a form to a tab button
  Includes visual feedback to track the active tab
  assigns listener to the form submit button
*/
export function renderTab (client, button, formContainer, formHtml, tableContainer) {
  const tabLinks = document.querySelectorAll('.tablink')
  tabLinks.forEach(link => {
    link.classList.remove('active-tab')
  })
  button.classList.add('active-tab')
  formContainer.innerHTML = formHtml
  const form = formContainer.querySelector('form')
  form.addEventListener('submit', createOnFormSubmit(client, formContainer, tableContainer))
  return form
}

/*
  Creates a table element from an array of objects
*/
export function createOnFormSubmit (client, formContainer, tableContainer) {
  return async (event) => {
    event.preventDefault()
    const form = formContainer.querySelector('form')
    const endpoint = form.action

    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    const map = {
      events: client.getEvents.bind(client),
      venues: client.getVenues.bind(client),
      performers: client.getPerformers.bind(client)
    }

    const response = await map[endpoint](data)

    tableContainer.innerHTML = ''
    tableContainer.appendChild(document.createTextNode(JSON.stringify(response.meta)))
    tableContainer.appendChild(createTable(response[endpoint]))
    tableContainer.appendChild(tableContainer)
    return response[endpoint]
  }
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

export function createLoadFormListener (button, formContainer, formHtml) {
  button.addEventListener('click', () => renderTab(button, formContainer, formHtml))
}
