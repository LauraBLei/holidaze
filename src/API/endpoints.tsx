export enum API {
  KEY = '6e4017bd-0f87-4e15-b29a-30f93e42bf6a',
  BASE = 'https://v2.api.noroff.dev/holidaze',
  AUTH = `${API.BASE}/auth`,
  AUTH_LOGIN = `${API.AUTH}/login`,
  AUTH_REGISTER = `${API.AUTH}/register`,
  VENUES = `${API.BASE}/venues`,
  VENUES_SEARCH = `${API.VENUES}/search`,
  PROFILES = `${API.BASE}/profiles`,
  BOOKINGS = `${API.BASE}/bookings`,
}
