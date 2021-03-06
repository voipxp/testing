import angular from 'angular'
import template from './index.html'

angular.module('odin.group').component('groupDashboard', {
  template,
  controller,
  bindings: { serviceProviderId: '<', groupId: '<' }
})

controller.$inject = [
  'Alert',
  'GroupDashboardService',
  'Route',
  '$location',
  'ACL'
]
function controller(Alert, GroupDashboardService, Route, $location, ACL) {
  var ctrl = this

  ctrl.$onInit = onInit
  ctrl.open = GroupDashboardService.open

  function onInit() {
    ctrl.isAdmin = ACL.has('Service Provider')
    ctrl.loading = true
    $location.hash(null)
    return GroupDashboardService.load(ctrl.serviceProviderId, ctrl.groupId)
      .then(loadCards)
      .catch(Alert.notify.danger)
      .finally(function() {
        ctrl.loading = false
      })
  }

  function loadCards() {
    var _cards = cards()
    _cards.forEach(GroupDashboardService.prepareCard)
    ctrl.cards = _cards
  }

  // always return a new set
  function cards() {
    var route = Route.path('groups', ctrl.serviceProviderId, ctrl.groupId)
    return [
      {
        type: 'management',
        name: 'Announcements',
        version: '20',
        path: route('announcements')
      },
      {
        type: 'management',
        name: 'Bulk Provisioning',
        module: 'Provisioning',
        path: '/bulk',
        policy: 'userProfileRead'
      },
      {
        type: 'management',
        name: 'Business Profile',
        path: route('profile'),
        policy: 'profileRead'
      },
      {
        type: 'management',
        name: 'Calling Plans',
        module: 'Group Calling Plans',
        path: route('callingPlans')
      },
      {
        type: 'management',
        name: 'Users',
        path: route('users')
      },
      {
        type: 'management',
        name: 'Directory',
        path: route('directory')
      },
      {
        type: 'management',
        name: 'Common Phone List',
        path: route('phoneList')
      },
      {
        type: 'management',
        name: 'Custom Directory',
        path: route('customContactDirectories')
      },
      {
        type: 'management',
        name: 'Departments',
        path: route('departments'),
        policy: 'departmentRead'
      },

      {
        type: 'management',
        name: 'Comm Barring Auth Codes',
        path: route('groupCommunicationBarringAuthorizationCodes'),
        module: 'Communication Barring User-Control'
      },
      {
        type: 'management',
        name: 'Group Web Policy',
        module: 'groupWebPolicy',
        path: route('groupWebPolicy'),
        admin: true
      },
      {
        type: 'management',
        name: 'Schedules',
        path: route('schedules')
      },
      {
        type: 'management',
        name: 'Viewable Packs',
        module: 'Viewable Service Packs',
        path: route('viewablePacks')
      },
      {
        type: 'management',
        name: 'Administrators',
        path: route('admins'),
        policy: 'adminRead'
      },
      {
        type: 'management',
        module: 'VDM',
        path: route('vdm')
      },
      {
        type: 'management',
        name: 'Network Class of Service',
        path: route('networkclassofservices')
      },
      {
        type: 'management',
        name: 'Call Processing Policy',
        path: route('callProcessingPolicy'),
        module: 'Group Call Processing Policy'
      },
      {
        type: 'management',
        name: 'Intercept Group',
        path: route('intercept'),
        service: 'Intercept Group'
      },
      {
        type: 'management',
        name: 'Feature Access Codes',
        path: route('featureAccessCodes')
      },
      {
        type: 'management',
        name: 'Comm Barring',
        path: route('groupCommunicationBarring')
      },

      {
        type: 'service',
        service: 'Auto Attendant',
        path: route('autoAttendants')
      },
      {
        type: 'service',
        service: 'Call Center',
        path: route('callCenters')
      },
      {
        type: 'service',
        service: 'Call Park',
        path: route('callPark')
      },
      {
        type: 'service',
        service: 'Call Pickup',
        path: route('callPickup')
      },
      {
        type: 'service',
        service: 'Series Completion',
        path: route('seriesCompletion')
      },{
        type: 'service',
        service: 'Collaborate - Audio',
        name: 'Collaborate',
        path: route('collaborate')
      },
      {
        type: 'service',
        service: 'Hunt Group',
        path: route('huntGroups')
      },
      {
        type: 'service',
        service: 'Music On Hold',
        path: route('musicOnHold')
      },
      {
        type: 'service',
        service: 'Group Night Forwarding',
        path: route('nightForwarding')
      },
      {
        type: 'service',
        service: 'Virtual On-Net Enterprise Extensions',
        path: route('virtualOnNetEnterpriseExtensions')
      },

      {
        type: 'service',
        service: 'Trunk Group',
        name: 'Enterprise Trunk',
        path: route('enterpriseTrunks'),
        isEnterprise: false,
        policy: 'trunkGroupRead'
      },
      {
        type: 'service',
        service: 'Trunk Group',
        path: route('trunkGroups'),
        policy: 'trunkGroupRead'
      },
      {
        type: 'service',
        service: 'Meet-Me Conferencing',
        path: route('meetMe')
      },
      {
        type: 'service',
        service: 'Group Paging',
        path: route('paging')
      },
      {
        type: 'service',
        service: 'Voice Messaging Group',
        path: route('voiceMessaging')
      },
      {
        type: 'service',
        service: 'Flexible Seating Guest',
        name: 'Flexible Seating Hosts',
        path: route('flexibleSeatingHosts')
      },
      {
        type: 'report',
        module: 'User Report',
        path: route('reports', 'users')
      },
      {
        type: 'report',
        module: 'Premium Call Records',
        path: route('callRecords', 'group')
      },
      {
        type: 'report',
        module: 'Premium Call Records',
        name: 'User Call Report',
        path: route('callRecords', 'userCallReport')
      },
      {
        type: 'report',
        module: 'Auto Attendant Report',
        service: 'Auto Attendant',
        path: route('callRecords', 'autoAttendant')
      },
      {
        type: 'report',
        name: 'Numbers',
        path: route('numbers'),
        admin: true
      },
      {
        type: 'report',
        name: 'Call Center Agent Report',
        module: 'Premium Call Records',
        service: 'Call Center',
        path: route('callRecords', 'callCenter')
      },
      {
        type: 'report',
        name: 'User Shared Call Appearances',
        service: 'Shared Call Appearance',
        path: route('sharedCallAppearancesReport')
      },
      {
		    type: 'report',
        name: 'User Push Notification Registration',
        path: route('pushNotificationRegistration')		
	    },
      {
        type: 'provisioning',
        name: 'Assign Numbers',
        path: route('assignNumbers'),
        admin: true
      },
      {
        type: 'provisioning',
        name: 'Devices',
        path: route('devices'),
        admin: true
      },
      {
        type: 'provisioning',
        name: 'Device Configuration',
        path: route('deviceTypes'),
        admin: true
      },
      {
        type: 'provisioning',
        name: 'User Services',
        path: route('services', 'user'),
        admin: true
      },
      {
        type: 'provisioning',
        name: 'Group Services',
        path: route('services', 'group'),
        admin: true
      },
      {
        type: 'provisioning',
        name: 'Service Packs',
        path: route('services', 'servicePack'),
        admin: true
      },
      {
        type: 'provisioning',
        name: 'Delete Group',
        path: route('delete'),
        module: 'Provisioning.delete',
        serviceProviderPolicy: 'groupDelete',
        admin: true
      },
      {
        type: 'provisioning',
        name: 'Group Extension Length',
        path: route('groupExtensionLength'),
        admin: true
      },

      {
        type: 'provisioning',
        name: 'Routing Profile',
        path: route('routingProfile'),
        module: 'Routing Profile',
        provisioning: true
      },
      {
        type: 'user',
        name: 'Outgoing Calling Plans',
        service: 'Outgoing Calling Plan',
        path: route('callingPlans', 'outgoing', 'users')
      },
      {
        type: 'user',
        name: 'Call Forwarding Always',
        service: 'Call Forwarding Always',
        path: route('callForwardingAlways')
      },
      {
        type: 'user',
        name: 'Call Forwarding Busy',
        service: 'Call Forwarding Busy',
        path: route('callForwardingBusy')
      },
      {
        type: 'user',
        name: 'Call Forwarding No Answer',
        service: 'Call Forwarding No Answer',
        path: route('callForwardingNoAnswer')
      },
      {
        type: 'user',
        name: 'Call Forwarding Not Reachable',
        service: 'Call Forwarding Not Reachable',
        path: route('callForwardingNotReachable')
      },
      {
        type: 'user',
        name: 'Calling Line ID Delivery Blocking',
        service: 'Calling Line ID Delivery Blocking',
        path: route('callingLineIdDeliveryBlocking')
      },
      {
        type: 'user',
        name: 'Call Recording',
        service: 'Call Recording',
        path: route('callRecording')
      },
      {
        type: 'user',
        name: 'Hoteling Guest',
        service: 'Hoteling Guest',
        path: route('hotelingGuest')
      },
      {
        type: 'user',
        name: 'Hoteling Host',
        service: 'Hoteling Host',
        path: route('hotelingHost')
      },
      {
        type: 'user',
        name: 'Voice Messaging',
        service: 'Voice Messaging User',
        path: route('voiceMessagingUser')
      },
      {
        type: 'user',
        name: 'Speed Dial 8',
        service: 'Speed Dial 8',
        path: route('speedDial8')
      }
    ]
  }
}
