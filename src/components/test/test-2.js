import React from 'react'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { UiLoadingCard, UiButton, UiCard, UiCheckbox, UiListItem } from '../ui'
import { Button } from 'rbx'
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

export const Test2 = ({ history }) => {
  const { loading, data } = useQuery(GET_SERVICE_PROVIDERS, {
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

Test2.propTypes = {
  history: PropTypes.object
}
