import React from 'react'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Button } from 'rbx'
import { UiLoadingCard, UiButton, UiCard, UiCheckbox, UiListItem } from '../ui'

import { useQuery, useApolloClient } from '@apollo/react-hooks'

const GET_SERVICE_PROVIDERS = gql`
  query getServiceProviders {
    serviceProvider(serviceProviderId: "odin_test") {
      _id
      serviceProviderId
      serviceProviderName
      isEnterprise
    }
  }
`

export const Test1 = ({ history }) => {
  const { loading, data } = useQuery(GET_SERVICE_PROVIDERS, {
    fetchPolicy: 'cache-and-network'
  })
  const client = useApolloClient()

  return (
    <>
      <Button.Group style={{ marginBottom: '1rem' }}>
        <UiButton icon="link" onClick={() => history.push('/test-2')}>
          Go To Page 2
        </UiButton>
        <UiButton icon="delete" onClick={() => client.clearStore()}>
          Reset Cache
        </UiButton>
      </Button.Group>
      {loading && isEmpty(data) ? (
        <UiLoadingCard />
      ) : (
        <UiCard title="Test 1 Page (cache-and-network)">
          <UiListItem label="Service Provider Id">
            {data.serviceProvider.serviceProviderId}
          </UiListItem>
          <UiListItem label="Service Provider Name">
            {data.serviceProvider.serviceProviderName}
          </UiListItem>
          <UiListItem label="Enterprise">
            <UiCheckbox isChecked={data.serviceProvider.isEnterprise} />
          </UiListItem>
        </UiCard>
      )}
    </>
  )
}

Test1.propTypes = {
  history: PropTypes.object
}
