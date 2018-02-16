;(function() {
  angular.module('odin.vdm').factory('VdmTemplateTagService', Service)

  function Service() {
    var ldapTags = [
      {
        name: '%LDAP_ENABLE%',
        label: 'LDAP Enabled',
        default: '0',
        type: 'checkbox'
      },
      {
        name: '%LDAP_VERSION%',
        label: 'LDAP Version',
        default: '3',
        type: 'select',
        options: ['2', '3']
      },
      {
        name: '%LDAP_HOST%',
        label: 'LDAP Host',
        type: 'text'
      },
      {
        name: '%LDAP_PORT%',
        label: 'LDAP Port',
        type: 'number',
        default: '389',
        min: 0,
        max: 65535
      },
      {
        name: '%LDAP_BASE%',
        label: 'LDAP Base DN',
        type: 'text'
      },
      {
        name: '%LDAP_USER%',
        label: 'LDAP User',
        type: 'text'
      },
      {
        name: '%LDAP_PASSWORD%',
        label: 'LDAP Password',
        type: 'password'
      },
      {
        name: '%LDAP_NAME_FILTER%',
        label: 'Name Filter',
        type: 'text'
      },
      {
        name: '%LDAP_NUMBER_FILTER%',
        label: 'Number Filter',
        type: 'text'
      },
      {
        name: '%LDAP_MAX_HITS%',
        label: 'Max Hits',
        type: 'number',
        default: '50',
        min: 1,
        max: 32000
      },
      {
        name: '%LDAP_NAME_ATTR%',
        label: 'Name Attribute',
        type: 'text'
      },
      {
        name: '%LDAP_NUMB_ATTR%',
        label: 'Number Attribute',
        type: 'text'
      },
      {
        name: '%LDAP_DISPLAY_NAME%',
        label: 'Display Name',
        type: 'text'
      },

      {
        name: '%LDAP_CALL_IN_LOOKUP%',
        label: 'Call in Lookups',
        type: 'checkbox'
      },
      {
        name: '%LDAP_SORT%',
        label: 'Enable Sort',
        type: 'checkbox'
      },
      {
        name: '%LDAP_DIAL_LOOKUP%',
        label: 'Dial Lookup',
        type: 'text'
      }
    ]

    // removed: "39": "BLF List"
    var types = {
      '0': '-- None --',
      '1': 'Conference',
      '2': 'Forward',
      '3': 'Transfer',
      '4': 'Hold',
      '5': 'DND',
      '7': 'Call Return',
      '9': 'Directed Pickup',
      '10': 'Call Park',
      '11': 'DTMF',
      '12': 'Voice Mail',
      '13': 'Speed Dial',
      '14': 'Intercom',
      '15': 'Line',
      '20': 'Private Hold',
      '23': 'Group Pickup',
      '24': 'Multicast Paging',
      '40': 'Prefix',
      '46': 'Network Group',
      '55': 'Meet-Me-Conference',
      '56': 'Retrieve Park'
    }

    var numKeys = {
      t46: 27,
      t48: 29,
      t41: 15
    }

    var numAccounts = {
      t41: 3,
      t46: 6,
      t48: 6
    }

    var ringtones = [
      'Ring1.wav',
      'Ring2.wav',
      'Ring3.wav',
      'Ring4.wav',
      'Ring5.wav',
      'Ring6.wav',
      'Ring7.wav',
      'Ring8.wav',
      'Silent.wav',
      'Splash.wav'
    ]

    var service = {
      keyPattern: keyPattern,
      ldapTags: ldapTags,
      types: types,
      numKeys: numKeys,
      numAccounts: numAccounts,
      ringtones: ringtones
    }
    return service

    function keyPattern(type) {
      var patterns = {
        t41: [
          {
            label: 'Keys 1-5',
            rows: [[1, 4], [2, 5], [3, null]]
          },
          {
            label: 'Keys 6-10',
            rows: [[6, 9], [7, 10], [8, null]]
          },
          {
            label: 'Keys 11-15',
            rows: [[11, 14], [12, 15], [13, null]]
          }
        ],
        t46: [
          {
            label: 'Keys 1-9',
            rows: [[1, 6], [2, 7], [3, 8], [4, 9], [5, null]]
          },
          {
            label: 'Keys 10-18',
            rows: [[10, 15], [11, 16], [12, 17], [13, 18], [14, null]]
          },
          {
            label: 'Keys 19-27',
            rows: [[19, 24], [20, 25], [21, 26], [22, 27], [23, null]]
          }
        ],
        t48: [
          {
            label: 'Keys',
            rows: [
              [1, 12, 18, 24, 7],
              [2, 13, 19, 25, 8],
              [3, 14, 20, 26, 9],
              [4, 15, 21, 27, 10],
              [5, 16, 22, 28, 11],
              [6, 17, 23, 29, null]
            ]
          }
        ]
      }
      return patterns[type]
    }
  }
})()
