import './styles.css'
import * as html from './html-templates.js'
import * as util from './util.js'
import pkg from 'seatgeek-client'

const client = new pkg.SeatGeekClient(process.env.SEATGEEK_CLIENT_ID)
const formContainer = document.querySelector('#form-container')
const tableContainer = document.querySelector('#table-container')

util.createLoadFormListener(client, document.querySelector('#events-form-button'), formContainer, html.eventForm, tableContainer)
util.createLoadFormListener(client, document.querySelector('#venues-form-button'), formContainer, html.venueForm, tableContainer)
util.createLoadFormListener(client, document.querySelector('#performers-form-button'), formContainer, html.performerForm, tableContainer)

util.renderTab(document.querySelector('#events-form-button'), formContainer, html.eventForm, tableContainer)
