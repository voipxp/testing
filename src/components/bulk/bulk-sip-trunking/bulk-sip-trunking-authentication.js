import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types' 
import {   Input , Radio ,Button } from 'rbx' 
import { BulkTagInput } from '../../bulk/bulk-tag-input'
import {
  UiCard,
  UiFormField,
  UiSection,
  UiButton,
  UiCardModal
} from '@/components/ui'
 
import { useAlerts } from '@/store/alerts'
import { StorageService } from '@/utils'


export const BulkSipTrunkingAuthentication = ({
	initialData={},
	setToNext,
  handleWizData,
  localStorageKey
}) => {
  
const templates = {
  password: '{{ generateSipPassword }}',
  passcode: '{{ generatePasscode }}'
}

const initialForm =
{
  userName:null,
  userNameAction  : 'manual',
  passwordAction  : 'auto',
  newPassword   	: null
}

  const [form, setForm] = useState({...initialForm})
 const [isNextBtnDisabled, setDisableNextButton] = useState(true)
  const [isUserName, setUserNameVisible] = useState(true)
  const [isPasswordVisible, setPasswordVisible] = useState(false)
  
  const [tagBundleTemplateClick, setTagBundleTemplateClick] = React.useState(false)
  const [selectedTagInput, setSelectedTagInput] = React.useState('')
   
  const handleInput = (event) => {
     const tempForm = {...form}
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    if(name ==='userNameAction' && value !== 'skip' ){
      setUserNameVisible(true)
    } 
    if(name ==='userNameAction' && value === 'skip' ){
      setUserNameVisible(false)
      tempForm.userName = null
    }

    if((name ==='passwordAction' && value === 'skip') ){
      setPasswordVisible(false)
      tempForm.newPassword = null
    } 
    if(name ==='passwordAction' && value === 'manual' ){
      setPasswordVisible(true)
      tempForm.newPassword = null
    }

    if(name ==='passwordAction' && value === 'auto' ){
      setPasswordVisible(false)
      tempForm.newPassword= '{{ generateSipPassword }}' 
      tempForm.name = value
    }  
 

    if( (  
      (name ==='passwordAction' && value === 'skip') || (name ==='userName' && value === '') )
        && 
        ( (name ==='passwordAction' && value === 'skip') || (name ==='newPassword' && value === '') ) 
      ) {
        setDisableNextButton(true)
    }
     tempForm[name] = value
    setForm({ ...tempForm })

 

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

  const handleTagSelect = (elName, tag) => {
    const tagTempForm = {...form}
    let oldValue = ''
    if(elName === 'linePort') {
      oldValue = tagTempForm.trunkAddressing.trunkGroupDeviceEndpoint.linePort || ''
    }
    else {
      oldValue = tagTempForm[elName] || ''
    }
    const value = oldValue + tag.tag
    if(elName === 'linePort') {
      tagTempForm.trunkAddressing.trunkGroupDeviceEndpoint.linePort = value
    }
    else tagTempForm[elName] = value

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
    <div className="dropdown is-hoverable">
    <div className="dropdown-trigger">
      <button className="button">
        <span className="ng-binding">1 Users Selected</span>
        <span className="icon is-small">
          <i className="fas fa-cog"></i>
        </span>
      </button>
    </div>
    <div className="dropdown-menu">
      <div className="dropdown-content">
        <div className="dropdown-item">
         {'Surendra'}
        </div>
      </div>
    </div>
  </div>
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
          value='auto'
          name ="passwordAction"
          checked={form.passwordAction === 'auto'}
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
            onClick={() => tagInputClicked('password')}
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
    </UiCard>
      <div style={{marginTop: '20px'}}>
        <Button style={{float: 'right'}}
          color="link"
          onClick={ setToNext }
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
