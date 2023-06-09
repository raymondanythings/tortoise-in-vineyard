import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  provider: AccountProvider;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export enum AccountProvider {
  Apple = 'APPLE',
  Kakao = 'KAKAO'
}

export enum Emotion {
  Angry = 'ANGRY',
  Excited = 'EXCITED',
  Gloomy = 'GLOOMY',
  Happy = 'HAPPY',
  Irritated = 'IRRITATED',
  Lethargic = 'LETHARGIC',
  Pleased = 'PLEASED',
  Proud = 'PROUD',
  Unstable = 'UNSTABLE'
}

export type EndRunInput = {
  emotionAfter: Emotion;
  runId: Scalars['String']['input'];
  runMeters?: InputMaybe<Scalars['Float']['input']>;
};

export type EndRunOutput = {
  __typename?: 'EndRunOutput';
  numLeft: Scalars['Float']['output'];
  totalRun: Scalars['Float']['output'];
};

export type GetEncourageInput = {
  currentHeartRate?: InputMaybe<Scalars['Float']['input']>;
  runId: Scalars['String']['input'];
};

export type Grape = {
  __typename?: 'Grape';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  runs: Array<Run>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** [Protected] 러닝 종료 API */
  endRun: EndRunOutput;
  getEncourage: Scalars['Boolean']['output'];
  /** 로그인 API */
  signIn: SignInOutput;
  /** [Protected] 러닝 시작 API */
  startRun: Run;
  /** [Protected] 나이 설정 API */
  updateBirthYear: User;
  /** [Protected] 안정심박수 설정 API */
  updateMinHeartRate: User;
};


export type MutationEndRunArgs = {
  input: EndRunInput;
};


