import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Control, Select, Tag , Input , Radio , Field } from 'rbx'
import _ from 'lodash'
import { BulkTagInput } from './bulk-tag-input'
import { generatePassword } from '@/utils'
import {
  UiCard,
  UiInputCheckbox,
  UiFormField,
  UiSection,
  UiInputPassword,
  UiButton,
  UiCardModal,
  UiLoading
} from '@/components/ui'
import groupExtensionLengthApi from '@/api/group-extension-length'
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
  // const { serviceProviderId, groupId, enterpriseTrunkName, groupTrunk} = {...props}
  // const enterpriseTrunkName = props.enterpriseTrunkName
  // const groupTrunk = props.enterpriseTrunkName
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
  // const numbers = props.numbers
  // const [selectGroupId, setSelectGroupId] = React.useState(false)
  // const [showModal, setShowModal] = useState(false)
  // const [isCreateNumber, setCreateUser] = useState(false)
  // const [isaddExtensionRange, setAddExtensionRange] = useState(false)
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

  const {result, error, loading, execute} = useAsync(
    () => groupExtensionLengthApi.show(serviceProviderId, groupId)
    .then((data) => {
      return loadExtension(data)
    })
    ,[]
  )

  /*start  code for domain list */
  const {resultDomains } = useAsync(
    () => groupDomainAPI.domains(groupId, serviceProviderId)
    .then((data) => {
      setDomainsData(data)
    })
    ,[]
  )
/* code for domain list end */
  useEffect( () => {
	  setTaskData(form)
  }, [form])

  if(loading) return <UiLoading />

  const handleInput = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const tempForm = {...form}
    // trunkAddressing.trunkGroupDeviceEndpoint.linePort
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
    const value = tempForm[elName] + tag.tag
    setForm({...tempForm, [elName]: value})
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
          onSelect={(tag) => handleTagSelect('userId', tag)}
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

const createNumbers =  () => {
    //add code start here
    // setShowModal(true)
    // setCreateUser(true)
  }


  function extension (){
    //setmodal(true)

  }
  // function clearNumbers (){
  //   //setmodal(true)
  //   //  form.phoneNumbers = []
  //   // form.phoneNumberAction = 'skip'
  // }


  // function selectNumbers() {
  //   phoneNumbers
  //   /*get the list of bulk Number number */
  //  //api('bulkSelectExistingNumbers:load')

  // }

  // function updateEndpoint() {
   /* if (form.endpointType === 'none') {
      delete form.accessDeviceEndpoint
      delete form.trunkAddressing
    } else if (form.endpointType === 'accessDeviceEndpoint') {
      delete form.trunkAddressing
    } else */

    // if (form.endpointType === 'trunkAddressing') {
    //   delete form.accessDeviceEndpoint
    // }
  // }

  // function addExtensionRange() {
  //   // setCreateUser(false)
  //   // setAddExtensionRange(true)
  //   // setShowModal(true)

  //   /*get the list of bulk extension number */
  //  //api('bulkSelectExistingNumbers:load')

  // }

  function setNumbers(numbers) {
    form.phoneNumbers = numbers
    form.phoneNumberAction = 'select'
    var defaultExtension = _.find(form.extensions, { default: true })
    if (defaultExtension) {
      form.extension = defaultExtension.template
    }
    form.callingLineIdPhoneNumber = form.callingLineIdPhoneNumber
  }

  // function saveTag(){
  //   //add tag
  // }


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
              type="text"
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
          onClick={() => setTagBundleTemplateClick(true)}
        />
          {/* <Control>
            <Tag color="link" size="medium" onClick={() => setTagBundleTemplateClick(true)}>
              <span className="icon is-small">
                <i className="fas fa-tag"></i>
              </span>
            </Tag>
          </Control> */}
          <Control style = {{width: '25rem' }}>
            <Input
              type="text"
              placeholder="User ID"
              onChange={handleInput}
              name="userId"
              value={form.userId}
            />
          </Control>
          <Control>
            <Tag color="link" size="medium" onClick={() => setTagBundleTemplateClick(true)}>
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
            <Input
              type="text"
              onChange={handleInput}
              name="firstName"
              value={form.firstName}
            />
          </UiFormField>

          <UiFormField label="Last Name *" horizontal >
            <Input
              type="text"
              onChange={handleInput}
              name="lastName"
              value={form.lastName}
            />
          </UiFormField>

          <UiFormField label="CLID First Name *" horizontal >
            <Input
              type="text"
              onChange={handleInput}
              name="callingLineIdFirstName"
              value={form.callingLineIdFirstName}
            />
          </UiFormField>

          <UiFormField label="CLID Last Name *" horizontal >
            <Input
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
              buttons={

                  <UiButton
                    color="link"
                    icon="add"
                    size="small"
                    onClick={createNumbers}
                  />

              }
              >

                <UiFormField label="Do you want to assign phone numbers?">
                  <Radio
                      type="radio"
                      value="skip"
                      checked={form.phoneNumberAction === "skip"}
                      name="phoneNumberAction"
                      onChange={handleNumberInput}
                      // onClick = {clearNumbers}
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
                    //  onClick={addExtensionRange}
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
                  {/* <Radio
                    type="radio"
                    value="true"
                    checked={false}
                    name ="extension"
                    onChange={handleInput}
                  /> Last 3 Digits of Phone Number <br/>

                  <Radio
                    type="radio"
                    value="true"
                    checked={false}
                    name ="form.extension"
                    onChange={handleInput}
                  /> Last 4 Digits of Phone Number (default) <br/>

                  <Radio
                    type="radio"
                    value="true"
                    checked={false}
                    name ="form.extension"
                  /> Last 5 Digits of Phone Number <br/>

                  <Radio
                    type="radio"
                    value="true"
                    checked={false}
                    name ="form.extension"
                  /> Last 6 Digits of Phone Number <br/> */}

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
                 {/* <Radio type="radio" value="true" checked={true} name="password"/>None<br/>
                  <Radio type="radio" value="true" checked={false} name ="password"/>Hosted User<br/> */}
                  {/* <Radio
                  type="radio"
                  value="trunkAddressing"
                  checked={false}
                  name ="form.endpointType"
                  onChange={handleInput}
                  onClick = {updateEndpoint}
                  />Trunking */}

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
                  <Input
                    type="text"
                    name="linePort"
                    onChange={handleInput}
                    value={form.trunkAddressing.trunkGroupDeviceEndpoint.linePort}
                  />
                </UiFormField>

                </UiSection>

                {/* <UiFormField label="Do you want to assign passcodes?">
                  <Radio
                    type="radio"
                    value="true"
                    checked={true}
                    name ="passcode"
                  /> Auto-Generate Passcodes<br/>

                  <Radio
                    type="radio"
                    value="true"
                    checked={false}
                    name ="passcode"
                  /> Leave Blank
                </UiFormField> */}

          </UiCard>
{/* end user Device*/}

