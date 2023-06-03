// import { BASE_URL } from '../constants/constants'

// export const fetchRefreshTokenCookie = async (refreshToken?: string): Promise<Response> => {
//   const response = await fetch(BASE_URL as string, {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'content-type': 'application/json',
//       cookie: `REFRESH_TOKEN=${refreshToken}`,
//     },
//     body: JSON.stringify({
//       query: `mutation RefreshTokenCookie {
//                 refreshTokenCookie {
//                   token
//                   success
//                   payload
//                 }
//               }
//               `,
//     }),
//   })

//   return response
// }

// export const handleRefreshTokenExpired = (): void => {
//   console.log('리프레시 토큰 만료')
//   window.localStorage.clear() // 로컬 스토리지 비우기
//   window.location.href = '/login'
// }
