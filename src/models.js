const EventModel = () => ({
  searchQuery: '',
  startDateLocal: '',
  endDateLocal: '',
  startDateUTC: '',
  endDateUTC: '',
  city: '',
  state: '',
  country: '',
  latitude: '',
  longitude: '',
  range: '',
  eventID: '',
  taxonomyName: '',
  performerID: '',
  performerSlug: '',
  minListingsCount: '',
  maxListingsCount: '',
  minLowestPrice: '',
  maxLowestPrice: '',
  minHighestPrice: '',
  maxHighestPrice: '',
  sort: ''
})

/*
  fetches input data from DOM based on ids of inputModel
*/
export class InputHandler {
  constructor (doc, inputModel) {
    this.doc = doc
    this.model = inputModel
  }

  updateModel () {
    const properties = Object.keys(this.model)
    properties.forEach(property => {
      const element = this.doc.getElementById(property)
      if (element) {
        this.model[property] = element.value
      }
    })
    return this.model
  }
}
