export const STORAGE = {
  jwt: 'jwt',
} as const

export const RESPONSE = {
  noPermission: 'No Permission',
  wrongUser: 'Does Not Exist!!!',
  accessTokenExpired: 'Signature has expired',
  refreshTokenExpired: 'Refresh Token Not Exist!!!',
  wrongJwt: 'Error decoding signature',
} as const

export const BASE_URL = 'https://flyby-router-demo.herokuapp.com/'
