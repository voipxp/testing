import gql from 'graphql-tag'
import get from 'lodash/get'
import { useQuery, useMutation } from '@apollo/react-hooks'

export const USER_INTERCEPT_FRAGMENT = gql`
  fragment UserInterceptFragment on UserIntercept {
    _id
    alternateBlockingAnnouncement
    announcementSelection
    audioFile {
      description
      mediaType
    }
    disableParallelRingingToNetworkLocations
    exemptInboundMobilityCalls
    exemptOutboundMobilityCalls
    inboundCallMode
    isActive
    newPhoneNumber
    outboundCallMode
    outboundReroutePhoneNumber
    playNewPhoneNumber
    rerouteOutboundCalls
    routeToVoiceMail
    transferOnZeroToPhoneNumber
    transferPhoneNumber
    userId
    videoFile {
      description
      mediaType
    }
  }
`

export const USER_INTERCEPT_QUERY = gql`
  query userIntercept($userId: String!) {
    userIntercept(userId: $userId) {
      ...UserInterceptFragment
    }
    ${USER_INTERCEPT_FRAGMENT}
  }
`

const USER_INTERCEPT_UPDATE_MUTATION = gql`
  mutation userInterceptUpdate($input: UserInterceptInput!) {
    userInterceptUpdate(input: $input) {
      ...UserInterceptFragment
    }
    ${USER_INTERCEPT_FRAGMENT}
  }
`

export const useUserIntercept = userId => {
  const query = useQuery(USER_INTERCEPT_QUERY, {
    variables: { userId }
  })
  return { ...query, data: get(query, 'data.userIntercept') }
}

export const useUserInterceptUpdate = userId => {
  return useMutation(USER_INTERCEPT_UPDATE_MUTATION)
}