;(function() {
  function acl(type) {
    return function(ACL) {
      'ngInject'
      return ACL.allow(type)
    }
  }
  function module(name) {
    return function(Module) {
      'ngInject'
      return Module.allow(name)
    }
  }
  function path() {
    var prefixes = Array.prototype.slice.call(arguments)
    prefixes.unshift('/groups/:serviceProviderId/:groupId')
    return prefixes.join('/')
  }

  angular.module('odin.group', [])
  angular.module('odin.group').config(function routeConfig($routeProvider) {
    $routeProvider
      .when(path(), {
        template: '<group-dashboard></group-dashboard>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('profile'), {
        template: '<group-profile></group-profile>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('admins'), {
        template: '<group-admins></group-admins>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('devices'), {
        template: '<group-devices></group-devices>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('directory'), {
        template: '<group-phone-directory></group-phone-directory>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('users'), {
        template: '<group-users></group-users>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('announcements'), {
        template: '<group-announcements></group-announcements>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('announcements/:name*/:mediaType'), {
        template: '<group-announcement></group-announcement>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('callingPlans'), {
        template: '<group-calling-plans></group-calling-plans>',
        resolve: {
          acl: acl('Group'),
          module: module('Group Calling Plans')
        }
      })
      .when(path('callingPlans/incoming'), {
        template: '<group-incoming-calling-plan></group-incoming-calling-plan>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('callingPlans/outgoing'), {
        template: '<group-outgoing-calling-plan></group-outgoing-calling-plan>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('callingPlans/outgoing/users'), {
        template:
          '<group-outgoing-calling-plan-users></group-outgoing-calling-plan-users>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('callingPlans/digitPlan'), {
        template:
          '<group-outgoing-calling-plan-digit-plan></group-outgoing-calling-plan-digit-plan>',
        resolve: {
          acl: acl('Group')
        },
        reloadOnSearch: false
      })
      .when(path('callingPlans/pinholeDigitPlan'), {
        template:
          '<group-outgoing-calling-plan-pinhole-digit-plan></group-outgoing-calling-plan-pinhole-digit-plan>',
        resolve: {
          acl: acl('Group')
        },
        reloadOnSearch: false
      })
      .when(path('callingPlans/codes'), {
        template:
          '<group-outgoing-calling-plan-authorization-codes></group-outgoing-calling-plan-authorization-codes>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('callingPlans/transfer'), {
        template:
          '<group-outgoing-calling-plan-transfer-numbers></group-outgoing-calling-plan-transfer-numbers>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('callingPlans/digitPatterns'), {
        template:
          '<group-calling-plan-digit-patterns></group-calling-plan-digit-patterns>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('callingPlans/pinholeDigitPatterns'), {
        template:
          '<group-outgoing-calling-plan-pinhole-digit-patterns></group-outgoing-calling-plan-pinhole-digit-patterns>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('collaborate'), {
        template: '<group-collaborate></group-collaborate>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('collaborate/:serviceUserId'), {
        template: '<group-collaborate-instance></group-collaborate-instance>',
        resolve: {
          acl: acl('Group')
        },
        reloadOnSearch: false
      })
      .when(path('anonymousCallRejection'), {
        template:
          '<group-anonymous-call-rejection></group-anonymous-call-rejection>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('automaticCallback'), {
        template: '<group-automatic-callback></group-automatic-callback>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('callForwardingAlways'), {
        template:
          '<group-call-forwarding-always></group-call-forwarding-always>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('callForwardingBusy'), {
        template: '<group-call-forwarding-busy></group-call-forwarding-busy>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('callForwardingNoAnswer'), {
        template:
          '<group-call-forwarding-no-answer></group-call-forwarding-no-answer>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('callForwardingNotReachable'), {
        template:
          '<group-call-forwarding-not-reachable></group-call-forwarding-not-reachable>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('callingLineIdDeliveryBlocking'), {
        template:
          '<group-calling-line-id-delivery-blocking></group-calling-line-id-delivery-blocking>',
        resolve: {
          acl: acl('Group')
        }
      })

      .when(path('departments'), {
        template: '<group-departments></group-departments>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('departments/:name'), {
        template: '<group-department></group-department>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('groupCommunicationBarringAuthorizationCodes'), {
        template:
          '<group-communication-barring-authorization-codes></group-communication-barring-authorization-codes>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('customContactDirectories'), {
        template:
          '<group-custom-contact-directories></group-custom-contact-directories>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('autoAttendants'), {
        template:
          '<auto-attendants module="$resolve.module"></auto-attendants>',
        resolve: {
          acl: acl('Group'),
          module: module('Auto Attendant')
        }
      })
      .when(path('autoAttendants/:serviceUserId'), {
        template: '<auto-attendant module="$resolve.module"></auto-attendant>',
        resolve: {
          acl: acl('Group'),
          module: module('Auto Attendant')
        }
      })
      .when(path('autoAttendants/:serviceUserId/submenus'), {
        template:
          '<group-auto-attendant-submenus-index module="$resolve.module"></group-auto-attendant-submenus-index>',
        resolve: {
          acl: acl('Group'),
          module: module('Auto Attendant')
        }
      })
      .when(path('autoAttendants/:serviceUserId/submenus/:submenuId'), {
        template:
          '<group-auto-attendant-submenu module="$resolve.module"></group-auto-attendant-submenu>',
        resolve: {
          acl: acl('Group'),
          module: module('Auto Attendant')
        }
      })
      .when(path('callPickup'), {
        template:
          '<group-call-pickups module="$resolve.module"></group-call-pickups>',
        resolve: {
          acl: acl('Group'),
          module: module('Call Pickup')
        }
      })
      .when(path('callPickup/:name'), {
        template:
          '<group-call-pickup module="$resolve.module"></group-call-pickup>',
        resolve: {
          acl: acl('Group'),
          module: module('Call Pickup')
        }
      })
      .when(path('callPark'), {
        template:
          '<group-call-park module="$resolve.module"></group-call-park>',
        resolve: {
          acl: acl('Group'),
          module: module('Call Park')
        }
      })
      .when(path('callPark/:name'), {
        template:
          '<group-call-park-group module="$resolve.module"></group-call-park-group>',
        resolve: {
          acl: acl('Group'),
          module: module('Call Park')
        }
      })
      .when(path('enterpriseTrunks'), {
        template:
          '<group-enterprise-trunks module="$resolve.module"></group-enterprise-trunks>',
        resolve: {
          acl: acl('Group'),
          module: module('Trunk Group')
        }
      })
      .when(path('enterpriseTrunks/:trunkName'), {
        template:
          '<group-enterprise-trunk module="$resolve.module"></group-enterprise-trunk>',
        resolve: {
          acl: acl('Group'),
          module: module('Trunk Group')
        },
        reloadOnSearch: false
      })
      .when(path('trunkGroups'), {
        template:
          '<group-trunk-groups module="$resolve.module"></group-trunk-groups>',
        resolve: {
          acl: acl('Group'),
          module: module('Trunk Group')
        }
      })
      .when(path('trunkGroups/:trunkName'), {
        template:
          '<group-trunk-group module="$resolve.module"></group-trunk-group>',
        resolve: {
          acl: acl('Group'),
          module: module('Trunk Group')
        },
        reloadOnSearch: false
      })
      .when(path('paging'), {
        template:
          '<group-paging-groups module="$resolve.module"></group-paging-groups>',
        resolve: {
          acl: acl('Group'),
          module: module('Group Paging')
        }
      })
      .when(path('paging/:serviceUserId'), {
        template:
          '<group-paging-group module="$resolve.module"></group-paging-group>',
        resolve: {
          acl: acl('Group'),
          module: module('Group Paging')
        },
        reloadOnSearch: false
      })
      .when(path('huntGroups'), {
        template:
          '<group-hunt-groups module="$resolve.module"></group-hunt-groups>',
        resolve: {
          acl: acl('Group'),
          module: module('Hunt Group')
        }
      })
      .when(path('huntGroups/:serviceUserId'), {
        template:
          '<group-hunt-group module="$resolve.module"></group-hunt-group>',
        resolve: {
          acl: acl('Group'),
          module: module('Hunt Group')
        }
      })
      .when(path('meetMe'), {
        template: '<group-meet-me module="$resolve.module"></group-meet-me>',
        resolve: {
          acl: acl('Group'),
          module: module('Meet-Me Conferencing')
        }
      })
      .when(path('meetMe/:serviceUserId'), {
        template: '<meet-me-bridge module="$resolve.module"></meet-me-bridge>',
        resolve: {
          acl: acl('Group'),
          module: module('Meet-Me Conferencing')
        },
        reloadOnSearch: false
      })
      .when(path('musicOnHold'), {
        template:
          '<group-music-on-hold-index module="$resolve.module"></group-music-on-hold-index>',
        resolve: {
          acl: acl('Group'),
          module: module('Music On Hold')
        }
      })
      .when(path('musicOnHold/:departmentId'), {
        template:
          '<group-music-on-hold module="$resolve.module"></group-music-on-hold>',
        resolve: {
          acl: acl('Group'),
          module: module('Music On Hold')
        },
        reloadOnSearch: false
      })
      .when(path('voiceMessaging'), {
        template:
          '<group-voice-messaging module="$resolve.module"></group-voice-messaging>',
        resolve: {
          acl: acl('Group'),
          module: module('Voice Messaging Group')
        }
      })
      .when(path('callRecords/autoAttendant'), {
        template:
          '<auto-attendant-call-records module="$resolve.module"></auto-attendant-call-records>',
        resolve: {
          acl: acl('Group'),
          module: module('Auto Attendant Report')
        },
        reloadOnSearch: false
      })
      .when(path('callRecords/group'), {
        template:
          '<group-call-record-dashboard module="$resolve.module"></group-call-record-dashboard>',
        resolve: {
          acl: acl('Group'),
          module: module('Premium Call Records')
        }
      })
      .when(path('callRecords/group/:startTime/:endTime'), {
        template:
          '<group-call-record-search module="$resolve.module"></group-call-record-search>',
        resolve: {
          acl: acl('Group'),
          module: module('Premium Call Records')
        },
        reloadOnSearch: false
      })
      .when(path('reports/users'), {
        template: '<users-report module="$resolve.module"></users-report>',
        resolve: {
          acl: acl('Group'),
          module: module('User Report')
        }
      })
      .when(path('callCenters'), {
        template:
          '<group-call-centers module="$resolve.module"></group-call-centers>',
        resolve: {
          acl: acl('Group'),
          module: module('Call Center')
        }
      })
      .when(path('callCenters/:serviceUserId'), {
        template:
          '<group-call-center module="$resolve.module"></group-call-center>',
        resolve: {
          acl: acl('Group'),
          module: module('Call Center')
        },
        reloadOnSearch: false
      })
      .when(path('callCenters/:serviceUserId/:dnisId'), {
        template:
          '<group-call-center-dnis-instance module="$resolve.module"></group-call-center-dnis-instance>',
        resolve: {
          acl: acl('Group'),
          module: module('Call Center')
        },
        reloadOnSearch: false
      })
      .when(path('schedules'), {
        template: '<group-schedules></group-schedules>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('schedules/:scheduleName/:scheduleType'), {
        template: '<group-schedule></group-schedule>',
        resolve: {
          acl: acl('Group')
        }
      })
      .when(path('viewablePacks'), {
        template: '<group-viewable-packs-index></group-viewable-packs-index>',
        resolve: {
          acl: acl('Group'),
          module: module('Viewable Service Packs')
        }
      })
      .when(path('services/group'), {
        template:
          '<group-services service-type="groupServices"></group-services>',
        resolve: {
          acl: acl('Service Provider')
        }
      })
      .when(path('services/user'), {
        template:
          '<group-services service-type="userServices"></group-services>',
        resolve: {
          acl: acl('Service Provider')
        }
      })
      .when(path('services/servicePack'), {
        template:
          '<group-services service-type="servicePackServices"></group-services>',
        resolve: {
          acl: acl('Service Provider')
        }
      })
      .when(path('numbers'), {
        template: '<group-numbers></group-numbers>',
        resolve: {
          acl: acl('Service Provider')
        }
      })
      .when(path('delete'), {
        template: '<group-delete></group-delete>',
        resolve: {
          acl: acl('Service Provider')
        }
      })
      .when(path('networkclassofservices'), {
        template:
          '<group-network-class-of-services></group-network-class-of-services>',
        resolve: {
          acl: acl('Group')
        }
      })
  })
})()