export type MutationGetEncourageArgs = {
  input: GetEncourageInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationStartRunArgs = {
  input: StartRunInput;
};


export type MutationUpdateBirthYearArgs = {
  birthYear: Scalars['Float']['input'];
};


export type MutationUpdateMinHeartRateArgs = {
  minHeartRate: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** [Protected] 적정 심박수 조회 API */
  getHeartRateRange: Array<Scalars['Float']['output']>;
  grape: Grape;
  grapes: Array<Grape>;
  /** [Protected] 내 정보 조회 API */
  me: User;
  run: Run;
};


export type QueryGrapeArgs = {
  id: Scalars['String']['input'];
};


export type QueryRunArgs = {
  id: Scalars['String']['input'];
};

export type Run = {
  __typename?: 'Run';
  createdAt: Scalars['DateTime']['output'];
  emotionAfter?: Maybe<Emotion>;
  emotionBefore: Emotion;
  grape: Grape;
  grapeId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lowerBoundHeartRate?: Maybe<Scalars['Float']['output']>;
  runMeters?: Maybe<Scalars['Float']['output']>;
  type: RunType;
  updatedAt: Scalars['DateTime']['output'];
  upperBoundHeartRate?: Maybe<Scalars['Float']['output']>;
};

export enum RunType {
  Distance = 'DISTANCE',
  HeartRate = 'HEART_RATE'
}

export type SignInInput = {
  email: Scalars['String']['input'];
  provider: AccountProvider;
};

export type SignInOutput = {
  __typename?: 'SignInOutput';
  accessToken: Scalars['String']['output'];
};

export type StartRunInput = {
  emotionBefore: Emotion;
  type: RunType;
};

export type Subscription = {
  __typename?: 'Subscription';
  runPaceMaker: Scalars['String']['output'];
};


export type SubscriptionRunPaceMakerArgs = {
  runId: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  accounts: Array<Account>;
  birthYear?: Maybe<Scalars['Float']['output']>;
  /** 오늘 달릴 수 있는지 여부 */
  canRunToday: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  grapes: Array<Grape>;
  hasDevice: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  minHeartRate?: Maybe<Scalars['Float']['output']>;
  /** 총 달린 횟수 (총 포도알 개수) */
  totalRun: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserDataFragment = { __typename?: 'User', id: string, email: string, hasDevice: boolean, birthYear?: number | null, minHeartRate?: number | null, createdAt: any, updatedAt: any, totalRun: number, canRunToday: boolean };

export type GetEncourageMutationVariables = Exact<{
  input: GetEncourageInput;
}>;


export type GetEncourageMutation = { __typename?: 'Mutation', getEncourage: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  provider: AccountProvider;
}>;


export type LoginMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInOutput', accessToken: string } };

export type UpdateMinHeartRateMutationVariables = Exact<{
  minHeartRate: Scalars['Float']['input'];
}>;


export type UpdateMinHeartRateMutation = { __typename?: 'Mutation', updateMinHeartRate: { __typename?: 'User', id: string, email: string, hasDevice: boolean, birthYear?: number | null, minHeartRate?: number | null, createdAt: any, updatedAt: any, totalRun: number, canRunToday: boolean } };

export type StartRunMutationVariables = Exact<{
  input: StartRunInput;
}>;


export type StartRunMutation = { __typename?: 'Mutation', startRun: { __typename?: 'Run', id: string, type: RunType, emotionBefore: Emotion, emotionAfter?: Emotion | null, runMeters?: number | null, lowerBoundHeartRate?: number | null, upperBoundHeartRate?: number | null, createdAt: any, updatedAt: any } };

export type EndRunMutationVariables = Exact<{
  input: EndRunInput;
}>;


export type EndRunMutation = { __typename?: 'Mutation', endRun: { __typename?: 'EndRunOutput', totalRun: number, numLeft: number } };

export type UpdateBirthMutationVariables = Exact<{
  birthYear: Scalars['Float']['input'];
}>;


export type UpdateBirthMutation = { __typename?: 'Mutation', updateBirthYear: { __typename?: 'User', birthYear?: number | null } };

export type GetHeartRateRageQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHeartRateRageQuery = { __typename?: 'Query', getHeartRateRange: Array<number> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, hasDevice: boolean, birthYear?: number | null, minHeartRate?: number | null, createdAt: any, updatedAt: any, totalRun: number, canRunToday: boolean } };

export type RunPaceMakerSubscriptionVariables = Exact<{
  runId: Scalars['String']['input'];
}>;


export type RunPaceMakerSubscription = { __typename?: 'Subscription', runPaceMaker: string };

export const UserDataFragmentDoc = gql`
    fragment userData on User {
  id
  email
  hasDevice
  birthYear
  minHeartRate
  createdAt
  updatedAt
  totalRun
  canRunToday
}
    `;
export const GetEncourageDocument = gql`
    mutation getEncourage($input: GetEncourageInput!) {
  getEncourage(input: $input)
}
    `;
export type GetEncourageMutationFn = Apollo.MutationFunction<GetEncourageMutation, GetEncourageMutationVariables>;

/**
 * __useGetEncourageMutation__
 *
 * To run a mutation, you first call `useGetEncourageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetEncourageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getEncourageMutation, { data, loading, error }] = useGetEncourageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEncourageMutation(baseOptions?: Apollo.MutationHookOptions<GetEncourageMutation, GetEncourageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetEncourageMutation, GetEncourageMutationVariables>(GetEncourageDocument, options);
      }
export type GetEncourageMutationHookResult = ReturnType<typeof useGetEncourageMutation>;
export type GetEncourageMutationResult = Apollo.MutationResult<GetEncourageMutation>;
export type GetEncourageMutationOptions = Apollo.BaseMutationOptions<GetEncourageMutation, GetEncourageMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $provider: AccountProvider!) {
  signIn(input: {email: $email, provider: $provider}) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      provider: // value for 'provider'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const UpdateMinHeartRateDocument = gql`
    mutation updateMinHeartRate($minHeartRate: Float!) {
  updateMinHeartRate(minHeartRate: $minHeartRate) {
    ...userData
  }
}
    ${UserDataFragmentDoc}`;
export type UpdateMinHeartRateMutationFn = Apollo.MutationFunction<UpdateMinHeartRateMutation, UpdateMinHeartRateMutationVariables>;

/**
 * __useUpdateMinHeartRateMutation__
 *
 * To run a mutation, you first call `useUpdateMinHeartRateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMinHeartRateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMinHeartRateMutation, { data, loading, error }] = useUpdateMinHeartRateMutation({
 *   variables: {
 *      minHeartRate: // value for 'minHeartRate'
 *   },
 * });
 */
export function useUpdateMinHeartRateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMinHeartRateMutation, UpdateMinHeartRateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMinHeartRateMutation, UpdateMinHeartRateMutationVariables>(UpdateMinHeartRateDocument, options);
      }
export type UpdateMinHeartRateMutationHookResult = ReturnType<typeof useUpdateMinHeartRateMutation>;
export type UpdateMinHeartRateMutationResult = Apollo.MutationResult<UpdateMinHeartRateMutation>;
export type UpdateMinHeartRateMutationOptions = Apollo.BaseMutationOptions<UpdateMinHeartRateMutation, UpdateMinHeartRateMutationVariables>;
export const StartRunDocument = gql`
    mutation startRun($input: StartRunInput!) {
  startRun(input: $input) {
    id
    type
    emotionBefore
    emotionAfter
    runMeters
    lowerBoundHeartRate
    upperBoundHeartRate
    createdAt
    updatedAt
  }
}
    `;
export type StartRunMutationFn = Apollo.MutationFunction<StartRunMutation, StartRunMutationVariables>;

