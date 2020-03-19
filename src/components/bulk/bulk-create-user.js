import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Control, Select, Tag , Input , Radio , Field } from 'rbx'
import _ from 'lodash'
import { BulkTagInput } from './bulk-tag-input'
import {
  UiCard,
  UiFormField,
  UiSection,
  UiButton,
  UiCardModal,
  UiLoading
} from '@/components/ui'
import groupExtensionLengthApi from '@/api/group-extension-length'
import apiSystemLanguageService from '@/api/system/system-language-service'
import apiSystemTimeZoneService from '@/api/system/system-time-zone-service'
import apiSystemStateProvincesService from '@/api/system/system-state-service'
import apiGroupNetworkClassOfService from '@/api/groups/group-network-class-of-service-service'
import groupDomainAPI from '@/api/groups/domains'
import { useAsync } from 'react-async-hook'
import { BulkSelectNumbers } from './bulk-select-numbers'

export const BulkCreateUser = ({
  serviceProviderId,
  groupId,
  enterpriseTrunkName='',
  groupTrunk='',
  phoneNumbers=[],
  setTaskData
}) => {
  const [tagBundleTemplateClick, setTagBundleTemplateClick] = React.useState(false)
  const templates = {
    password: '{{ generatePassword }}',
    passcode: '{{ generatePasscode }}',
    callingLineIdPhoneNumber: '{{ phoneNumber }}'
  }

  const initialForm =
  {
    userCount: '',
    userId: '',
    lastName: '',
    firstName: '',
    callingLineIdLastName: '',
    callingLineIdFirstName: '',
    password: templates.password,
    passcode:templates.passcode,
    phoneNumberAction: 'skip',
    phoneNumber: [],
    activatePhoneNumber: 'true',
    extension: '',
    callingLineIdPhoneNumber: '',
    timeZone: '',
    language: '',
    networkClassOfService: '',
    mobilePhoneNumber: '',
    pagerPhoneNumber: '',
    emailAddress: '',
    addressLocation: '',
    department: '',
    address: '',
    domain: '',
    stateOrProvince:'',
    endpointType: 'trunkAddressing',
    trunkAddressing: {
      enterpriseTrunkName: enterpriseTrunkName,
      trunkGroupDeviceEndpoint: {
        name: groupTrunk,
        linePort: ''
      }
    },
    allowAccessDeviceUpdate: 'false'
  }

  const [form, setForm] = useState({...initialForm})
  const [selectNumber, setSelectNumber] = React.useState(false)
  const [selectedNumbers, setSelectedNumbers] = React.useState([])
  const [extRange, setExtRange] = React.useState(false)
  const [extensionRange, setExtensionRange] = React.useState('')
  const [domains, setDomainsData] = React.useState({})
  const [systemLanguage, setSystemLanguage] = React.useState({})
  const [systemTimeZone, setSystemTimeZone] = React.useState({})
  const [systemStateProvincesService, setSystemStateProvincesService] = React.useState({})
  const [groupNetworkClassOfService, setGroupNetworkClassOfService] = React.useState({})
  const [selectedTagInput, setSelectedTagInput] = React.useState('')
  const [extensions, setExtensions] = React.useState([])

  const loadExtension = (data) => {
    const min = data.minExtensionLength
    const max = data.maxExtensionLength
    const def = data.defaultExtensionLength
    const exts = []
    for (let i = min; i <= max; i++) {
      exts.push({
        default: i === def,
        length: i,
        template: '{{ phoneNumberLast' + i + ' }}'
      })
    }
    setExtensions(exts)
    return exts
}

  const {loading} = useAsync(
    () => groupExtensionLengthApi.show(serviceProviderId, groupId)
    .then((data) => {
      return loadExtension(data)
    })
    ,[]
  )

  /*start  code for domain list */
  useAsync(
    () => groupDomainAPI.domains(groupId, serviceProviderId)
    .then((domains) => {
      setDomainsData(domains)
      setForm({...form, 'domain': domains.default})
    })
    ,[]
  )
/* code for domain list end */

/*start  code for language list */
useAsync(
  () => apiSystemLanguageService.index()
  .then((language) => {
    setSystemLanguage(language)
    setForm({...form, 'language': language.default })
  })
  ,[]
)
/* code for language list end */

/*start  code for timezone list */
useAsync(
  () => apiSystemTimeZoneService.index()
  .then((timeZone) => {
    setSystemTimeZone(timeZone)
  })
  ,[]
)
/* code for timezone list end */

/*start  code for timezone list */
useAsync(
  () => apiSystemStateProvincesService.index()
  .then((stateProvinces) => {
    setSystemStateProvincesService(stateProvinces)
  })
  ,[]
)
/* code for timezone list end */

/*start  code for timezone list */
useAsync(
  () => apiGroupNetworkClassOfService.show(serviceProviderId, groupId)
  .then((networkClassService) => {
    setGroupNetworkClassOfService(networkClassService)
  })
  ,[]
)
/* code for timezone list end */

  useEffect( () => {
	  setTaskData(form)
  }, [form])

  useEffect( () => {
    const tempForm = {...form}
    tempForm['callingLineIdFirstName'] = tempForm['firstName']
    tempForm['callingLineIdLastName'] = tempForm['lastName']
    if(!_.isEqual(form, tempForm)) setForm(tempForm)
  }, [form])

  if(loading) return <UiLoading />

  const handleInput = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const tempForm = {...form}
    if(name === 'linePort') {
      tempForm.trunkAddressing.trunkGroupDeviceEndpoint.linePort = value
    }
    else {
      tempForm[name] = value
    }
    setForm({...tempForm})
    // setForm({ ...form, [name]: value })
  }

  const handleTagSelect = (elName, tag) => {
    const tempForm = {...form}
    let oldValue = ''
    if(elName === 'linePort') {
      oldValue = tempForm.trunkAddressing.trunkGroupDeviceEndpoint.linePort || ''
    }
    else {
      oldValue = tempForm[elName] || ''
    }
    const value = oldValue + tag.tag
    if(elName === 'linePort') {
      tempForm.trunkAddressing.trunkGroupDeviceEndpoint.linePort = value
    }
    else tempForm[elName] = value

    setForm({...tempForm})
    setTagBundleTemplateClick(false)
  }

  const selectTagModal = (
    <>
      <UiCardModal
        title="Tags"
        isOpen={tagBundleTemplateClick}
        onCancel={() => setTagBundleTemplateClick(false)}
      >
        <BulkTagInput
          onSelect={(tag) => handleTagSelect(selectedTagInput, tag)}
          hideTags={['{{ userId }}', '{{ userIdPrefix }}']} />
      </UiCardModal>
    </>
  )

