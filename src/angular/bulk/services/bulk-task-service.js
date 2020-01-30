import angular from 'angular'
import _ from 'lodash'

angular.module('odin.bulk').factory('BulkTaskService', BulkTaskService)

function BulkTaskService() {
  var index = [
    {
      task: 'service.provider.bulk.clone',
      name: 'Clone Enterprise',
      description: 'Clone Enterprise in bulk',
      required: [
        'source.serviceProviderId',
        'destination.serviceProviderId'
      ],
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
    {
      task: 'group.bulk.clone',
      name: 'Clone Group',
      description: 'Clone Group in bulk',
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
            outgoingCallingPlan: 'boolean',
            routingProfile:'boolean'
          }
      }
      ]
    },
    {
      task: 'group.device.tag.modify',
      name: 'Group Device Tag Modify',
      description: 'Group Device Tag Modify',
      required: [
        'serviceProviderId',
        'groupId',
		    'deviceName'
      ],
      example: [
      {
        task: 'group.device.tag.modify',
        serviceProviderId: 'string',
        groupId: 'string',
        deviceName: 'string',
            tags: [
                {
                  tagName: "string",
                    tagValue: "string"
                },
                {
                  tagName: "string",
                    tagValue: "string"
                }
            ]
      }]
  },

  {
    task: 'group.trunk.group',
    name: 'Group Trunk Group',
    description: 'Group Trunk Group',
    required: [
      'serviceProviderId',
      'groupId',
      'name',
      'maxActiveCalls'
    ],
    example: [
      {
        task: "group.trunk.group",
        serviceProviderId: "string",
        groupId: "string",
        name: "string",
        allowTerminationToDtgIdentity: "boolean",
        allowTerminationToTrunkGroupIdentity: "boolean",
        allowUnscreenedCalls: "boolean",
        allowUnscreenedEmergencyCalls: "boolean",
        capacityExceededTrapInitialCalls: "number",
        capacityExceededTrapOffsetCalls: "number",
        clidSourceForScreenedCallsPolicy: "Profile Name Profile Number | Received Name Profile Number | Received Name Received Number",
        continuousOptionsSendingIntervalSeconds: "30",
        enableBursting: "FALSE",
        enableNetworkAddressIdentity: "boolean",
        failureOptionsSendingIntervalSeconds: "10",
        failureThresholdCounter: "number",
        includeDtgIdentity: "boolean",
        includeOtgIdentityForNetworkCalls: "boolean",
        includeTrunkGroupIdentity: "boolean",
        includeTrunkGroupIdentityForNetworkCalls: "boolean",
        invitationTimeout: "number",
        inviteFailureThresholdCounter: "number",
        inviteFailureThresholdWindowSeconds: "30",
        pilotUserCallOptimizationPolicy: "Optimize For User Services | Optimize For High Call Volume",
        pilotUserCallingLineAssertedIdentityPolicy: "All Originating Calls | Unscreened Originating Calls",
        pilotUserCallingLineIdentityForEmergencyCallsPolicy: "No Calls | All Originating Calls | Unscreened Originating Calls",
        pilotUserCallingLineIdentityForExternalCallsPolicy: "No Calls |All Originating Calls | Unscreened Originating Calls",
        pilotUserChargeNumberPolicy: "No Calls | All Originating Calls | Unscreened Originating Calls",
        prefixEnabled: "boolean",
        prefix: "number",
        requireAuthentication: "boolean",
        routeToPeeringDomain: "boolean",
        peeringDomain: "string",
        sendContinuousOptionsMessage: "boolean",
        statefulReroutingEnabled: "boolean",
        successThresholdCounter: "number",
        useSystemCLIDSourceForScreenedCallsPolicy: "boolean",
        useSystemCallingLineAssertedIdentityPolicy: "boolean",
        useSystemUserLookupPolicy: "boolean",
        userLookupPolicy: "Basic | Extended",
        maxActiveCalls: "number",
        maxIncomingCalls: "number",
        maxOutgoingCalls: "number",
        accessDevice: {
          staticRegistrationCapable: "boolean",
          useDomain: "boolean",
          staticLineOrdering: "boolean",
          serviceProviderId: "string",
          groupId: "string",
          deviceName: "string",
          deviceLevel: "System | Service Provider | Group"
        },
        sipAuthenticationUserName: "string",
        sipAuthenticationPassword: "string",
        trunkGroupIdentity: "string@domain",
        otgDtgIdentity: "string"
    }]
  },

    {
      task: 'user.create',
      name: 'Create Users',
      description: 'Create users in bulk',
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
    {
      task: 'user.delete',
      name: 'Delete Users',
      description: 'Delete users in bulk',
      required: ['userId'],
      example: [
        {
          task: 'user.delete',
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
    {
      task: 'user.authentication.update',
      name: 'User SIP Password',
      description: 'Set user SIP passwords',
      required: ['userId', 'userName', 'newPassword'],
      example: [
        {
          task: 'user.authentication.update',
          userId: 'userId',
          userName: 'string',
          newPassword: 'string'
        }
      ]
    },
    {
      task: 'user.sharedcallappearance.update',
      name: 'Shared Call Appearance',
      description: 'Manage Shared Call Appearance Settings and Endpoints',
      required: ['userId'],
      example: [
        {
          task: 'user.sharedcallappearance.update',
          userId: 'userId'
        }
      ]
    },
    {
      task: 'user.ucone.update',
      name: 'UC-One',
      description: 'Manage UC-One Settings and Endpoints',
      required: ['userId'],
      example: [
        {
          task: 'user.ucone.update',
          userId: 'userId'
        }
      ]
    }
  ]

  return { index: index, get: get }

  function get(task) {
    return _.find(index, { task: task })
  }
}
