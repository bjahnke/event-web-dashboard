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
      const query = InputTranslator.formToQuery(event.target)
      const response = await endpointCallback(query)
      const metaData = document.createTextNode(JSON.stringify(response.meta))
      const table = createTable(response.data)
      this.tableContainer.innerHTML = ''
      this.tableContainer.appendChild(metaData)
      this.tableContainer.appendChild(table)
    }
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

/*
Example data structures for valid queries:

let venuesSearch = {
  ids: [1, 2, 3],
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

export function toggleFieldset (legend) {
  const content = legend.nextElementSibling;
  if (content.classList.contains('hide')) {
    content.classList.remove('hide');
  } else {
    content.classList.add('hide');
  }
}

class InputTranslator {
  /*
    Parses Object.fromEntries, translates dot '.' in key to nested object
    for compatibility with SeatGeek API
  */
  static nestDotKeys (obj) {
    const result = {}
    for (const key in obj) {
      if (key.includes('.')) {
        const [parentKey, childKey] = key.split('.')
        if (!result[parentKey]) {
          result[parentKey] = {}
        }
        result[parentKey][childKey] = obj[key]
      } else {
        result[key] = obj[key]
      }
    }
    return result
  }

  /*
      Parses string values to their respective types for compatibility with SeatGeek API
    */
  static parseInputTypes (query, form) {
    const parsedQuery = {}
    for (let [name, value] of Object.entries(query)) {
      const input = form.elements[name]
      if (input.type === 'number') {
        value = parseFloat(value)
      } else if (input.type === 'checkbox') {
        value = input.checked
      }
      parsedQuery[name] = value
    }
    return parsedQuery
  }

  /*
      Converts form data to query object for SeatGeek API
    */
  static formToQuery (form) {
    const formData = new FormData(form)
    let query = Object.fromEntries(formData.entries())
    query = Object.fromEntries(Object.entries(query).filter(([key, value]) => value !== ''))
    query = InputTranslator.parseInputTypes(query, form)
    query = InputTranslator.nestDotKeys(query)
    return query
  }
}

/*
  Class labels private util methods that are exported only for testing
*/
export class Private {
  static get InputTranslator () {
    return InputTranslator
  }
}
