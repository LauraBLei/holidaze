export enum API {
  KEY = '6e4017bd-0f87-4e15-b29a-30f93e42bf6a',
  BASE = 'https://v2.api.noroff.dev',
  AUTH = `${API.BASE}/auth`,
  AUTH_LOGIN = `${API.AUTH}/login`,
  AUTH_REGISTER = `${API.AUTH}/register`,
  HOLIDAZE_API = `${API.BASE}/holidaze`,
  VENUES = `${API.HOLIDAZE_API}/venues`,
  VENUES_SEARCH = `${API.HOLIDAZE_API}/search`,
  PROFILES = `${API.HOLIDAZE_API}/profiles`,
  BOOKINGS = `${API.HOLIDAZE_API}/bookings`,
}
