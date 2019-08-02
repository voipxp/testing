import gql from 'graphql-tag'

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

export const USER_INTERCEPT_MUTATION = gql`
  mutation userInterceptUpdate($input: UserInterceptInput!) {
    userInterceptUpdate(input: $input) {
      ...UserInterceptFragment
    }
    ${USER_INTERCEPT_FRAGMENT}
  }
`