/**
 * __useStartRunMutation__
 *
 * To run a mutation, you first call `useStartRunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartRunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startRunMutation, { data, loading, error }] = useStartRunMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStartRunMutation(baseOptions?: Apollo.MutationHookOptions<StartRunMutation, StartRunMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartRunMutation, StartRunMutationVariables>(StartRunDocument, options);
      }
export type StartRunMutationHookResult = ReturnType<typeof useStartRunMutation>;
export type StartRunMutationResult = Apollo.MutationResult<StartRunMutation>;
export type StartRunMutationOptions = Apollo.BaseMutationOptions<StartRunMutation, StartRunMutationVariables>;
export const EndRunDocument = gql`
    mutation endRun($input: EndRunInput!) {
  endRun(input: $input) {
    totalRun
    numLeft
  }
}
    `;
export type EndRunMutationFn = Apollo.MutationFunction<EndRunMutation, EndRunMutationVariables>;

/**
 * __useEndRunMutation__
 *
 * To run a mutation, you first call `useEndRunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndRunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endRunMutation, { data, loading, error }] = useEndRunMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEndRunMutation(baseOptions?: Apollo.MutationHookOptions<EndRunMutation, EndRunMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndRunMutation, EndRunMutationVariables>(EndRunDocument, options);
      }
export type EndRunMutationHookResult = ReturnType<typeof useEndRunMutation>;
export type EndRunMutationResult = Apollo.MutationResult<EndRunMutation>;
export type EndRunMutationOptions = Apollo.BaseMutationOptions<EndRunMutation, EndRunMutationVariables>;
export const UpdateBirthDocument = gql`
    mutation updateBirth($birthYear: Float!) {
  updateBirthYear(birthYear: $birthYear) {
    birthYear
  }
}
    `;
export type UpdateBirthMutationFn = Apollo.MutationFunction<UpdateBirthMutation, UpdateBirthMutationVariables>;

/**
 * __useUpdateBirthMutation__
 *
 * To run a mutation, you first call `useUpdateBirthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBirthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBirthMutation, { data, loading, error }] = useUpdateBirthMutation({
 *   variables: {
 *      birthYear: // value for 'birthYear'
 *   },
 * });
 */
export function useUpdateBirthMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBirthMutation, UpdateBirthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBirthMutation, UpdateBirthMutationVariables>(UpdateBirthDocument, options);
      }
export type UpdateBirthMutationHookResult = ReturnType<typeof useUpdateBirthMutation>;
export type UpdateBirthMutationResult = Apollo.MutationResult<UpdateBirthMutation>;
export type UpdateBirthMutationOptions = Apollo.BaseMutationOptions<UpdateBirthMutation, UpdateBirthMutationVariables>;
export const GetHeartRateRageDocument = gql`
    query getHeartRateRage {
  getHeartRateRange
}
    `;

/**
 * __useGetHeartRateRageQuery__
 *
 * To run a query within a React component, call `useGetHeartRateRageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHeartRateRageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHeartRateRageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHeartRateRageQuery(baseOptions?: Apollo.QueryHookOptions<GetHeartRateRageQuery, GetHeartRateRageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHeartRateRageQuery, GetHeartRateRageQueryVariables>(GetHeartRateRageDocument, options);
      }
export function useGetHeartRateRageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHeartRateRageQuery, GetHeartRateRageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHeartRateRageQuery, GetHeartRateRageQueryVariables>(GetHeartRateRageDocument, options);
        }
export type GetHeartRateRageQueryHookResult = ReturnType<typeof useGetHeartRateRageQuery>;
export type GetHeartRateRageLazyQueryHookResult = ReturnType<typeof useGetHeartRateRageLazyQuery>;
export type GetHeartRateRageQueryResult = Apollo.QueryResult<GetHeartRateRageQuery, GetHeartRateRageQueryVariables>;
export const GetMeDocument = gql`
    query getMe {
  me {
    ...userData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const RunPaceMakerDocument = gql`
    subscription runPaceMaker($runId: String!) {
  runPaceMaker(runId: $runId)
}
    `;

/**
 * __useRunPaceMakerSubscription__
 *
 * To run a query within a React component, call `useRunPaceMakerSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRunPaceMakerSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRunPaceMakerSubscription({
 *   variables: {
 *      runId: // value for 'runId'
 *   },
 * });
 */
export function useRunPaceMakerSubscription(baseOptions: Apollo.SubscriptionHookOptions<RunPaceMakerSubscription, RunPaceMakerSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RunPaceMakerSubscription, RunPaceMakerSubscriptionVariables>(RunPaceMakerDocument, options);
      }
export type RunPaceMakerSubscriptionHookResult = ReturnType<typeof useRunPaceMakerSubscription>;
export type RunPaceMakerSubscriptionResult = Apollo.SubscriptionResult<RunPaceMakerSubscription>;