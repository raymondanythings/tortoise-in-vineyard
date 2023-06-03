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

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  provider: AccountProvider;
}>;


export type LoginMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInOutput', accessToken: string } };


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