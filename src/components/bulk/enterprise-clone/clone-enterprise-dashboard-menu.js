import React from 'react'

import BulkSelectServiceProviderId from '../bulk-select-service-provider-id'
import NewServiceProviderName from '../new-service-provider-name'
//import CloneServiceProvider from '../clone-enterprise-bulk'

export const menu = [
  {
    //path: 'clone-service-provider',
    name: 'Clone Service Provider',
    component: NewServiceProviderName,
    active: true,
    isRequired: false
    // isDisabled: true
  },
  {
    // path: 'new-service-provider-id',
    name: 'New Service Provider Id',
    component: BulkSelectServiceProviderId,
    isRequired: false
    // isDisabled: true
  },
  {
    // path: 'new-service-provider-name',
    name: 'New Service Provider Name',
    component: NewServiceProviderName,
    isRequired: false
    // isDisabled: true
  }
]
