const collapsableFieldSet = (legendTitle, html) => {
  return `
    <fieldset>
      <legend onclick="toggleFieldset(this)">${legendTitle}</legend>
      <div class="collapsable">
        ${html}
      </div>
    </fieldset>

  `
}

const createForm = (topic, html) => {
  return `
    <form id="main-form" action="${topic}" method="get">
      <fieldset id="search-fieldset">
        ${searchQuery}
        ${html}
        ${paginationFieldSet}
      </fieldset>
      <button type="submit">Search</button>
    </form>
  `
}

const paginationFieldSet = collapsableFieldSet(
  'Pagination',
  `
    <label for="perPage">Results Per Page:
        <input type="number" id="perPage" name="per_page" min="1">
    </label>
    <label for="page">Page Number:
        <input type="number" id="page" name="page" min="1">
    </label>
  `
)

const dateRangeFieldSet = collapsableFieldSet(
  'Date and Time Range Filters',
  `
    <label for="startDateLocal">Start Period (Local):
        <input type="datetime-local" id="startDateLocal" name="datetime_local.gte">
    </label>
    <label for="endDateLocal">End Period (Local):
        <input type="datetime-local" id="endDateLocal" name="datetime_local.lte">
    </label>
    <label for="startDateUTC">Start Period (UTC):
        <input type="datetime-local" id="startDateUTC" name="datetime_utc.gte">
    </label>
    <label for="endDateUTC">End Period (UTC):
        <input type="datetime-local" id="endDateUTC" name="datetime_utc.lte">
    </label>
  `
)

const venueFileterFormExternal = collapsableFieldSet(
  'Venue Filters',
  `
    <label for="city">City:
        <input type="text" id="city" name="venue.cityName">
    </label>
    <label for="state">State:
        <input type="text" id="state" name="venue.stateCode">
    </label>
    <label for="country">Country:
        <input type="text" id="country" name="venue.countryCode">
    </label>
  `
)

const geoFilterForm = collapsableFieldSet(
  'Geo-Location Filters',
  `
    <label for="useIpAddress">Use My Geo-Location
      <input type="checkbox" id="useIpAddress" name="useIpAddress">
    </label>
    <label for="latitude">Latitude
      <input id="latitude" name="latitude" type="number">
    </label>
    <label for="longitude">Longitude
      <input id="longitude" name="latitude" type="number">
    </label>
    <label for="range">Range
      <input id="range" name="range" type="number">
    </label>
    <label for="unit">Unit
      <select id="unit" name="unit">
        <option value=""></option>
        <option value="km">Kilometers</option>
        <option value="mile">Miles</option>
      </select>
    </label>
  `
)

const miscFilterForm = collapsableFieldSet(
  'Miscellaneous Filters',
  `
  <label for="eventID">Event ID:
      <input type="number" id="eventID" name="id">
  </label>
  <label for="taxonomyName">Taxonomy Name:
      <input type="text" id="taxonomyName" name="taxonomies.name">
  </label>
  <label for="performerID">Performer ID:
      <input type="number" id="performerID" name="performers.id">
  </label>
  <label for="performerSlug">Performer Slug:
      <input type="text" id="performerSlug" name="performers.slug">
  </label>
  <label for="minListingsCount">Min Listings Count:
      <input type="number" id="minListingsCount" name="listings_count.gte">
  </label>
  <label for="maxListingsCount">Max Listings Count:
      <input type="number" id="maxListingsCount" name="listings_count.lte">
  </label>
  <label for="minLowestPrice">Min Lowest Price:
      <input type="number" id="minLowestPrice" name="lowest_price.gte">
  </label>
  <label for="maxLowestPrice">Max Lowest Price:
      <input type="number" id="maxLowestPrice" name="lowest_price.lte">
  </label>
  <label for="minHighestPrice">Min Highest Price:
      <input type="number" id="minHighestPrice" name="highest_price.gte">
  </label>
  <label for="maxHighestPrice">Max Highest Price:
      <input type="number" id="maxHighestPrice" name="highest_price.lte">
  </label>
  <label for="sort">Sort:
      <select id="sort" name="sort">
          <option value=""></option>
          <option value="date_asc">Date Ascending</option>
          <option value="date_desc">Date Descending</option>
      </select>
  </label>
`
)
const searchQuery = `
  <label for="searchQuery">Search Query:
      <input type="text" id="queryString" name="q">
  </label>
`

export const eventForm = createForm(
  'events',
  `
    ${dateRangeFieldSet}
    ${venueFileterFormExternal}
    ${geoFilterForm}
    ${miscFilterForm}
  `
)

const venueDetailsForm = collapsableFieldSet(
  'Venue Details',
  `
    <label for="venueId">Venue ID:
      <input type="number" id="venueId" name="ids">
    </label>
    <label for="venueName">Venue Name:
      <input type="text" id="venueName" name="name">
    </label>
    <label for="venueCity">City:
      <input type="text" id="venueCity" name="cityName">
    </label>
    <label for="venueState">State:
      <input type="text" id="venueState" name="stateCode">
    </label>
    <label for="venueCountry">Country:
      <input type="text" id="venueCountry" name="countryCode">
    </label>
    <label for="venuePostalCode">Postal Code:
      <input type="text" id="venuePostalCode" name="postalCode">
    </label>
    <label for="venueStateCode">State Code:
      <input type="text" id="venueStateCode" name="state_code">
    </label>
    <label for="venueCapacity">Capacity:
      <input type="number" id="venueCapacity" name="capacity.gte">
    </label>
  `
)

export const venueForm = createForm(
  'venues',
  `
    ${venueDetailsForm}
    ${geoFilterForm}
  `
)

const performerDetailsForm = collapsableFieldSet(
  'Performer Details',
  `
    <label for="performerId">Performer ID:
      <input type="number" id="performerId" name="ids">
    </label>
    <label for="performerName">Performer Name:
      <input type="text" id="performerName" name="name">
    </label>
    <label for="performerSlug">Performer Slug:
      <input type="text" id="performerSlug" name="slug">
    </label>
    <label for="genre">Genre:
      <input type="text" id="genre" name="taxonomies.name">
    </label>
    <label for="hasUpcomingEvents">Has Upcoming Events:
      <select id="hasUpcomingEvents" name="has_upcoming_events">
          <option value=""></option>
          <option value="true">Yes</option>
          <option value="false">No</option>
      </select>
    </label>
    <label for="sort">Sort By:
      <select id="sort" name="sort">
          <option value=""></option>
          <option value="name_asc">Name Ascending</option>
          <option value="name_desc">Name Descending</option>
          <option value="score_asc">Score Ascending</option>
          <option value="score_desc">Score Descending</option>
      </select>
    </label>
  `
)

export const performerForm = createForm(
  'performers',
  `
    ${performerDetailsForm}
  `
)
