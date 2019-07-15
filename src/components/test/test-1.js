import React from 'react'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Button } from 'rbx'
import { UiLoadingCard, UiButton, UiCard, UiListItem } from '../ui'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { useAlerts } from '@/graphql/alerts'

const GROUP_SHOW = gql`
  query group($serviceProviderId: String!, $groupId: String!) {
    group(serviceProviderId: $serviceProviderId, groupId: $groupId) {
      _id
      groupId
      groupName
    }
  }
`

export const Test1 = ({ history }) => {
  const { alertSuccess, alertDanger } = useAlerts()
  const { loading, data, error } = useQuery(GROUP_SHOW, {
    variables: { serviceProviderId: 'ent.odin', groupId: 'group.odin' },
    onError: alertDanger,
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
        <UiButton icon="add" onClick={() => alertSuccess('Test345')}>
          Add Alert
        </UiButton>
      </Button.Group>
      {(loading && isEmpty(data)) || error ? (
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
