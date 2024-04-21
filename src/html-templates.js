const dateRangeForm = `
  <legend>Date and Time Range Filters</legend>
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

const venueFilterForm = `
  <legend>Venue Filters</legend>
  <label for="city">City:
      <input type="text" id="city" name="venue.city">
  </label>
  <label for="state">State:
      <input type="text" id="state" name="venue.state">
  </label>
  <label for="country">Country:
      <input type="text" id="country" name="venue.country">
  </label>
`

const geoFilterForm = `
  <legend>Geo-Location Filters</legend>
  <label for="latitude">Latitude:
      <input type="text" id="latitude" name="geo.lat">
  </label>
  <label for="longitude">Longitude:
      <input type="text" id="longitude" name="geo.lon">
  </label>
  <label for="range">Range:
      <input type="text" id="range" name="geo.range">
  </label>
`

const miscFilterForm = `
  <legend>Miscellaneous Filters</legend>
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
const searchQuery = `
  <label for="searchQuery">Search Query:
      <input type="text" id="searchQuery" name="q">
  </label>
`

const createForm = (topic, formHTML) => {
  return `
    <form id="main-form" action="${topic}" method="get">
      <fieldset id="search-fieldset">
        ${searchQuery}
        ${formHTML}
      </fieldset>
      <button type="submit">Search</button>
    </form>
  `
}

export const eventForm = createForm(
  'events',
  `
    <fieldset id="datetime-fieldset">
        ${dateRangeForm}
    </fieldset>
    
    <fieldset>
        ${venueFilterForm}
    </fieldset>
    
    <fieldset>
        ${geoFilterForm}
    </fieldset>
    
    <fieldset>
        ${miscFilterForm}
    </fieldset>
  `
)

export const venueForm = createForm(
  'venues',
  `
    <fieldset>
      <legend>Venue ID</legend>
      <label for="venueId">Venue ID:
        <input type="number" id="venueId" name="id">
      </label>
    </fieldset>
    <fieldset>
      <legend>Venue Details</legend>
      <label for="venueName">Venue Name:
        <input type="text" id="venueName" name="name">
      </label>
      <label for="venueCity">City:
        <input type="text" id="venueCity" name="city">
      </label>
      <label for="venueState">State:
        <input type="text" id="venueState" name="state">
      </label>
      <label for="venueCountry">Country:
        <input type="text" id="venueCountry" name="country">
      </label>
      <label for="venuePostalCode">Postal Code:
        <input type="text" id="venuePostalCode" name="postal_code">
      </label>
      <label for="venueStateCode">State Code:
        <input type="text" id="venueStateCode" name="state_code">
      </label>
      <label for="venueCapacity">Capacity:
        <input type="number" id="venueCapacity" name="capacity.gte">
      </label>
    </fieldset>
  `
)

export const performerForm = createForm(
  'performers',
  `
    <fieldset>
      <label for="performerId">Performer ID:
        <input type="number" id="performerId" name="id">
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
    </fieldset>
  `
)
