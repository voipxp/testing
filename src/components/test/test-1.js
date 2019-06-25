import React from 'react'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Button } from 'rbx'
import { UiLoadingCard, UiButton, UiCard, UiListItem } from '../ui'

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

export const Test1 = ({ history }) => {
  const { loading, data } = useQuery(GET_GROUP, {
    onError: err => console.log(err),
    onCompleted: data => console.log(data),
    fetchPolicy: 'cache-and-network'
  })
  const client = useApolloClient()

  return (
    <>
      <Button.Group style={{ marginBottom: '1rem' }}>
        <UiButton icon="link" onClick={() => history.push('/test-2')}>
          Go To Cache First
        </UiButton>
        <UiButton icon="delete" onClick={() => client.clearStore()}>
          Reset Cache
        </UiButton>
      </Button.Group>
      {loading && isEmpty(data) ? (
        <UiLoadingCard />
      ) : (
        <UiCard title="Cache And Network">
          <UiListItem label="Group Id">{data.group.groupId}</UiListItem>
          <UiListItem label="Group Name">{data.group.groupName}</UiListItem>
        </UiCard>
      )}
    </>
  )
}

Test1.propTypes = {
  history: PropTypes.object
}