const handleNumberInput = (event) => {
  const target = event.target
  const value = target.value
  const name = target.name
  const tempForm = {...form}
  tempForm[name] = value

  if(name === "phoneNumberAction") {
    if(value === 'select') setSelectNumber(true)
    else tempForm['phoneNumber'] = []

  }
  else if(name === "extension") {
    if(value === 'extensionRange') setExtRange(true)
    else delete tempForm.extensionRange
  }

  setForm(tempForm)
}

const handleNumbers = (name) => {
  if(name === "phoneNumber") {
    setForm({ ...form, [name]: selectedNumbers })
  setSelectNumber(false)
  }
  else if(name === "extensionRange") {
    setForm({ ...form, [name]: extensionRange })
    setExtRange(false)
  }
}

const tagInputClicked = (elNane) => {
    setSelectedTagInput(elNane)
    setTagBundleTemplateClick(true)
  }

  const addExtensionRangeModal = (
    extRange
    ?
    <UiCardModal
      title="Add Extension Range"
      isOpen={extRange}
      onCancel={() => setExtRange(false)}
      onSave={() => handleNumbers('extensionRange')}
      >
        <UiFormField label="Range" horizontal >
            <Input
              type="number"
              onChange={(event) => setExtensionRange(event.target.value)}
              name="extensionRange"
              value={extensionRange}
            />
          </UiFormField>
      </UiCardModal>
    :
    null
  )


  return (
    <>
    { addExtensionRangeModal }  {/* Add Extension modal */}
    {
      selectNumber ?
      <UiCardModal
      title="Numbers"
      isOpen={selectNumber}
      onCancel={() => setSelectNumber(false)}
      onSave={() => handleNumbers('phoneNumber')}
      >
        <BulkSelectNumbers
        phoneNumbers={phoneNumbers}
        setSelectedNumbers={(numbers) => setSelectedNumbers(numbers)}
        />
      </UiCardModal>
      :
      null
    }

    { ( tagBundleTemplateClick ) ? selectTagModal : null}
        <UiSection>
          <UiFormField label="Number of Users (max: 1) * " horizontal>
            <Input
              type="number"
              placeholder="Number of Users"
              onChange={handleInput}
              name="userCount"
              value={form.userCount}
            />
          </UiFormField>
          <UiCard title='User Id'>
        <UiSection title ="User ID Template">

        <Field.Body>
        <UiButton
          style={{height:'35px'}}
          color="link"
          icon="tag"
          size="small"
          onClick={() => tagInputClicked('userId')}
        />
          <Control style = {{width: '52rem' }}>
            <Input
              type="text"
              placeholder="User ID"
              onChange={handleInput}
              name="userId"
              value={form.userId}
            />
          </Control>
          <Control>
            <Tag color="link" size="medium">
              @
            </Tag>
          </Control>
          <Control style = {{width: '25rem' , marginBottom:'1rem'}}>
              <Select.Container>
                <Select
                  value={form.domain}
                  onChange={handleInput}
                  name="domain"
                  style = {{width: '15rem' , marginBottom:'1rem'}}
                >
                  {
                    domains &&
                    domains.default ? (
                      <Select.Option
                        key={domains.default}
                        value={domains.default}
                      >
                        {domains.default}
                      </Select.Option>
                    ) : null}
                    { domains.domains && domains.domains.map(domain =>
                         domains.default !== domain ? (
                          <Select.Option key={domain} value={domain}>
                            {domain}
                          </Select.Option>
                        ) : null
                         )
                    }
                  </Select>
                </Select.Container>
              </Control>
          </Field.Body>
        </UiSection>
      </UiCard>
{/*password */}
      <UiCard title='User Passwords'>
        <UiFormField label="Do you want to assign passwords?">
          <Radio
            type="radio"
            value={templates.password}
            name ="password"
            checked={form.password === templates.password}
            onChange={handleInput}
          />Auto-Generate Passwords<br/>

          <Radio
            type="radio"
            value="null"
            name ="password"
            checked={form.password === "null"}
            onChange={handleInput}
          />Leave Blank
        </UiFormField>

        <UiFormField label="Do you want to assign passcodes?">
          <Radio
            type="radio"
            value={templates.passcode}
            checked={form.passcode === templates.passcode}
            name ="passcode"
            onChange={handleInput}
          /> Auto-Generate Passcodes<br/>

          <Radio
            type="radio"
            value="null"
            checked={form.passcode === 'null'}
            name ="passcode"
            onChange={handleInput}
          /> Leave Blank
        </UiFormField>
      </UiCard>
{/* end password */}

{/* User Names */}
      <UiCard title='User Names'>
        <UiSection title="Required Names">
          <UiFormField label="First Name *" horizontal >
            <UiButton
              style={{height:'35px'}}
              color="link"
              icon="tag"
              size="small"
              onClick={() => tagInputClicked('firstName')}
            />
            <Input
              style = {{width: '361px' }}
              type="text"
              onChange={handleInput}
              name="firstName"
              value={form.firstName}
            />
          </UiFormField>

          <UiFormField label="Last Name *" horizontal >
            <UiButton
              style={{height:'35px'}}
              color="link"
              icon="tag"
              size="small"
              onClick={() => tagInputClicked('lastName')}
            />

            <Input
              style = {{width: '361px' }}
              type="text"
              onChange={handleInput}
              name="lastName"
              value={form.lastName}
            />
          </UiFormField>
          <UiFormField label="CLID First Name *" horizontal >
            <UiButton
              style={{height:'35px'}}
              color="link"
              icon="tag"
              size="small"
              onClick={() => tagInputClicked('callingLineIdFirstName')}
            />
            <Input
              style = {{width: '361px' }}
              type="text"
              onChange={handleInput}
              name="callingLineIdFirstName"
              value={form.callingLineIdFirstName}
            />
          </UiFormField>
          <UiFormField label="CLID Last Name *" horizontal >
            <UiButton
              style={{height:'35px'}}
              color="link"
              icon="tag"
              size="small"
              onClick={() => tagInputClicked('callingLineIdLastName')}
            />
            <Input
              style = {{width: '361px' }}
              type="text"
              onChange={handleInput}
              name="callingLineIdLastName"
              value={form.callingLineIdLastName}
            />
          </UiFormField>
         </UiSection>
        </UiCard>
              {/* end User Names */}

              {/* User Number */}
        <UiCard
          title='User Number'
        >
        <UiFormField label="Do you want to assign phone numbers?">
          <Radio
            type="radio"
            value="skip"
            checked={form.phoneNumberAction === "skip"}
            name="phoneNumberAction"
            onChange={handleNumberInput}
          />Leave Blank<br/>
          <Radio type="radio"
            value="select"
            checked={form.phoneNumberAction === "select"}
            name ="phoneNumberAction"
            onChange={handleNumberInput}
            // onClick = {() => setSelectNumber(true)}
          />Select From Available Phone Numbers
        </UiFormField>
        <UiFormField label="Do you want to set Extensions?">
          <Radio
            type="radio"
            value=""
            checked={form.extension === ""}
            name ="extension"
            onChange={handleInput}
          /> Leave Blank<br/>
          <Radio
              type="radio"
              value="extensionRange"
              checked={form.extension === "extensionRange"}
              name ="extension"
              onChange={handleNumberInput}
          /> Add Extension Range <br/>

          {
            extensions.map((el, index) => (
              <p key={'p' + index} >
                <Radio
                  key={'radio' + index}
                  type="radio"
                  value={el.template}
                  checked={form.extension === el.template}
                  name ="extension"
                  onChange={handleInput}
                /> Last {el.length} Digits of Phone Number <br/>
              </p>
            ) )
          }
        </UiFormField>
        <UiFormField label="Do you want to set Calling Line ID?">
          <Radio
            type="radio"
            value=""
            // undefined
            checked={form.callingLineIdPhoneNumber === ""}
            onChange={handleInput}
            name="callingLineIdPhoneNumber"
          />Leave Blank<br/>

          <Radio
            type="radio"
            value={templates.callingLineIdPhoneNumber}
            checked={form.callingLineIdPhoneNumber === templates.callingLineIdPhoneNumber}
            onChange={handleInput}
            name ="callingLineIdPhoneNumber"
          />Set to Phone Number
        </UiFormField>

        <UiFormField label="Do you want to set Activate the phone numbers?">
          <Radio
            type="radio"
            value="true"
            checked={form.activatePhoneNumber === "true"}
            name="activatePhoneNumber"
            onChange={handleInput}
          />Activate Numbers<br/>

          <Radio
            type="radio"
            value="false"
            checked={form.activatePhoneNumber === "false"}
            name ="activatePhoneNumber"
            onChange={handleInput}
          />Do Not Activate Numbers
        </UiFormField>
      </UiCard>

{/* end User Number */}

{/* User Device*/}
    <UiCard title='User Device'>

      <UiFormField label="Device endpoint type"> <b>Trunking</b>

      </UiFormField>
        <UiSection title="Trunk Addressing">
          <UiFormField label="Enterprise Trunk" horizontal >
            <Input
              type="text"
              readOnly
              value={form.trunkAddressing.enterpriseTrunkName}
            />
          </UiFormField>
            <UiFormField label="Trunk Group" horizontal >
              <Input
                type="text"
                readOnly
                value={form.trunkAddressing.trunkGroupDeviceEndpoint.name}
              />
            </UiFormField>

            <UiFormField label="Trunk Group Line Port" horizontal >
              <UiButton
                style={{height:'35px'}}
                color="link"
                icon="tag"
                size="small"
                onClick={() => tagInputClicked('linePort')}
              />
              <Input
                style = {{width: '361px' }}
                type="text"
                name="linePort"
                onChange={handleInput}
                value={form.trunkAddressing.trunkGroupDeviceEndpoint.linePort}
              />
            </UiFormField>
          </UiSection>
        </UiCard>
  {/* end user Device*/}

  {/* User Device*/}
        <UiCard title='User Details'>
          <UiSection title="Optional Details">
            <UiFormField  label="Time Zone" horizontal>
              <Select.Container fullwidth>
               <Select
                  value={form.timeZone}
                  onChange={handleInput}
                  name="timeZone"
                >
                  <Select.Option value="Please select...">
                    {'Please select...'}
                  </Select.Option>
                  {
                    systemTimeZone.length > 0  ? (
                      systemTimeZone && systemTimeZone.map(el =>
                        <Select.Option
                          key={el.displayName}
                          value={el.displayName}>
                            {el.displayName}
                        </Select.Option>
                      )
                    ) : null}
                </Select>
              </Select.Container>
            </UiFormField>

            <UiFormField  label="Language" horizontal>
              <Select.Container fullwidth>
                <Select
                  value={form.language}
                  onChange={handleInput}
                  name="language"
                >
                  {
                    systemLanguage &&
                    systemLanguage.default ? (
                      <Select.Option
                        key={systemLanguage.default}
                        value={systemLanguage.default}
                      >
                        {systemLanguage.default}
                      </Select.Option>
                    ) : null}
                    { systemLanguage.default && systemLanguage.languages.map(languagesData =>
                        systemLanguage.default !== languagesData.language ? (
                          <Select.Option
                            key={languagesData.language }
                            value={languagesData.language }>
                              { languagesData.language }
                          </Select.Option>
                        ) : null
                      )
                    }
                </Select>
              </Select.Container>
            </UiFormField>
            <UiFormField label="Network Class of Services" horizontal>
              <Select.Container fullwidth>
                <Select
                  value={form.networkClassOfService}
                  onChange={handleInput}
                  name="networkClassOfService"
                >
                  <Select.Option value="Please select...">
                    {''}
                  </Select.Option>
                  {
                    groupNetworkClassOfService.length> 0 ?  (
                      groupNetworkClassOfService && groupNetworkClassOfService.map(el =>
                        <Select.Option
                          key={el.name }
                          value={el.name }>
                            {el.name }
                        </Select.Option>
                      )
                    ) : null }
                </Select>
              </Select.Container>
            </UiFormField>
          </UiSection>
        </UiCard>
  {/* end user Device*/}
  {/* User Names */}
        <UiCard title='User Contact Information'>
          <UiSection title="Optional Contact Information">
            <UiFormField label="Mobile Number" horizontal >
              <UiButton
                style={{height:'35px'}}
                color="link"
                icon="tag"
                size="small"
                onClick={() => tagInputClicked('mobilePhoneNumber')}
              />
              <Input
              style = {{width: '361px' }}
                type="text"
                onChange={handleInput}
                name="mobilePhoneNumber"
                value={form.mobilePhoneNumber}
              />
            </UiFormField>
            <UiFormField label="Pager Number" horizontal >
              <UiButton
                style={{height:'35px'}}
                color="link"
                icon="tag"
                size="small"
                onClick={() => tagInputClicked('pagerPhoneNumber')}
              />
              <Input
                style = {{width: '361px' }}
                type="text"
                onChange={handleInput}
                name="pagerPhoneNumber"
                value={form.pagerPhoneNumber}
              />
            </UiFormField>
            <UiFormField label="Email Address" horizontal >
              <UiButton
                style={{height:'35px'}}
                color="link"
                icon="tag"
                size="small"
                onClick={() => tagInputClicked('emailAddress')}
              />
              <Input
                style = {{width: '361px' }}
                type="text"
                onChange={handleInput}
                name="emailAddress"
                value={form.emailAddress}
              />
            </UiFormField>

            <UiFormField label="Social ID" horizontal >
              <UiButton
                style={{height:'35px'}}
                color="link"
                icon="tag"
                size="small"
                onClick={() => tagInputClicked('yahooId')}
              />
              <Input
                style = {{width: '361px' }}
                type="text"
                onChange={handleInput}
                name="yahooId"
                value={form.yahooId}
              />
            </UiFormField>
          </UiSection>
        </UiCard>
  {/* end User Names */}
  {/* User Names */}
        <UiCard title='User Address'>
          <UiSection title="Address Details">
            <UiFormField label="Address Location " horizontal >
              <Input
                type="text"
                onChange={handleInput}
                name="addressLocation"
                value={form.addressLocation}
                placeholder ="work, home ,  city, etc..."
              />
            </UiFormField>
            <UiFormField label="Address Line 1" horizontal >
              <Input
                type="text"
                onChange={handleInput}
                name="addressLine1"
                value={form.addressLine1}
              />
            </UiFormField>
            <UiFormField label="Address Line 2" horizontal >
              <Input
                type="text"
                onChange={handleInput}
                name="addressLine2"
                value={form.addressLine2}
              />
            </UiFormField>
            <UiFormField label="City" horizontal >
              <Input
                type="text"
                onChange={handleInput}
                name="city"
                value={form.address.city}
              />
            </UiFormField>
            <UiFormField label="State/Province" horizontal>
              <Select.Container fullwidth>
                <Select
                  value={form.stateOrProvince}
                  onChange={handleInput}
                  name="stateOrProvince"
                >
                  <Select.Option value="Please select...">
                    {'Please select...'}
                  </Select.Option>
                  {
                    systemStateProvincesService.length > 0  ? (
                      systemStateProvincesService && systemStateProvincesService.map(el =>
                        <Select.Option
                          key={el.displayName}
                          value={el.displayName}>
                            {el.displayName}
                        </Select.Option>
                      )
                    ) : null
                  }
                </Select>
            </Select.Container>
            </UiFormField>
            <UiFormField label="Postal Code" horizontal >
              <Input
                type="text"
                onChange={handleInput}
                name="zipOrPostalCode"
                value={form.address.zipOrPostalCode}
              />
            </UiFormField>
            <UiFormField label="Country" horizontal >
              <Input
                type="text"
                onChange={handleInput}
                name="country"
                value={form.address.country}
              />
            </UiFormField>
          </UiSection>
        </UiCard>
          {/* end User Names */}
      </UiSection>
    </>
  )
}

BulkCreateUser.propTypes = {
  setTaskData: PropTypes.func,
  phoneNumbers: PropTypes.array,
  serviceProviderId: PropTypes.string.isRequired,
  groupId: PropTypes.string.isRequired,
  enterpriseTrunkName: PropTypes.string,
  groupTrunk: PropTypes.string,
}
