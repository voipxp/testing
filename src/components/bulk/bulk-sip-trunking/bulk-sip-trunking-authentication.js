import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {   Input , Radio ,Button } from 'rbx'
import { BulkTagInput } from '../../bulk/bulk-tag-input'
import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import {
  UiCard,
  UiFormField,
  UiSection,
  UiButton,
  UiCardModal,
  UiInputCheckbox
} from '@/components/ui'

import { useAlerts } from '@/store/alerts'

export const BulkSipTrunkingAuthentication = ({
	initialData={},
	setToNext,
  handleWizData,
  localStorageKey
}) => {
 const handleTask = () => {
  if(form.userNameAction !=='skip' || form.passwordAction !=='skip'){
    createTask()
  }
  setToNext()
}
 const initialForm = {
  userName : '',
  userNameAction  : 'skip',
  passwordAction  :'{{ generateSipPassword }}',
  resetDevice: false,
  rebuildDevice: false
}

  const [form, setForm] = useState({...initialForm})
  const { serviceProviderId, groupId } = initialData
  const [isNextBtnDisabled, setDisableNextButton] = useState(false)
  const [isUserName, setUserNameVisible] = useState(false)
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const { alertSuccess, alertDanger } = useAlerts()
  const [tagBundleTemplateClick, setTagBundleTemplateClick] = React.useState(false)
  const [selectedTagInput, setSelectedTagInput] = React.useState('')

  const handleInput = (event) => {
    const tempForm = {...form}
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    if( name === 'userNameAction' && value !== 'skip') setUserNameVisible(true)
    if( name ==='userNameAction' && value === 'skip' ) setUserNameVisible(false)
    if( name === 'passwordAction' &&  value === 'manual') setPasswordVisible(true)
    if( name === 'passwordAction' && value !== 'manual' ) setPasswordVisible(false)

    tempForm[name] = value
    setForm({ ...tempForm })
  }
/*
onKeyPress={handleKeyDown}
  const handleKeyDown = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    if((name === 'userName' && value === '') && (name === 'newPassword' && value === '') )setDisableNextButton(true)
    else if((name === 'userName' && value === '')
     && (name === 'passwordAction' && value === '{{ generateSipPassword }}') ) setDisableNextButton(true)
    else setDisableNextButton(false)

  } */

  const prepareImport = () => {
    const tasks = []
     const task =  {
        "task": "user.authentication.update",
        "userId": "--", // This is only temp userId, userId will be set in SIP Auth Task
        "groupId": groupId,
        "serviceProviderId": serviceProviderId,
        "resetDevice": form.resetDevice,
        "rebuildDevice": form.rebuildDevice
      }
      if(form.userAction !== 'skip') task.userName = form.userName
      if(form.passwordAction === '{{ generateSipPassword }}' ) task.newPassword = form.passwordAction
      else if(form.passwordAction === 'manual' ) task.newPassword = form.newPassword
      else task.newPassword = ''
      tasks.push(task)
    return tasks
  }

  const createTask = () => {
    //setUserServiceClicked(false)
    //setServicePackClicked(false)
    prepareImportData().then((data) => {
      Promise.all([BulkImportService.handleFileData(data, localStorageKey)]).then( (data) => {
        alertSuccess('Task is created Successfully.')
      //  setDisableNextButton(false)
      })
      .catch( (error) => {
        alertDanger( error || 'Data Import Error' )
      })
		})
	}

const prepareImportData = () => {
  return Promise.all(prepareImport()).then( (data) => {
    return data
  })
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
        />
      </UiCardModal>
    </>
  )

  const handleTagSelect = (elName, tag) => {
    const tagTempForm = {...form}
   let oldValue = tagTempForm[elName] || ''

    const value = oldValue + tag.tag
    if(elName === 'userName') {
      oldValue = tagTempForm.userName = value
    }

    if(elName === 'newPassword') {
      oldValue = tagTempForm.newPassword = value
    }
    setForm({...tagTempForm})
    setTagBundleTemplateClick(false)
  }

const tagInputClicked = (elNane) => {
  setSelectedTagInput(elNane)
  setTagBundleTemplateClick(true)
}


  return (

    <>
    { ( tagBundleTemplateClick ) ? selectTagModal : null}

    <UiCard title='Update SIP Authentication'>
			<UiSection title ="Do you want to set the usernames?">
        <Radio
          type="radio"
          value='skip'
          name ="userNameAction"
          checked={form.userNameAction === 'skip'}
          onChange={handleInput}
        />Leave Blank<br/>

        <Radio
          type="radio"
          value='manual'
          name ="userNameAction"
          checked={form.userNameAction === 'manual'}
          onChange={handleInput}
        />Enter Username<br/>
        <br/>
        { isUserName ? (
        <UiFormField label="Username" horizontal >
          <UiButton
            style={{height:'35px'}}
            color="link"
            icon="tag"
            size="small"
            onClick={() => tagInputClicked('userName')}
          />

          <Input
            style = {{width: '540px' }}
            type="text"
            name="userName"
            value={form.userName}
            onChange={handleInput}
          />
        </UiFormField>
        ):null }
      </UiSection>

      <UiSection title ="Do you want to set the passwords?">

        <Radio
          type="radio"
          value='{{ generateSipPassword }}'
          name ="passwordAction"
          checked={form.passwordAction === '{{ generateSipPassword }}' }
          onChange={handleInput}
        />Auto-Generate Passwords<br/>

        <Radio
          type="radio"
          value='skip'
          name ="passwordAction"
          checked={form.passwordAction === 'skip'}
          onChange={handleInput}
        />Leave Blank<br/>

        <Radio
          type="radio"
          value='manual'
          name ="passwordAction"
          checked={form.passwordAction === 'manual'}
          onChange={handleInput}
        />Enter Password<br/>
        <br/>
        { isPasswordVisible ? (
        <UiFormField label="Password" horizontal >
          <UiButton
            style={{height:'35px'}}
            color="link"
            icon="tag"
            size="small"
            onClick={(event) => tagInputClicked('newPassword')}
          />

          <Input
            style = {{width: '540px' }}
            type="text"
            name="newPassword"
            value={form.newPassword}
            onChange={handleInput}
          />
        </UiFormField>
        ):null }
      </UiSection>

    <UiSection title ="Rebuild and Reset Device?">
      <UiInputCheckbox
        name="rebuildDevice"
        label="Rebuild Device"
        checked={form.rebuildDevice}
        onChange={handleInput}
      />
      <UiInputCheckbox
        name="resetDevice"
        label="Reset Device"
        checked={form.resetDevice}
        onChange={handleInput}
    />
    </UiSection>

    </UiCard>
      <div style={{marginTop: '20px'}}>
        <Button style={{float: 'right'}}
          color="link"
          onClick={ handleTask }
          disabled = { isNextBtnDisabled }
        >
          Next
        </Button>
      </div>
    </>
	)
}

BulkSipTrunkingAuthentication.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func
}
