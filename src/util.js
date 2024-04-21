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

export class SideBarTab {
  constructor (button, render, endpointCallback) {
    this.button = button
    this._render = render
    this.endpointCallback = endpointCallback
    // this.formHtml.addEventListener('submit', createOnFormSubmit(this.endpointCallback))
  }

  /*
    Sets this tab style to active to visually track the active tab
  */
  setTabStyleActive () {
    const tabLinks = document.querySelectorAll('.tablink')
    tabLinks.forEach(link => {
      link.classList.remove('active-tab')
    })
    this.button.classList.add('active-tab')
  }

  /*
    Renders the form to the form container
  */
  get render () {
    this.setTabStyleActive()
    return this._render
  }
}

export class Dashboard {
  constructor (formContainer, tableContainer, tabs) {
    this.formContainer = formContainer
    this.tableContainer = tableContainer
    this.tabs = tabs
    this.initRenderOnClick()
  }

  /*
    Initiates renders for all tabs
    Informs tab objects where to render
  */
  initRenderOnClick () {
    Object.values(this.tabs).forEach(tab => {
      tab.button.addEventListener('click', () => {
        this.formContainer.innerHTML = ''
        this.formContainer.appendChild(tab.render)
      })
      tab.render.addEventListener('submit', this._onFormSubmitCreateTable(tab.endpointCallback))
    })
  }

  /*
    Renders any tab to the form container
  */
  renderTab (tabName) {
    this.formContainer.innerHTML = ''
    this.formContainer.appendChild(this.tabs[tabName].render)
  }

  /*
    Returns: a function that will render a table to the table container
  */
  _onFormSubmitCreateTable (endpointCallback) {
    return async (event) => {
      event.preventDefault()
      const formData = new FormData(event.target)
      const data = Object.fromEntries(formData.entries())
      const filteredData = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ''))
      const response = await endpointCallback(filteredData)

      const metaData = document.createTextNode(JSON.stringify(response.meta))
      const table = createTable(response[event.target.action])
      this.tableContainer.innerHTML = ''
      this.tableContainer.appendChild(metaData)
      this.tableContainer.appendChild(table)
    }
  }
}