{/* User Device*/}
<UiCard title='User Details'>


                <UiSection title="Optional Details">
                <UiFormField label="Time Zone" horizontal>
              <Select.Container fullwidth>
                <Select
                  value= {form.timeZone}
                  onChange={handleInput}
                  name="timeZone"
                >
                  <Select.Option value="Please select...">
                    {'Please select...'}
                  </Select.Option>

                  <Select.Option value="America/St_Johns">
                    {'(GMT-02:30) (Canada) Newfoundland'}
                  </Select.Option>

                </Select>
              </Select.Container>
            </UiFormField>
                  <UiFormField label="Language" horizontal>
              <Select.Container fullwidth>
                <Select
                  value=  {form.language}
                  onChange={handleInput}
                  name="language"
                >
                  <Select.Option value="Please select...">
                    {'Please select...'}
                  </Select.Option>

                  <Select.Option value="English">
                    {'English'}
                  </Select.Option>

                </Select>
              </Select.Container>
            </UiFormField>
            <UiFormField label="Network Class of Services" horizontal>
              <Select.Container fullwidth>
                <Select
                  value=  {form.networkClassOfService}
                  onChange={handleInput}
                  name="networkClassOfService"
                >
                  <Select.Option value="">
                    {'None'}
                  </Select.Option>
                  {/* <Select.Option value="Please select...">

                  </Select.Option> */}

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
            <Input
              type="text"
              onChange={handleInput}
              name="mobilePhoneNumber"
              value={form.mobilePhoneNumber}
            />
          </UiFormField>

          <UiFormField label="Pager Number" horizontal >
            <Input
              type="text"
              onChange={handleInput}
              name="pagerPhoneNumber"
              value={form.pagerPhoneNumber}
            />
          </UiFormField>

          <UiFormField label="Email Address" horizontal >
            <Input
              type="text"
              onChange={handleInput}
              name="emailAddress"
              value={form.emailAddress}
            />
          </UiFormField>

          <UiFormField label="Social ID" horizontal >
            <Input
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

          <UiFormField label="City  " horizontal >
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
                  value= {form.states}
                  onChange={handleInput}
                  name="states"
                >
                  <Select.Option value="Please select...">
                    {'Please select...'}
                  </Select.Option>

                  <Select.Option value="Alaska">
                    {'Alaska'}
                  </Select.Option>

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
