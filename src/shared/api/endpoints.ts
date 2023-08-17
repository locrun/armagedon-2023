export const endpoints = {
  asteroids: {
    fetchAsteroidList: (start_date: string, end_date: string) =>
      `neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}`,
  },
  oneAsteroid: {
    fetchOneAsteroid: (id: string) => `neo/rest/v1/neo/${id}`,
  },
}
