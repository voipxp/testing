import React from 'react'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { UiLoadingCard, UiButton, UiCard, UiListItem } from '../ui'
import { Button } from 'rbx'
import { useQuery, useApolloClient } from '@apollo/react-hooks'

const GET_GROUP = gql`
  query getGroup {
    group(serviceProviderId: "odin_test", groupId: "odin_grp1") {
      _id
      groupId
      groupName
    }
  }
`

export const Test2 = ({ history }) => {
  const { loading, data } = useQuery(GET_GROUP, {
    onError: err => console.log(err),
    onCompleted: data => console.log(data),
    fetchPolicy: 'cache-first'
  })
  const client = useApolloClient()

  return (
    <>
      <Button.Group style={{ marginBottom: '1rem' }}>
        <UiButton icon="link" onClick={() => history.push('/test-1')}>
          Go To Cache and Network
        </UiButton>
        <UiButton icon="delete" onClick={() => client.clearStore()}>
          Reset Cache
        </UiButton>
      </Button.Group>
      {loading && isEmpty(data) ? (
        <UiLoadingCard />
      ) : (
        <UiCard title="Cache First">
          <UiListItem label="Group Id">{data.group.groupId}</UiListItem>
          <UiListItem label="Group Name">{data.group.groupName}</UiListItem>
        </UiCard>
      )}
    </>
  )
}

Test2.propTypes = {
  history: PropTypes.object
}
