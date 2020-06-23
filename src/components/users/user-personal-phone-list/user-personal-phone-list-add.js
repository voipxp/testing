import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Input } from 'rbx'
import { useAlerts } from '@/store/alerts'
import {
  UiFormField,
  UiSection
} from '@/components/ui'
import UserPersonalPhoneListAPI from '@/api/users/user-personal-phone-list'

export const UserPersonalPhoneListAdd = ({
  userId,
  phoneInfo='',
  setPhoneInfo
}) => {
  const initialForm = {
    "userId": userId,
    "entries": {
		  "name": phoneInfo && phoneInfo.name || '',
		  "phoneNumber": phoneInfo && phoneInfo.phoneNumber || ''
	  }
  }

  const [form, setForm] = useState({...initialForm})
  const canSetPhoneInfo = _.isFunction(setPhoneInfo)
  const { alertDanger } = useAlerts()

  useEffect(() => {
    const validation = () => {
      if(!form.entries.name) {
        alertDanger('Name is required field')
        return false
      }
      else if(!form.entries.phoneNumber) {
        alertDanger('Phone Number is required field')
        return false
      }
      return true
    }

    const addPhone = async () => {
      const data = {
        userId: form.userId,
        entries : [
          form.entries
        ]
      }
      await UserPersonalPhoneListAPI.add(data)
      return Promise.resolve('Phone is added')
    }

    const updatePhone = async () => {
      const data = {
        'userId': form.userId,
        'newName': form.entries.name,
        'phoneNumber': form.entries.phoneNumber,
        'name': phoneInfo.name
      }

      await UserPersonalPhoneListAPI.update(data)
      return Promise.resolve('Phone is updated.')
    }

    const deletePhone = async () => {
      const userId = form.userId
      const entries = [{ 'name': phoneInfo.name }]
      await UserPersonalPhoneListAPI.remove(
        {
          userId: userId,
          entries: entries
        }
      )
      return Promise.resolve('Phone is deleted')
    }

    if(canSetPhoneInfo) {
      setPhoneInfo(
        {
          addPhone: addPhone,
          updatePhone: updatePhone,
          validation: validation,
          deletePhone: deletePhone
        }
      )
    }
  }, [form, canSetPhoneInfo, setPhoneInfo, alertDanger, phoneInfo])

  function handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const tempForm = {...form}

    tempForm["entries"][name] = value
    setForm({...tempForm})
  }

  return (
    <>
        <UiSection>
          {
          <>
          <UiFormField label="Name" horizontal >
            <Input
                type="text"
                onChange={handleInput}
                name="name"
                value={form.entries.name}
              />
            </UiFormField>
            <UiFormField label="Phone Number" horizontal >
              <Input
                type="text"
                onChange={handleInput}
                name="phoneNumber"
                value={form.entries.phoneNumber}
              />
            </UiFormField>
          </>
          }
        </UiSection>
    </>
  )
}

UserPersonalPhoneListAdd.propTypes = {
  userId: PropTypes.string,
  phoneInfo: PropTypes.object,
  setPhoneInfo: PropTypes.func
}
