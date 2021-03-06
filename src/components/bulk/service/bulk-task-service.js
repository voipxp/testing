import _ from 'lodash'

const bulkTaskServices = [
  // Clone Enterprise
  {
    task: 'bulk.sip.trunking',
    name: 'Bulk Sip Trunking',
    description: 'Bulk Sip Trunking',
    required: []
  },
  {
    task: 'bulk.sip.trunking.upload',
    name: 'Bulk Sip Trunking Upload',
    description: 'Bulk Sip Trunking Upload',
    required: []
  },
  {
    task: 'service.provider.bulk.clone',
    name: 'Clone Enterprise',
    description: 'Clone Enterprise in bulk',
    hasLevel: 'Reseller',
    required: ['source.serviceProviderId', 'destination.serviceProviderId'],
    example: [
      {
        task: 'service.provider.bulk.clone',
        source: {
          serviceProviderId: 'string'
        },
        destination: {
          serviceProviderId: 'string'
        },
        options: {
          services: 'boolean',
          servicePacks: 'boolean',
          networkClassOfService: 'boolean',
          enterpriseVoiceVPN: 'boolean',
          callProcessingPolicy: 'boolean'
        }
      }
    ]
  },
  // Clone Group
  {
    task: 'group.bulk.clone',
    name: 'Clone Group',
    description: 'Clone Group in bulk',
    hasLevel: 'Group',
    required: [
      'source.serviceProviderId',
      'source.groupId',
      'destination.serviceProviderId',
      'destination.groupId'
    ],
    example: [
      {
        task: 'group.bulk.clone',
        source: {
          serviceProviderId: 'string',
          groupId: 'string'
        },
        destination: {
          serviceProviderId: 'string',
          groupId: 'string'
        },
        options: {
          featureAccessCode: 'boolean',
          callProcessingPolicy: 'boolean',
          networkClassOfService: 'boolean',
          extensionLength: 'boolean',
          services: 'boolean',
          policy: 'boolean',
          schedule: 'boolean',
          departments: 'boolean',
          domains: 'boolean',
          outgoingCallingPlan: 'boolean',
          routingProfile: 'boolean'
        }
      }
    ]
  },

  // Group Device Tag Modify
  {
    task: 'group.device.tag.modify',
    name: 'Group Device Tag Modify',
    description: 'Group Device Tag Modify',
    hasLevel: 'Group',
    required: ['serviceProviderId', 'groupId', 'deviceName'],
    example: [
      {
        task: 'group.device.tag.modify',
        serviceProviderId: 'string',
        groupId: 'string',
        deviceName: 'string',
        rebuildDevice: 'boolean',
        resetDevice: 'boolean',
        tags: [
          {
            tagName: 'string',
            tagValue: 'string'
          },
          {
            tagName: 'string',
            tagValue: 'string'
          }
        ]
      }
    ]
  },
  {
    task: 'trunk.group.call.capacity',
    name: 'Trunk Group Call Capacity',
    description: 'Trunk Group Call Capacity',
    hasLevel: 'Service Provider',
    required: ['serviceProviderId'],
    example: [
      {
        'task': 'trunk.group.call.capacity',
        'serviceProviderId': 'string',
        'groupId': 'string',
        'serviceProvider.maxActiveCalls': 'number',
        'serviceProvider.burstingMaxActiveCalls': 'number',
        'group.maxActiveCalls': 'number',
        'group.burstingMaxActiveCalls': 'number'
      }
    ]
  },
  {
    task: 'group.services.update',
    name: 'Group Services Update',
    description: 'Group Services Update',
    hasLevel: 'Group',
    required: ['serviceProviderId', 'groupId'],
    example: [
      {
        task: 'group.services.update',
        serviceProviderId: 'string',
        groupId: 'string',
        userServices: [
          {
            serviceName: 'string',
            authorized: 'boolean',
            assigned: 'boolean',
            quantity: 'number',
            licensed: 'boolean',
            userAssignable: 'boolean',
            isUnlimited: 'boolean'
          }
        ],
        groupServices: [
          {
            tagName: 'string',
            tagValue: 'string'
          },
          {
            tagName: 'string',
            tagValue: 'string'
          }
        ]
      }
    ]
  },
  // Group Dns Assign
  {
    task: 'group.dns.assign',
    name: 'Group DNs Assign',
    description: 'Group DNs Assign',
    hasLevel: 'Reseller',
    required: ['serviceProviderId', 'groupId'],
    example: [
      {
        task: 'group.dns.assign',
        serviceProviderId: 'string',
        groupId: 'string',
        dns: [
          {
            min: 'number',
            max: 'number'
          },
          {
            min: 'number'
          }
        ]
      }
    ]
  },
  // Group Dns Unassign
  {
    task: 'group.dns.unassign',
    name: 'Group DNs UnAssign',
    description: 'Group DNs UnAssign',
    hasLevel: 'Reseller',
    required: ['serviceProviderId', 'groupId'],
    example: [
      {
        task: 'group.dns.unassign',
        serviceProviderId: 'string',
        groupId: 'string',
        dns: [
          {
            min: 'number',
            max: 'number'
          },
          {
            min: 'number'
          }
        ]
      }
    ]
  },
  // group services update
  {
    task: 'group.services.update',
    name: 'Group Services Update',
    description: 'Group Services Update',
    required: ['serviceProviderId', 'groupId'],
    example: [
      {
        task: 'group.services.update',
        serviceProviderId: 'string',
        groupId: 'string',
        userServices: [
          {
            serviceName: 'string',
            authorized: 'boolean',
            assigned: 'boolean',
            quantity: 'number',
            licensed: 'boolean',
            userAssignable: 'boolean',
            isUnlimited: 'boolean'
          }
        ],
        groupServices: [
          {
            serviceName: 'string',
            authorized: 'boolean',
            assigned: 'boolean',
            quantity: 'number',
            licensed: 'boolean',
            userAssignable: 'boolean',
            isUnlimited: 'boolean'
          }
        ],
        servicePackServices: [
          {
            serviceName: 'string',
            authorized: 'boolean',
            assigned: 'boolean',
            quantity: 'number',
            licensed: 'boolean',
            userAssignable: 'boolean',
            isUnlimited: 'boolean'
          }
        ]
      }
    ]
  },

  // Delete this when testing is complete
  {
    task: 'enterprise.trunk.enterprise',
    name: 'enterprise Trunk enterprise',
    description: 'Enterprise Trunk enterprise',
    required: ['name', 'serviceProviderId']
  },

  {
    task: 'group.trunk.group.create',
    name: 'Group Trunk Group',
    description: 'Group Trunk Group',
    required: ['serviceProviderId', 'groupId', 'name', 'maxActiveCalls'],
    example: [
      {
        task: 'group.trunk.group.create',
        serviceProviderId: 'string',
        groupId: 'string',
        name: 'string',
        allowTerminationToDtgIdentity: 'boolean',
        allowTerminationToTrunkGroupIdentity: 'boolean',
        allowUnscreenedCalls: 'boolean',
        allowUnscreenedEmergencyCalls: 'boolean',
        capacityExceededTrapInitialCalls: 'number',
        capacityExceededTrapOffsetCalls: 'number',
        clidSourceForScreenedCallsPolicy:
          'Profile Name Profile Number | Received Name Profile Number | Received Name Received Number',
        continuousOptionsSendingIntervalSeconds: '30',
        enableBursting: 'FALSE',
        enableNetworkAddressIdentity: 'boolean',
        failureOptionsSendingIntervalSeconds: '10',
        failureThresholdCounter: 'number',
        includeDtgIdentity: 'boolean',
        includeOtgIdentityForNetworkCalls: 'boolean',
        includeTrunkGroupIdentity: 'boolean',
        includeTrunkGroupIdentityForNetworkCalls: 'boolean',
        invitationTimeout: 'number',
        inviteFailureThresholdCounter: 'number',
        inviteFailureThresholdWindowSeconds: '30',
        pilotUserCallOptimizationPolicy:
          'Optimize For User Services | Optimize For High Call Volume',
        pilotUserCallingLineAssertedIdentityPolicy:
          'All Originating Calls | Unscreened Originating Calls',
        pilotUserCallingLineIdentityForEmergencyCallsPolicy:
          'No Calls | All Originating Calls | Unscreened Originating Calls',
        pilotUserCallingLineIdentityForExternalCallsPolicy:
          'No Calls |All Originating Calls | Unscreened Originating Calls',
        pilotUserChargeNumberPolicy:
          'No Calls | All Originating Calls | Unscreened Originating Calls',
        prefixEnabled: 'boolean',
        prefix: 'number',
        requireAuthentication: 'boolean',
        routeToPeeringDomain: 'boolean',
        peeringDomain: 'string',
        sendContinuousOptionsMessage: 'boolean',
        statefulReroutingEnabled: 'boolean',
        successThresholdCounter: 'number',
        useSystemCLIDSourceForScreenedCallsPolicy: 'boolean',
        useSystemCallingLineAssertedIdentityPolicy: 'boolean',
        useSystemUserLookupPolicy: 'boolean',
        userLookupPolicy: 'Basic | Extended',
        maxActiveCalls: 'number',
        maxIncomingCalls: 'number',
        maxOutgoingCalls: 'number',
        accessDevice: {
          staticRegistrationCapable: 'boolean',
          useDomain: 'boolean',
          staticLineOrdering: 'boolean',
          serviceProviderId: 'string',
          groupId: 'string',
          deviceName: 'string',
          deviceLevel: 'System | Service Provider | Group'
        },
        sipAuthenticationUserName: 'string',
        sipAuthenticationPassword: 'string',
        trunkGroupIdentity: 'string@domain',
        otgDtgIdentity: 'string'
      }
    ]
  },

  {
    task: 'group.trunk.group.update',
    name: 'Group Trunk Group Update',
    description: 'Group Trunk Group Update',
    required: ['serviceProviderId', 'groupId', 'name'],
    example: [
      {
        task: 'group.trunk.group.update',
        pilotUserId: 'string',
        department: {
          serviceProviderId: 'string',
          groupId: 'string',
          name: 'string'
        },
        accessDevice: {
          deviceLevel: 'string',
          deviceName: 'string'
        },
        maxActiveCalls: 'number',
        maxIncomingCalls: 'number',
        maxOutgoingCalls: 'number',
        enableBursting: 'boolean',
        capacityExceededTrapInitialCalls: 'number',
        capacityExceededTrapOffsetCalls: 'number',
        invitationTimeout: 'number',
        requireAuthentication: 'boolean',
        sipAuthenticationUserName: 'string',
        trunkGroupIdentity: 'string',
        allowTerminationToTrunkGroupIdentity: 'boolean',
        allowTerminationToDtgIdentity: 'boolean',
        includeTrunkGroupIdentity: 'boolean',
        includeDtgIdentity: 'boolean',
        includeTrunkGroupIdentityForNetworkCalls: 'boolean',
        includeOtgIdentityForNetworkCalls: 'boolean',
        enableNetworkAddressIdentity: 'boolean',
        allowUnscreenedCalls: 'boolean',
        allowUnscreenedEmergencyCalls: 'boolean',
        pilotUserCallingLineIdentityForExternalCallsPolicy: 'No Calls',
        pilotUserChargeNumberPolicy: 'No Calls',
        routeToPeeringDomain: 'boolean',
        prefixEnabled: 'boolean',
        statefulReroutingEnabled: 'boolean',
        sendContinuousOptionsMessage: 'boolean',
        continuousOptionsSendingIntervalSeconds: 'number',
        failureOptionsSendingIntervalSeconds: 'number',
        failureThresholdCounter: 'number',
        successThresholdCounter: 'number',
        inviteFailureThresholdCounter: 'number',
        inviteFailureThresholdWindowSeconds: 'number',
        trunkGroupState: 'Available',
        pilotUserCallingLineAssertedIdentityPolicy:
          'Unscreened Originating Calls',
        useSystemCallingLineAssertedIdentityPolicy: 'boolean',
        totalActiveIncomingCalls: 'number',
        totalActiveOutgoingCalls: 'number',
        pilotUserCallOptimizationPolicy: 'Optimize For User Services',
        clidSourceForScreenedCallsPolicy: 'Profile Name Profile Number',
        useSystemCLIDSourceForScreenedCallsPolicy: 'boolean',
        userLookupPolicy: 'Basic',
        useSystemUserLookupPolicy: 'boolean',
        pilotUserCallingLineIdentityForEmergencyCallsPolicy: 'No Calls',
        implicitRegistrationSetSupportPolicy: 'Disabled',
        useSystemImplicitRegistrationSetSupportPolicy: 'boolean',
        sipIdentityForPilotAndProxyTrunkModesPolicy: 'User',
        useSystemSIPIdentityForPilotAndProxyTrunkModesPolicy: 'boolean',
        useSystemSupportConnectedIdentityPolicy: 'boolean',
        supportConnectedIdentityPolicy: 'Disabled',
        useSystemOptionsMessageResponseStatusCodes: 'boolean',
        serviceProviderId: 'string',
        groupId: 'string',
        name: 'string'
      }
    ]
  },
  /* Group Device */
  {
    task: 'group.device.upsert',
    name: 'Group Device Upsert',
    description: 'Group Device Insert and/or Update',
    required: ['serviceProviderId', 'groupId', 'deviceType', 'deviceName'],
    example: [
      {
        task: 'group.device.upsert',
        allowAccessDeviceUpdate: 'boolean',
        deviceLevel: 'string',
        serviceProviderId: 'string',
        groupId: 'string',
        deviceName: 'string',
        deviceType: 'string',
        protocol: 'string',
        netAddress: 'IP_ADDRESS',
        port: 'number',
        outboundProxyServerNetAddress: 'IP_ADDRESS',
        stunServerNetAddress: 'IP_ADDRESS',
        macAddress: 'HEXA_DECIMAL',
        serialNumber: 'number',
        description: 'string',
        physicalLocation: 'string',
        transportProtocol: 'string',
        mobilityManagerProvisioningURL: 'string',
        mobilityManagerProvisioningUserName: 'string',
        mobilityManagerProvisioningPassword: 'string',
        mobilityManagerDefaultOriginatingServiceKey: 'string',
        mobilityManagerDefaultTerminatingServiceKey: 'string',
        useCustomUserNamePassword: 'boolean',
        accessDeviceCredentials: {
          userName: 'string',
          password: 'string'
        },
        rebuildDevice: 'boolean',
        resetDevice: 'boolean'
      }
    ]
  },
  {
    task: 'group.device.create',
    name: 'Group Device Create',
    description: 'Group Device Create',
    required: ['deviceType', 'deviceName'],
    example: [
      {
        task: 'group.device.create',
        serviceProviderId: 'string',
        groupId: 'string',
        allowAccessDeviceUpdate: 'boolean',
        deviceType: 'string',
        deviceName: 'string',
        accessDeviceEndpoint: {
          linePort: 'string',
          accessDevice: {
            deviceType: 'string',
            deviceName: 'string',
            deviceLevel: 'string',
            protocol: 'string',
            netAddress: 'string',
            port: 'string',
            outboundProxyServerNetAddress: 'string',
            stunServerNetAddress: 'string',
            macAddress: 'string',
            serialNumber: 'string',
            description: 'string',
            physicalLocation: 'string',
            transportProtocol: 'string',
            useCustomUserNamePassword: 'string',
            accessDeviceCredentials: {
              userName: 'string',
              password: 'string'
            }
          }
        }
      }
    ]
  },
  // User Create
  {
    task: 'user.create',
    name: 'User Create',
    description: 'Create Users in bulk',
    required: [
      'serviceProviderId',
      'groupId',
      'userId',
      'lastName',
      'firstName',
      'callingLineIdLastName',
      'callingLineIdFirstName',
      'password'
    ],
    example: [
      {
        task: 'user.create',
        serviceProviderId: 'string',
        groupId: 'string',
        userId: 'string',
        lastName: 'string',
        firstName: 'string',
        callingLineIdLastName: 'string',
        callingLineIdFirstName: 'string',
        password: 'string',
        phoneNumber: 'string',
        activatePhoneNumber: 'true|false',
        extension: 'string',
        callingLineIdPhoneNumber: 'string',
        timeZone: 'string',
        language: 'string',
        networkClassOfService: 'string',
        mobilePhoneNumber: 'string',
        pagerPhoneNumber: 'string',
        emailAddress: 'string',
        addressLocation: 'string',
        department: {
          serviceProviderId: 'string',
          groupId: 'string',
          name: 'string'
        },
        address: {
          addressLine1: 'string',
          addressLine2: 'string',
          city: 'string',
          stateOrProvince: 'string',
          zipOrPostalCode: 'string',
          country: 'string'
        },
        domain: 'string',
        endpointType: 'none|accessDeviceEndpoint|trunkAddressing',
        allowAccessDeviceUpdate: 'false',
        accessDeviceEndpoint: {
          linePort: 'string',
          accessDevice: {
            deviceType: 'string',
            deviceName: 'string',
            deviceLevel: 'string',
            protocol: 'string',
            netAddress: 'string',
            port: 'string',
            outboundProxyServerNetAddress: 'string',
            stunServerNetAddress: 'string',
            macAddress: 'string',
            serialNumber: 'string',
            description: 'string',
            physicalLocation: 'string',
            transportProtocol: 'string',
            useCustomUserNamePassword: 'boolean',
            accessDeviceCredentials: {
              userName: 'string',
              password: 'string'
            }
          }
        },
        trunkAddressing: {
          enterpriseTrunkName: 'string',
          trunkGroupDeviceEndpoint: {
            name: 'string',
            linePort: 'string'
          }
        }
      }
    ]
  },
  // User Delete
  {
    task: 'user.delete',
    name: 'User Delete',
    description: 'Delete Users in bulk',
    required: ['userId'],
    example: [
      {
        task: 'user.delete',
        userId: 'userId'
      }
    ]
  },
  // User Numbers
  {
    task: 'user.number.update',
    name: 'User Numbers',
    description: 'Assign numbers to users',
    required: ['userId'],
    example: [
      {
        task: 'user.number.update',
        userId: 'userId'
      }
    ]
  },
  // User Password Update
  {
    task: 'user.password.update',
    name: 'User Password Update',
    description: 'Set User Password Update',
    required: ['userId', 'newPassword'],
    example: [
      {
        task: 'user.password.update',
        userId: 'userId',
        newPassword: 'string'
      }
    ]
  },
  // User Shared Call Appearance
  {
    task: 'user.sharedcallappearance.update',
    name: 'User Shared Call Appearance',
    description: 'Manage Shared Call Appearance Settings and Endpoints',
    required: ['userId'],
    example: [
      {
        task: 'user.sharedcallappearance.update',
        userId: 'userId'
      }
    ]
  },

  // {
  //   task: 'user.move',
  //   name: 'Move Users',
  //   description: 'Move users in bulk',
  //   required: ['userId'],
  //   example: [
  //     {
  //       task: 'user.move',
  //       userId: 'userId'
  //     }
  //   ]
  // },
  // User Services
  {
    task: 'user.services.update',
    name: 'User Services',
    description: 'Add, Remove, or Replace User Services and Service Packs',
    required: ['userId'],
    example: [
      {
        task: 'user.services.update',
        userId: 'userId',
        userServices: [
          {
            serviceName: 'UserServiceAdd',
            assigned: true
          },
          {
            serviceName: 'UserServiceRemove',
            assigned: false
          }
        ],
        servicePackServices: [
          {
            serviceName: 'ServicePackAdd',
            assigned: true
          },
          {
            serviceName: 'ServicePackRemove',
            assigned: false
          }
        ]
      }
    ]
  },
  // User SIP Authentication Password
  {
    task: 'user.authentication.update',
    name: 'User SIP Authentication Password',
    description: 'Set user SIP passwords',
    required: ['userId', 'userName', 'newPassword'],
    example: [
      {
        task: 'user.authentication.update',
        userId: 'userId',
        userName: 'string',
        newPassword: 'string',
        resetDevice: 'boolean',
        rebuildDevice: 'boolean'
      }
    ]
  },
  // User UC-One
  {
    task: 'user.ucone.update',
    name: 'User UC-One',
    description: 'Manage UC-One Settings and Endpoints',
    required: ['userId'],
    example: [
      {
        task: 'user.ucone.update',
        userId: 'userId'
      }
    ]
  },
  // User Passwords Update
  {
    task: 'user.passwords.update',
    name: 'User Passwords Update',
    description:
      'Manage User Password, Passcode, AuthenticationPassword, Rebuild and Reset Device ',
    required: ['userId', 'newPassword', 'newPasscode', 'userName', 'newAuthenticationPassword'],
    example: [
      {
        task: 'user.passwords.update',
        userId: 'userId',
        newPassword: 'string',
        newPasscode: 'string',
        userName: 'string',
        newAuthenticationPassword: 'string',
        rebuildDevice: 'boolean',
        resetDevice: 'boolean'
      }
    ]
  },
  //user portal passcode
  {
    task: 'user.portal.passcode.update',
    name: 'User Portal Passcode Update',
    description:
      'Manage User Portal Passcode',
    required: ['userId', 'passcode'],
    example: [
      {
        task: '',
        userId: 'userId',
        passcode: 'string',
      }
    ]
  }
]

const get = task => {
  return _.find(bulkTaskServices, { task: task })
}

export const BulkTaskService = {
  bulkTaskServices: bulkTaskServices,
  getTaskDetails: get
}
