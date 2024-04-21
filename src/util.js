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
    this.endpointName = render.action.split('/').pop()
    this.endpointCallback = endpointCallback
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

  /*
    Returns: a function that will call the endpoint associated with this tab
    normalize endpoint response to { data: [data], meta: { meta } }
  */
  async endpoint (data) {
    const response = await this.endpointCallback(data)
    response.data = response[this.endpointName]
    delete response[this.endpointName]
    return response
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
      tab.render.addEventListener('submit', this._onFormSubmitCreateTable(tab.endpoint.bind(tab)))
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
      const table = createTable(response.data)
      this.tableContainer.innerHTML = ''
      this.tableContainer.appendChild(metaData)
      this.tableContainer.appendChild(table)
    }
  }
}

/*
Example data structures for valid queries:

let venuesSearch = {
  ids: [1, 2 , 3],
  cityName: 'Boston',
  stateCode: 'MA',
  countryCode: 'USA',
  postalCode: '02122',
  queryString: 'WICKED PISSAH DOOD',
  useIpAddress: true,
  latitude: 4,
  longitude: 5,
  range: 6,
  unit: Unit.MILE,
  perPage: 7,
  page: 8,
};

let query = {
  ids: [1, 2, 3, 4],
  venues: {
    ids: [5, 6, 7],
    cityName: 'Boston',
    stateCode: 'MA',
    countryCode: 'US',
    postalCode: '02144'
  },
  performers: [
    {
      field: PerformerField.ID,
      specificity: PerformerSpecificity.ANY,
      value: 8
    },
    {
      field: PerformerField.SLUG,
      specificity: PerformerSpecificity.PRIMARY,
      value: 'boston-celtics'
    }
  ],
  taxonomies: [
    {
      taxonomy: Taxonomy.NBA
    },
    {
      taxonomy: Taxonomy.CONCERTS,
      field: TaxonomyField.PARENT_ID,
    }
  ],
  filters: [
    {
      option: FilterOption.AVERAGE_PRICE,
      operator: Operator.LESS_THAN,
      value: 9
    },
    {
      option: FilterOption.LISTING_COUNT,
      operator: Operator.GREATER_THAN_OR_EQUAL_TO,
      value: 10
    }
  ],
  geolocation: {
    useIpAddress: false,
    latitude: 10,
    longitude: 11,
    range: 12,
    unit: Unit.KILOMETER
  },
  sort: {
    option: SortOption.ID,
    direction: SortDirection.ASCENDING
  },
  perPage: 13,
  page: 14
};

let performersSearch = {
  ids: [1, 2, 3],
  slugs: ['performer-slug-1', 'performer-slug-2'],
  taxonomies: [Taxonomy.NBA, Taxonomy.CONCERT],
  genres: [Genre.POP, Genre.CLASSICAL],
  queryString: 'jaebaebae',
  perPage: 4,
  page: 5
};

*/
