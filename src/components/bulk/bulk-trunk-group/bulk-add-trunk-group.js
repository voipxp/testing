import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Input , Select} from 'rbx'
import { generatePassword } from '@/utils'
import SystemSipAuthPasswordRulesService
from '@/api/system/system-sip-auth-password-rules-service'
import ServiceProviderSipAuthPasswordRulesService from '@/api/service-providers/service-provider-sip-auth-password-service.js'
import { useAsync } from 'react-async-hook'
import {
  UiInputCheckbox,
  UiFormField,
  UiSection,
  UiInputPassword
} from '@/components/ui'

export const BulkAddTrunkGroup = (
  {
    serviceProviderId,
    groupId,
    deviceName='',
    setTaskData
  }
) => {
  const initialForm = {
    "accessDevice":
      {
        "staticRegistrationCapable": false,
        "useDomain": true,
        "staticLineOrdering": false,
        "serviceProviderId": '',
        "groupId": '',
        "accessDeviceName": deviceName,
        "deviceLevel": '',
      },
    "allowTerminationToDtgIdentity":false,
    "allowTerminationToTrunkGroupIdentity":false,
    "allowUnscreenedCalls":false,
    "allowUnscreenedEmergencyCalls":false,
    "capacityExceededTrapInitialCalls":0,
    "capacityExceededTrapOffsetCalls":0,
    "clidSourceForScreenedCallsPolicy":"Profile Name Profile Number",
    "continuousOptionsSendingIntervalSeconds":30,
    "enableBursting":false,
    "enableNetworkAddressIdentity":false,
    "failureOptionsSendingIntervalSeconds":10,
    "failureThresholdCounter":1,
    "includeDtgIdentity":false,
    "includeOtgIdentityForNetworkCalls":false,
    "includeTrunkGroupIdentity":false,
    "includeTrunkGroupIdentityForNetworkCalls":false,
    "invitationTimeout":6,
    "inviteFailureThresholdCounter":1,
    "inviteFailureThresholdWindowSeconds":30,
    "pilotUserCallOptimizationPolicy":"Optimize For User Services",
    "pilotUserCallingLineAssertedIdentityPolicy":"Unscreened Originating Calls",
    "pilotUserCallingLineIdentityForEmergencyCallsPolicy":"No Calls",
    "pilotUserCallingLineIdentityForExternalCallsPolicy":"No Calls",
    "pilotUserChargeNumberPolicy":"No Calls",
    "prefixEnabled":false,
    "prefix": "",
    "requireAuthentication":false,
    "routeToPeeringDomain":false,
    "peeringDomain": "",
    "sendContinuousOptionsMessage":false,
    "statefulReroutingEnabled":false,
    "successThresholdCounter":1,
    "useSystemCLIDSourceForScreenedCallsPolicy":true,
    "useSystemCallingLineAssertedIdentityPolicy":true,
    "useSystemUserLookupPolicy":true,
    "userLookupPolicy":"Basic",
    "name":"",
    "maxActiveCalls":2,
    "maxIncomingCalls":2,
    "maxOutgoingCalls":2,
    "sipAuthenticationUserName": "",
    "sipAuthenticationPassword": "",
    "trunkGroupIdentity": "",
    "otgDtgIdentity": "",
  }
  // clone group options

  const [form, setForm] = useState({...initialForm})
  const [passwordRule, setPasswordRule] = useState({})

  const otherSettings = [
    {
      name: 'allowTerminationToTrunkGroupIdentity',
      label: 'Allow calls to trunk group with Trunk Identity',
      value: form.allowTerminationToTrunkGroupIdentity
    },
    {
      name: 'allowTerminationToDtgIdentity',
      label: 'Allow calls to trunk group with DTG Identity',
      value: form.allowTerminationToDtgIdentity
    },
    {
      name: 'includeTrunkGroupIdentity',
      label: 'Include Trunk Identity for Calls to Trunk Group',
      value: form.includeTrunkGroupIdentity
    },
    {
      name: 'includeDtgIdentity',
      label: 'Include DTG Identity for Calls to Trunk Group',
      value: form.includeDtgIdentity
    },
    {
      name: 'includeTrunkGroupIdentityForNetworkCalls',
      label: 'Include Trunk Identity for Calls from Trunk Group',
      value: form.includeTrunkGroupIdentityForNetworkCalls
    },
    {
      name: 'includeOtgIdentityForNetworkCalls',
      label: 'Include OTG Identity for Calls from Trunk Group',
      value: form.includeOtgIdentityForNetworkCalls
    },
    {
      name: 'enableNetworkAddressIdentity',
      label: 'Enable Network Address Identity',
      value: form.enableNetworkAddressIdentity
    },
    {
      name: 'allowUnscreenedCalls',
      label: 'Allow Unscreened Calls',
      value: form.allowUnscreenedCalls
    },
    {
      name: 'allowUnscreenedEmergencyCalls',
      label: 'Allow Unscreened Emergency Calls',
      value: form.allowUnscreenedEmergencyCalls
    },
    {
      name: 'routeToPeeringDomain',
      label: 'Route to Peering Domain',
      value: form.routeToPeeringDomain
    }
  ]

  useAsync(
    () => ServiceProviderSipAuthPasswordRulesService.show(serviceProviderId)
    .then((rules) => {
      if (rules.useServiceProviderSettings === true) {
        setPasswordRule(rules)
      } else {
        SystemSipAuthPasswordRulesService.show().then((rules) => {
          setPasswordRule(rules)
        })
      }
    })
    ,[]
  )

  useEffect( () => {
	  setTaskData(form)
  }, [setTaskData, form])

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    const tempForm = {...form}
    if( name === 'accessDeviceName') {
      tempForm['accessDevice'][name] = value
    }
    else tempForm[name] = value

    setForm({...tempForm})
  }

  return (
    <>
        <UiSection>
          <UiFormField label="Trunk Name *" horizontal >
            <Input
              type="text"
              placeholder="Trunk Name"
              onChange={handleInput}
              name="name"
              value={form.name}
            />
          </UiFormField>
          <UiFormField label="Max Active Calls *" horizontal >
            <Input
              type="text"
              placeholder="Max Active Calls"
              onChange={handleInput}
              name="maxActiveCalls"
              value={form.maxActiveCalls}
            />
          </UiFormField>
          <UiFormField label="Max Incoming Calls" horizontal >
            <Input
              type="text"
              placeholder="Max Incoming Calls"
              onChange={handleInput}
              name="maxIncomingCalls"
              value={form.maxIncomingCalls}
            />
          </UiFormField>
          <UiFormField label="Max Outgoing Calls" horizontal >
            <Input
              type="text"
              placeholder="Max Outgoing Calls"
              onChange={handleInput}
              name="maxOutgoingCalls"
              value={form.maxOutgoingCalls}
            />
          </UiFormField>

          <UiFormField label="Access Device Name" horizontal >
              <Input
                type="text"
                readOnly
                // onChange={handleInput}
                name="accessDeviceName"
                value={deviceName}
              />
            </UiFormField>

          <UiFormField label="Authentication" horizontal>
            <UiInputCheckbox
              name="requireAuthentication"
              label="Require Authentication"
              checked={form.requireAuthentication}
              onChange={handleInput}
            />
          </UiFormField>
          {/* show if authentication is not set or value true */}
          { (form.requireAuthentication) ? (
            <>
              <UiFormField label="SIP User Name" horizontal>
                <Input
                  type="text"
                  name="sipAuthenticationUserName"
                  value={form.sipAuthenticationUserName}
                  onChange={handleInput}
                />
              </UiFormField>
              <UiFormField label="SIP Password" horizontal>
                <UiInputPassword
                  name="sipAuthenticationPassword"
                  value={form.sipAuthenticationPassword}
                  onChange={handleInput}
                  onGeneratePassword={() => generatePassword(passwordRule)}
                />
              </UiFormField>
            </> ):  null
        }
            <UiFormField label="Trunk Group Identity" horizontal >
              <Input
                type="text"
                placeholder="Trunck Group Identity"
                onChange={handleInput}
                name="trunkGroupIdentity"
                value={form.trunkGroupIdentity}
              />
            </UiFormField>

            <UiFormField label="OTG Identity" horizontal >
              <Input
                type="text"
                placeholder="OTG Identity"
                onChange={handleInput}
                name="otgDtgIdentity"
                value={form.otgDtgIdentity}
              />
            </UiFormField>
          <UiFormField label="Prefix" horizontal>
            <UiInputCheckbox
              name="prefixEnabled"
              label="Prefix Enabled"
              checked={form.prefixEnabled}
              onChange={handleInput}
            />
          </UiFormField>

          {
            (form.prefixEnabled)
            ?
            <UiFormField label="Prefix" horizontal>
            <Input
                type="number"
                onChange={handleInput}
                name="prefix"
                value={form.prefix}
              />
            </UiFormField>
            :
            null
          }

          <UiFormField label="Other Settings" horizontal>
            {
              otherSettings.map(el => {
                return (
                  <UiInputCheckbox
                    key={el.name}
                    name={el.name}
                    label={el.label}
                    checked={el.value}
                    onChange={handleInput}
                  />
                )
              })
            }
          </UiFormField>
          {
            (form.routeToPeeringDomain)
            ?
            <UiFormField label="Peering Domain" horizontal>
              <Input
                  type="text"
                  onChange={handleInput}
                  name="peeringDomain"
                  value={form.peeringDomain}
                />
            </UiFormField>
            :
            null
          }
          <UiFormField label="Call Optimization Policy" horizontal>
            <Select.Container fullwidth>
              <Select
                value={form.pilotUserCallOptimizationPolicy}
                onChange={handleInput}
                name="pilotUserCallOptimizationPolicy"
              >
                <Select.Option
                  key= "Optimize For User Services"
                  value= "Optimize For User Services"
                >
                  Optimize For User Services
                </Select.Option>
                <Select.Option
                  key= "Optimize For High Call Volume"
                  value= "Optimize For High Call Volume"
                >
                  Optimize For High Call Volume
                </Select.Option>
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="CLID Policy" horizontal>
            <Select.Container fullwidth>
              <Select
                value={form.pilotUserCallingLineIdentityForExternalCallsPolicy}
                onChange={handleInput}
                name="pilotUserCallingLineIdentityForExternalCallsPolicy"
              >
                <Select.Option
                  key= "All Originating Calls"
                  value= "All Originating Calls"
                >
                  All Originating Calls
                </Select.Option>
                <Select.Option
                  key= "Unscreened Originating Calls"
                  value= "Unscreened Originating Calls"
                >
                  Unscreened Originating Calls
                </Select.Option>
                <Select.Option
                  key= "No Calls"
                  value= "No Calls"
                >
                  No Calls
                </Select.Option>
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="CL Asserted ID Policy" horizontal>
            <UiInputCheckbox
              name="useSystemCallingLineAssertedIdentityPolicy"
              label="Use System Calling Line Asserted Identity Policy"
              checked={form.useSystemCallingLineAssertedIdentityPolicy}
              onChange={handleInput}
            />
          </UiFormField>
          {
            (!form.useSystemCallingLineAssertedIdentityPolicy)
            ?
            <UiFormField label="CL Asserted ID Policy" horizontal>
              <Select.Container fullwidth>
                <Select
                  value={form.pilotUserCallingLineAssertedIdentityPolicy}
                  onChange={handleInput}
                  name="pilotUserCallingLineAssertedIdentityPolicy"
                >
                  <Select.Option
                    value= "All Originating Calls"
                  >
                    All Originating Calls
                  </Select.Option>
                  <Select.Option
                    value= "Unscreened Originating Calls"
                  >
                    Unscreened Originating Calls
                  </Select.Option>
                </Select>
              </Select.Container>
            </UiFormField>
            :
            null
          }
          <UiFormField label="Charge Number Policy" horizontal>
            <Select.Container fullwidth>
              <Select
                value={form.pilotUserChargeNumberPolicy}
                onChange={handleInput}
                name="pilotUserChargeNumberPolicy"
              >
                <Select.Option
                  key= "All Originating Calls"
                  value= "All Originating Calls"
                >
                  All Originating Calls
                </Select.Option>
                <Select.Option
                  key= "Unscreened Originating Calls"
                  value= "Unscreened Originating Calls"
                >
                  Unscreened Originating Calls
                </Select.Option>
                <Select.Option
                  key= "No Calls"
                  value= "No Calls"
                >
                  No Calls
                </Select.Option>
              </Select>
            </Select.Container>
          </UiFormField>
        </UiSection>
    </>
  )
}

BulkAddTrunkGroup.propTypes = {
  serviceProviderId: PropTypes.string,
  groupId: PropTypes.string,
  deviceName: PropTypes.string,
  setTaskData: PropTypes.func
}
