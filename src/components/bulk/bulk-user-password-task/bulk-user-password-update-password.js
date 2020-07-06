import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Input, Radio, Button } from 'rbx'
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

export const BulkUserPasswordUpdatePassword = ({
  initialData = {},
  setToNext,
  complete,
  handleWizData
}) => {
  const handleTask = () => {
      createTask()
      .then(() => {
        complete()
      })
  }

  const initialForm = {
    userName: '',
    passwordAction: '{{ generatePassword }}',
    passcodeAction: '{{ generatePasscode }}',
    authPasswordAction: '{{ generateSipPassword }}',
    newPassword: '{{ generatePassword }}',
    newPasscode: '{{ generatePasscode }}',
    newAuthPassword: '{{ generateSipPassword }}',
    resetDevice: true,
    rebuildDevice: true
  }

  const [form, setForm] = useState({ ...initialForm })
  const { users, serviceProviderId, groupId } = initialData
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  const [isPasscodeVisible, setPasscodeVisible] = useState(false)
  const [isAuthPasswordVisible, setAuthPasswordVisible] = useState(false)
  const { alertSuccess, alertDanger } = useAlerts()
  const [tagBundleTemplateClick, setTagBundleTemplateClick] = React.useState(false)
  const [selectedTagInput, setSelectedTagInput] = React.useState('')
  const [disableBtn, setDisableBtn] = useState(true)

  useEffect(() => {
    const disableBtn = form.newPassword && form.newPasscode && form.userName && form.newAuthPassword
    setDisableBtn(!disableBtn)
  }, [form])

  const handleInput = event => {
    const tempForm = { ...form }
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    tempForm[name] = value
    setForm({ ...tempForm })
  }

  const handleInputRadio = event => {
    const tempForm = { ...form }
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    if(name === 'passwordAction') {
      setPasswordVisible(value === 'manual')
      tempForm['newPassword'] = value === 'manual' ? '' : value
    }
    if(name === 'passcodeAction') {
      setPasscodeVisible(value === 'manual')
      tempForm['newPasscode'] = value === 'manual' ? '': value
    }
    if(name === 'authPasswordAction') {
      setAuthPasswordVisible(value === 'manual')
      tempForm['newAuthPassword'] = value === 'manual' ? '' : value
    }

    tempForm[name] = value
    setForm({ ...tempForm })
  }

  const prepareImport = () => {
    const tasks = []
    users.forEach(( (el, index) => {
      const task = {
        task: 'user.passwords.update',
        userId: el.userId,
        userName: form.userName,
        newPassword: form.newPassword,
        newPasscode: form.newPasscode,
        newAuthenticationPassword: form.newAuthPassword,
        index: index,
        resetDevice: form.resetDevice,
        rebuildDevice: form.rebuildDevice,
        serviceProviderId: serviceProviderId,
        groupId: groupId
      }
      tasks.push(task)
    }))

    return tasks
  }

  const createTask = () => {
    return new Promise( (resolve, reject) => {
      prepareImportData().then(data => {
        Promise.all([BulkImportService.handleFileData(data, 'BulkImportService')])
          .then(data => {
            alertSuccess('Task is created Successfully.')
            return resolve('success')
          })
          .catch(error => {
            alertDanger(error || 'Data Import Error')
            return reject('failed')
          })
      })
    })
  }

  const prepareImportData = () => {
    return Promise.all(prepareImport()).then(data => {
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
          onSelect={tag => handleTagSelect(selectedTagInput, tag)}
        />
      </UiCardModal>
    </>
  )

  const handleTagSelect = (elName, tag) => {
    const tagTempForm = { ...form }
    const oldValue = tagTempForm[elName] || ''
    const value = oldValue + tag.tag
    tagTempForm[elName] = value

    setForm({ ...tagTempForm })
    setTagBundleTemplateClick(false)
  }

  const tagInputClicked = elNane => {
    setSelectedTagInput(elNane)
    setTagBundleTemplateClick(true)
  }

  return (
    <>
      {tagBundleTemplateClick ? selectTagModal : null}
      <UiCard title="Passwords Update">
        <UiSection title="Set the Username">
            <UiFormField
              style={{ flexGrow: '1', flexShrink: '1' }}
              label="Username" horizontal
            >
                <UiButton
                  style={{ height: '35px', width: '5%' }}
                  color="link"
                  icon="tag"
                  size="small"
                  onClick={() => tagInputClicked('userName')}
                />
                <Input
                  style={{ width: '92%' }}
                  type="text"
                  name="userName"
                  value={form.userName}
                  onChange={handleInput}
                />
            </UiFormField>
        </UiSection>

        <UiSection title="Do you want to set the Password ? ">
          <Radio
            type="radio"
            value="{{ generatePassword }}"
            name="passwordAction"
            checked={form.passwordAction === '{{ generatePassword }}'}
            onChange={handleInputRadio}
          /> Auto-Generate Password
          <br />
          <Radio
            type="radio"
            value="manual"
            name="passwordAction"
            checked={form.passwordAction === 'manual'}
            onChange={handleInputRadio}
          /> Enter Password
          <br />
          <br />
          {isPasswordVisible && (
            <UiFormField
              style={{ flexGrow: '1', flexShrink: '1' }}
              label="Password" horizontal
            >
                <UiButton
                  style={{ height: '35px', width: '5%' }}
                  color="link"
                  icon="tag"
                  size="small"
                  onClick={() => tagInputClicked('newPassword')}
                />
              <Input
                  style={{ width: '92%' }}
                  type="text"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleInput}
                />
            </UiFormField>
          )}
        </UiSection>

      {/* Passcode */}
        <UiSection title="Do you want to set the Passcode ?">
          <Radio
            type="radio"
            value="{{ generatePasscode }}"
            name="passcodeAction"
            checked={form.passcodeAction === '{{ generatePasscode }}'}
            onChange={handleInputRadio}
          /> Auto-Generate Passcode
          <br />
          <Radio
            type="radio"
            value="manual"
            name="passcodeAction"
            checked={form.passcodeAction === 'manual'}
            onChange={handleInputRadio}
          /> Enter Passcode
          <br />
          <br />
          {isPasscodeVisible && (
            <UiFormField
              style={{ flexGrow: '1', flexShrink: '1' }}
              label="Passcode" horizontal
            >
                <UiButton
                  style={{ height: '35px', width: '5%' }}
                  color="link"
                  icon="tag"
                  size="small"
                  onClick={() => tagInputClicked('newPasscode')}
                />
              <Input
                  style={{ width: '92%' }}
                  type="text"
                  name="newPasscode"
                  value={form.newPasscode}
                  onChange={handleInput}
                />
            </UiFormField>
          )}
        </UiSection>

        {/* AuthenticationPassword */}
        <UiSection title="Do you want to set the Authentication Password ?">
          <Radio
            type="radio"
            value="{{ generateSipPassword }}"
            name="authPasswordAction"
            checked={form.authPasswordAction === '{{ generateSipPassword }}'}
            onChange={handleInputRadio}
          /> Auto-Generate Authentication Password
          <br />
          <Radio
            type="radio"
            value="manual"
            name="authPasswordAction"
            checked={form.authPasswordAction === 'manual'}
            onChange={handleInputRadio}
          /> Enter Authentication Password
          <br />
          <br />
          {isAuthPasswordVisible && (
            <UiFormField
              style={{ flexGrow: '1', flexShrink: '1' }}
              label="Authentication Password" horizontal
            >
                <UiButton
                  style={{ height: '35px', width: '5%' }}
                  color="link"
                  icon="tag"
                  size="small"
                  onClick={() => tagInputClicked('newAuthPassword')}
                />
              <Input
                  style={{ width: '92%' }}
                  type="text"
                  name="newAuthPassword"
                  value={form.newAuthPassword}
                  onChange={handleInput}
                />
            </UiFormField>
          )}
        </UiSection>

        <UiSection title="Rebuild and Reset Device?">
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
      <div style={{ marginTop: '20px' }}>
        <Button
          style={{ float: 'right' }}
          color="success"
          onClick={handleTask}
          disabled={disableBtn}
        >
          Done
        </Button>
      </div>
    </>
  )
}

BulkUserPasswordUpdatePassword.propTypes = {
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func,
  complete: PropTypes.func
}
