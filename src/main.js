import './styles.css'
import * as html from './html-templates.js'
import * as util from './util.js'
import pkg from 'seatgeek-client'

const client = new pkg.SeatGeekClient(process.env.SEATGEEK_CLIENT_ID)

function htmlToRender (htmlText) {
  const div = document.createElement('div')
  div.innerHTML = htmlText.trim()
  return div.firstChild
}
const eventForm = htmlToRender(html.eventForm)
const venueForm = htmlToRender(html.venueForm)
const performerForm = htmlToRender(html.performerForm)

const dashboard = new util.Dashboard(
  document.querySelector('#form-container'),
  document.querySelector('#table-container'),
  {
    events: new util.SideBarTab(
      document.querySelector('#events-form-button'),
      eventForm,
      client.getEvents.bind(client)
    ),
    venues: new util.SideBarTab(
      document.querySelector('#venues-form-button'),
      venueForm,
      client.getVenues.bind(client)
    ),
    performers: new util.SideBarTab(
      document.querySelector('#performers-form-button'),
      performerForm,
      client.getPerformers.bind(client)
    )
  }
)

dashboard.renderTab('events')
