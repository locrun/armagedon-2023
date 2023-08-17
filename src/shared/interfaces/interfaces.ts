type Props = {
  distanceOption?: string
  addToCart?: () => void
}

export interface AsteroidProps extends Props {
  id: string
  name: string
  flightDate: string
  distancesInKm: string
  distancesToMoon: string
  diameter: number
  isPotentiallyHazardous: boolean
}
;[]

export interface ResponseData {
  links: {
    next: string
    prev: string
    self: string
  }
  near_earth_objects: {
    [date: string]: AsteroidData[]
  }
  element_count: number
}

export interface AsteroidData {
  id: string
  absolute_magnitude_h: number
  close_approach_data: ApproachData[]
  estimated_diameter: Diameter
  designation: string
  is_potentially_hazardous_asteroid: boolean
  is_sentry_object: boolean
  links: { self: string }
  name: string
  name_limited: string
  nasa_jpl_url: string
  neo_reference_id: string
}

interface ApproachData {
  close_approach_date: string
  close_approach_date_full: string
  epoch_date_close_approach: number

  miss_distance: {
    astronomical: string
    kilometers: string
    lunar: string
    miles: string
  }
  relative_velocity: {
    kilometers_per_hour: string
    kilometers_per_second: string
    miles_per_hour: string
  }
  orbiting_body: string
}

interface Diameter {
  feet: {
    estimated_diameter_max: number
    estimated_diameter_min: number
  }
  kilometers: {
    estimated_diameter_max: number
    estimated_diameter_min: number
  }
  meters: {
    estimated_diameter_max: number
    estimated_diameter_min: number
  }
  miles: {
    estimated_diameter_max: number
    estimated_diameter_min: number
  }
}
