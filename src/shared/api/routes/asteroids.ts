import { api } from '../index'
import { endpoints } from '../endpoints'

export const fetchAsteroidList = (start_date: string, end_date: string) => {
  return api.get(endpoints.asteroids.fetchAsteroidList(start_date, end_date))
}
export const fetchOneAsteroid = (id: string) => {
  return api.get(endpoints.oneAsteroid.fetchOneAsteroid(id))
}
