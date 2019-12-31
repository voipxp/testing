import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'rbx'
import { AppBreadcrumb } from '@/components/app'
import PropTypes from 'prop-types'
import apiGroupWebPolicy from '@/api/group-web-policy'
import { Select } from 'rbx'
import { useAlerts } from '@/store/alerts'


import {
  UiCard,
  UiLoadingCard,
  UiSection,
  UiButton,
  UiFormField
 } from '@/components/ui'

export const GroupWebPolicy = ({ match }) => {
  const { serviceProviderId, groupId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const [loading, setLoading] = useState(true)
  const { policies } = apiGroupWebPolicy.options
  const [groupWebPolicyService, setGroupWebPolicies] = useState({})

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await apiGroupWebPolicy.show(serviceProviderId, groupId)
        setGroupWebPolicies(data)
      } catch (error) {
        alertDanger(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [serviceProviderId, groupId, alertDanger])


  function handleInput(event) {
    const value = event.target.value
    const name = event.target.name
    //setForm({ ...form, [name]: value })
    setGroupWebPolicies({...groupWebPolicyService, [name]: value})
  }

  function save() {
    //setForm({ ...groupWebPolicyService })
    update(groupWebPolicyService)
  }

  async function update(profile) {
    setLoading(true)
    try {
      const data = await apiGroupWebPolicy.update(serviceProviderId, groupId, profile)
      setGroupWebPolicies(data)
      alertSuccess('Group Web Policies Updated')
    } catch (error) {
      alertDanger(error)

    } finally {
      setLoading(false)

    }

  }
  return (
    <>
      <AppBreadcrumb>
        <Breadcrumb.Item>Group Web Policies</Breadcrumb.Item>
      </AppBreadcrumb>
      {loading ? (
        <UiLoadingCard />
      ) : (
        <>
          <UiCard
            title="Group Web Policies"

          >

          <UiSection title="">
          <form>

          <UiFormField label="Calling Plan" horizontal>
            <Select.Container fullwidth>
            <Select
                value={groupWebPolicyService.policies}
                onChange={handleInput}
                name="callingPlanAccess"
                defaultValue= { groupWebPolicyService.callingPlanAccess }
              >
                {policies.callingPlanAccess.map( (policy, index) => (
                  <Select.Option key={index} value={policy} >
                    {policy}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="Extension Dialing" horizontal>
            <Select.Container fullwidth>
            <Select
                value={groupWebPolicyService.policies}
                onChange={handleInput}
                name="extensionAccess"
                defaultValue= { groupWebPolicyService.extensionAccess }
              >
                {policies.extensionAccess.map( (policy, index) => (
                  <Select.Option key={index} value={policy} >
                    {policy}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="LDAP Integration" horizontal>
            <Select.Container fullwidth>
            <Select
                value={groupWebPolicyService.policies}
                onChange={handleInput}
                name="ldapIntegrationAccess"
                defaultValue= { groupWebPolicyService.ldapIntegrationAccess }
              >
                {policies.ldapIntegrationAccess.map( (policy, index) => (
                  <Select.Option key={index} value={policy}>
                    {policy}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="Voice Messaging" horizontal>
            <Select.Container fullwidth>
            <Select
                value={groupWebPolicyService.policies}
                onChange={handleInput}
                name="voiceMessagingAccess"
                defaultValue= { groupWebPolicyService.voiceMessagingAccess }
              >
                {policies.voiceMessagingAccess.map( (policy, index) => (
                  <Select.Option key={index} value={policy} >
                    {policy}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="Department Administrator User Policy" horizontal>
            <Select.Container fullwidth>
            <Select
                value={groupWebPolicyService.policies}
                onChange={handleInput}
                name="departmentAdminUserAccess"
                defaultValue= { groupWebPolicyService.departmentAdminUserAccess }
              >
                {policies.departmentAdminUserAccess.map( (policy, index) => (
                  <Select.Option key={index} value={policy} >
                    {policy}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="Department Administrator Trunk Group Policy" horizontal>
            <Select.Container fullwidth>
            <Select
                value={groupWebPolicyService.policies}
                onChange={handleInput}
                name="departmentAdminTrunkGroupAccess"
                defaultValue= { groupWebPolicyService.departmentAdminTrunkGroupAccess }
              >
                {policies.departmentAdminTrunkGroupAccess.map( (policy, index) => (
                  <Select.Option key={index} value={policy}>
                    {policy}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="Department Administrator Phone Number/Extension Access" horizontal>
            <Select.Container fullwidth>
            <Select
                value={groupWebPolicyService.policies}
                onChange={handleInput}
                name="departmentAdminPhoneNumberExtensionAccess"
                defaultValue= { groupWebPolicyService.departmentAdminPhoneNumberExtensionAccess }
              >
                {policies.departmentAdminPhoneNumberExtensionAccess.map( (policy, index) => (
                  <Select.Option key={index} value={policy} >
                    {policy}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="Department Administrator Calling Line Id Number Access" horizontal>
            <Select.Container fullwidth>
            <Select
                value={groupWebPolicyService.policies}
                onChange={handleInput}
                name="departmentAdminCallingLineIdNumberAccess"
                defaultValue= { groupWebPolicyService.departmentAdminCallingLineIdNumberAccess }
              >
                {policies.departmentAdminCallingLineIdNumberAccess.map( (policy, index) => (
                  <Select.Option key={index} value={policy} >
                    {policy}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="User Authentication" horizontal>
            <Select.Container fullwidth>
            <Select
                value={groupWebPolicyService.policies}
                onChange={handleInput}
                name="userAuthenticationAccess"
                defaultValue= { groupWebPolicyService.userAuthenticationAccess }
              >
                {policies.userAuthenticationAccess.map( (policy, index) => (
                  <Select.Option key={index} value={policy} >
                    {policy}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="User Group Directory" horizontal>
            <Select.Container fullwidth>
            <Select
                value={groupWebPolicyService.policies}
                onChange={handleInput}
                name="userGroupDirectoryAccess"
                defaultValue= { groupWebPolicyService.userGroupDirectoryAccess }
              >
                {policies.userGroupDirectoryAccess.map( (policy, index) => (
                  <Select.Option key={index} value={policy} >
                    {policy}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="User Profile" horizontal>
            <Select.Container fullwidth>
            <Select
                value={groupWebPolicyService.policies}
                onChange={handleInput}
                name="userProfileAccess"
                defaultValue= { groupWebPolicyService.userProfileAccess }
              >
                {policies.userProfileAccess.map( (policy, index) => (
                  <Select.Option key={index} value={policy} >
                    {policy}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="Call Logs" horizontal>
            <Select.Container fullwidth>
            <Select
                value={groupWebPolicyService.policies}
                onChange={handleInput}
                name="userEnhancedCallLogAccess"
                defaultValue= { groupWebPolicyService.userEnhancedCallLogAccess }
              >
                {policies.userEnhancedCallLogAccess.map( (policy, index) => (
                  <Select.Option key={index} value={policy} >
                    {policy}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>

          <UiFormField label="Auto Attendant Name Dialing" horizontal>
            <Select.Container fullwidth>
            <Select
                value={groupWebPolicyService.policies}
                onChange={handleInput}
                name="userAutoAttendantNameDialingAccess"
                defaultValue= { groupWebPolicyService.userAutoAttendantNameDialingAccess }
              >
                {policies.userAutoAttendantNameDialingAccess.map( (policy, index) => (
                  <Select.Option key={index} value={policy} >
                    {policy}
                  </Select.Option>
                ))}
              </Select>
            </Select.Container>
          </UiFormField>

        </form>
        <UiButton color="success" style={{ margin: '1rem 0rem' }}  onClick={save} > Save </UiButton>
        
        </UiSection>
          </UiCard>
        </>
      )}

    </>
  )
}
GroupWebPolicy.propTypes = {
  match: PropTypes.object.isRequired
}
