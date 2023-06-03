// /**
//  * Apollo 기본 설정
//  */
// import {
//   ApolloClient,
//   InMemoryCache, // Apollo 설정시 기본으로 먼저 설정해두는 apollo client와 cache
//   HttpLink, // 서버 요청을 위한 link 설정
//   ApolloLink,
//   fromPromise,
// } from '@apollo/client'
// import { onError } from '@apollo/client/link/error'

// import {
//   RESPONSE,
//   STORAGE,
// } from '../constants/constants'
// import { fetchRefreshTokenCookie, handleRefreshTokenExpired } from '@common/utils/functions'

// import { type RefreshTokenCookieMutationResult } from '@GeneralBackend'
// import uri from '../constants/uri'
// import

// interface FetchRefreshTokenResponse {
//   data: RefreshTokenCookieMutationResult['data']
//   errors?: [RefreshTokenCookieMutationResult['error']]
// }

// const dataBaseLink = new HttpLink({
//   uri: uri.BASE_URL,
// })

// const integratedApiLink = ApolloLink.split(
//   (operation) => operation.getContext().clientName === 'b2b',
//   dataBaseLink,
// )

// const authLink = new ApolloLink((operation, forward) => {
//   const token = localStorage.getItem(STORAGE.jwt)
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       authorization: token ? `jwt ${token}` : '',
//     },
//   }))
//   return forward(operation)
// })

// const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
//   if (graphQLErrors) {
//     switch (graphQLErrors[0].message) {
//       case RESPONSE.wrongJwt:
//       case RESPONSE.accessTokenExpired:
//         console.log('액세스 토큰 만료')

//         return fromPromise(
//           fetchRefreshTokenCookie()
//             .then((response) => response.json())
//             .then((response: FetchRefreshTokenResponse) => {
//               const { data, errors } = response

//               if (errors?.[0]?.message === RESPONSE.refreshTokenExpired) {
//                 handleRefreshTokenExpired()
//                 return
//               }
//               const newAccessToken = data?.refreshTokenCookie?.token
//               localStorage.setItem(STORAGE.jwt, String(newAccessToken))

//               // 요청 헤더에 새로 발급 받은 토큰 저장
//               operation.setContext(({ headers = {} }) => ({
//                 headers: {
//                   ...headers,
//                   authorization: `jwt ${newAccessToken}`,
//                 },
//               }))
//               return newAccessToken
//             })
//             .catch((error) => {
//               console.log('error :>> ', error)
//             }),
//         )
//           .filter((value) => Boolean(value))
//           .flatMap(() => {
//             // Error가 발생한 요청(operation) 재시도 (이게 없으면 재요청 보내지 않음)
//             return forward(operation)
//           })
//       case RESPONSE.refreshTokenExpired:
//         handleRefreshTokenExpired()
//         break
//       default:
//         break
//     }
//   }
//   if (networkError) console.log(`[Network error]: ${networkError}`)
// })

// export const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: ApolloLink.from([authLink, errorLink, integratedApiLink]),
// })
