import angular from 'angular'
import _ from 'lodash'
import template from './index.html'

angular.module('odin.user').component('userServicesDashboard', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<', userId: '<' }
})

controller.$inject = [
  'Alert',
  'UserPermissionService',
  'Module',
  '$q',
  '$window'
]
function controller(Alert, UserPermissionService, Module, $q, $window) {
  var ctrl = this
  ctrl.$onInit = onInit
  ctrl.module = Module
  ctrl.select = select

  // module defaults to serviceName
  // component defaults to camelcase `User ${serviceName}`
  // overrides are listed here
  var allowedServices = {
    'Alternate Numbers': {},
    'Advice Of Charge': {},
    'Anonymous Call Rejection': {},
    'Authentication': {},
    'Automatic Callback': {},
    'Automatic Hold/Retrieve': {},
    'Barge-in Exempt': {},
    'Basic Call Logs': {},
    'BroadWorks Anywhere': {},
    'BroadWorks Mobility': {},
    'Busy Lamp Field': {},
    'Call Center - Basic': {
      component: 'userCallCenter',
      module: 'Call Center'
    },
    'Call Center - Standard': {
      component: 'userCallCenter',
      module: 'Call Center'
    },
    'Call Center - Premium': {
      component: 'userCallCenter',
      module: 'Call Center'
    },
    'Call Forwarding Always': {},
    'Call Forwarding Always Secondary': {},
    'Call Forwarding Busy': {},
    'Call Forwarding No Answer': {},
    'Call Forwarding Not Reachable': {},
    'Call Forwarding Selective': {},
    'Call Notify': {},
    'Call Recording': {},
    'Call Transfer': {},
    'Call Waiting': {},
    'Calling Line ID Delivery Blocking': {},
    'Calling Name Delivery': {},
    'Calling Name Retrieval': {},
    'Calling Number Delivery': {},
    'Collaborate - Audio': {
      component: 'userCollaborate'
    },
    'Connected Line Identification Restriction': {},
    'Directed Call Pickup with Barge-in': {},
    'Directory': {},
    'Do Not Disturb': {},
    'External Calling Line ID Delivery': {},
    'Fax Messaging': {},
    'Flexible Seating Guest': {},
    'Group Night Forwarding': {},
    'Hoteling Guest': {},
    'Hoteling Host': {},
    'Integrated IMP': {},
    'Internal Calling Line ID Delivery': {},
    'Meet-Me Conferencing': {},
    'Music On Hold User': {
      component: 'userMusicOnHold'
    },
    'Outlook Integration': {},
    'Priority Alert': {},
    'Privacy': {},
    'Push to Talk': {},
    'Remote Office': {},
    'Selective Call Acceptance': {},
    'Selective Call Rejection': {},
    'Sequential Ring': {},
    'Shared Call Appearance': {},
    'Shared Call Appearance 5': {
      component: 'userSharedCallAppearance',
      module: 'Shared Call Appearance'
    },
    'Shared Call Appearance 10': {
      component: 'userSharedCallAppearance',
      module: 'Shared Call Appearance'
    },
    'Shared Call Appearance 15': {
      component: 'userSharedCallAppearance',
      module: 'Shared Call Appearance'
    },
    'Shared Call Appearance 20': {
      component: 'userSharedCallAppearance',
      module: 'Shared Call Appearance'
    },
    'Shared Call Appearance 25': {
      component: 'userSharedCallAppearance',
      module: 'Shared Call Appearance'
    },
    'Shared Call Appearance 30': {
      component: 'userSharedCallAppearance',
      module: 'Shared Call Appearance'
    },
    'Shared Call Appearance 35': {
      component: 'userSharedCallAppearance',
      module: 'Shared Call Appearance'
    },
    'Simultaneous Ring Personal': {},
    'Speed Dial 100': {},
    'Voice Messaging User': {
      component: 'userVoiceMessagingDashboard'
    }
  }

  ctrl.columns = [
    {
      key: 'alias',
      label: 'Name'
    },
    {
      key: 'description',
      label: 'Description'
    },
    {
      key: 'isActive',
      label: 'Active',
      type: 'boolean',
      align: 'centered'
    }
  ]

  function onInit() {
    return $q
      .all([loadServices(), Module.load()])
      .then(() => loadServices(false))
      .catch(Alert.notify.danger)
  }

  function select(service) {
    const name = _.get(service, 'serviceName')
    ctrl.selectedService = name
      ? allowedServices[name].component || _.camelCase(`User ${name}`)
      : null
    if (!ctrl.selectedService) loadServices(false)
    $window.scrollTo(0, 0)
  }

  function loadServices(useCache) {
    return UserPermissionService.load(ctrl.userId, useCache).then(
      Permission => {
        const services = Permission.assigned()
          .filter(service => {
            const allowed = allowedServices[service.serviceName]
            return (
              allowed && Permission.read(allowed.module || service.serviceName)
            )
          })
          .map(service => {
            const allowed = allowedServices[service.serviceName]
            const serviceName = allowed.module || service.serviceName
            return {
              ...service,
              alias: Module.alias(serviceName),
              description: Module.description(serviceName),
              isActive: service.isActive === 'true' || service.isActive === true
            }
          })
        // remove dups such as Call Center - Basic and Call Center - Standard
        ctrl.services = _.uniqBy(services, service => {
          const allowed = allowedServices[service.serviceName]
          return allowed.module || service.serviceName
        })
      }
    )
  }
}
