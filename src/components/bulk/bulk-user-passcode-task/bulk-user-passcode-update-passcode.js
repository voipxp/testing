import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Input, Radio, Button } from 'rbx'
import { BulkTagInput } from '../../bulk/bulk-tag-input'
import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import { useAlerts } from '@/store/alerts'
import {
  UiCard,
  UiFormField,
  UiSection,
  UiButton,
  UiCardModal
} from '@/components/ui'

export const BulkUserPasscodeUpdatePasscode = ({
  initialData = {},
  complete
}) => {
  const initialForm = {
    passcodeAction: '{{ generatePasscode }}',
    passcode: '{{ generatePasscode }}'
  }
  const { alertSuccess, alertDanger } = useAlerts()
  const [form, setForm] = useState({ ...initialForm })
  const { users, serviceProviderId, groupId } = initialData
  const [isPasscodeVisible, setPasscodeVisible] = useState(false)
  const [tagBundleTemplateClick, setTagBundleTemplateClick] = React.useState(false)
  const [selectedTagInput, setSelectedTagInput] = React.useState('')
  const [disableBtn, setDisableBtn] = useState(false)

  useEffect(() => {
    const disableBtn = form.passcode
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

    if(name === 'passcodeAction') {
      setPasscodeVisible(value === 'manual')
      tempForm['passcode'] = value === 'manual' ? '': value
    }

    tempForm[name] = value
    setForm({ ...tempForm })
  }

  const handleTask = () => {
    createTask()
    .then(() => {
      complete()
    })
  }

  const prepareImport = () => {
    const tasks = []
    users.forEach(( (el, index) => {
      const task = {
        task: 'user.portal.passcode.update',
        userId: el.userId,
        passcode: form.passcode,
        serviceProviderId: serviceProviderId,
        groupId: groupId,
        index: index,
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
      <UiCard title="Passcode Update">
      {/* Passcode */}
        <UiSection title="Want to set the Passcode?">
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
                  onClick={() => tagInputClicked('passcode')}
                />
              <Input
                  style={{ width: '92%' }}
                  type="text"
                  name="passcode"
                  value={form.passcode}
                  onChange={handleInput}
                />
            </UiFormField>
          )}
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

BulkUserPasscodeUpdatePasscode.propTypes = {
  initialData: PropTypes.object,
  complete: PropTypes.func
}
