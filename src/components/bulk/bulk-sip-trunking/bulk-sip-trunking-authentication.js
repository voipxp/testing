import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiCardModal } from '@/components/ui'
import { Radio , Button } from 'rbx'

import { BulkSelectUserServices } from '../bulk-select-user-services'
import { BulkSelectServicesPack } from '../bulk-select-services-pack'
import { BulkImportService } from '@/components/bulk/service/bulk-import-service'
import { useAlerts } from '@/store/alerts'
import { StorageService } from '@/utils'

const initForm = {
  userService: 'skipUserServices',
  servicePacks: 'skipServicePacks'
}

export const BulkSipTrunkingAuthentication = ({
	initialData={},
	setToNext,
  handleWizData,
  localStorageKey
}) => {
  const [form, setForm] = useState({...initForm})
  const { serviceProviderId, groupId, sourceServiceProviderId, sourceGroupId } = initialData
  const { alertSuccess, alertDanger } = useAlerts()
  const [isNextBtnDisabled, setDisableNextButton] = useState(false)
  const [selectedUserServices, setSelectedUserServices] = useState([])
  const [selectedServicesPacks, setSelectedServicesPacks] = useState([])
  const [userServiceClicked, setUserServiceClicked] = useState(false)
  const [servicePackClicked, setServicePackClicked] = useState(false)

  const newServiceProviderId = sourceServiceProviderId !== '' ? sourceServiceProviderId : serviceProviderId
  const newGroupId = sourceGroupId !== '' ? sourceGroupId : groupId

  const clickUserService = () => {
    setUserServiceClicked(true)
  }

  const clickServicePack = () => {
    setServicePackClicked(true)
  }

  const handleInput = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    const tempForm = {...form}
    tempForm[name] = value
    setForm({...tempForm})
    if(value === 'skipUserServices') setSelectedUserServices([])
    if(value === 'skipServicePacks') setSelectedServicesPacks([])
  }

  useEffect( () => {
      if(!userServiceClicked && !servicePackClicked) {
        if(selectedUserServices.length === 0 && selectedServicesPacks.length === 0 ) {
          StorageService.clearStorage(localStorageKey)
        }
        else createTask()
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserServices, selectedServicesPacks])

	const createTask = () => {
    setUserServiceClicked(false)
    setServicePackClicked(false)

		prepareImportData().then((data) => {
      Promise.all([BulkImportService.handleFileData(data, localStorageKey)]).then( (data) => {
        alertSuccess('Task is created Successfully.')
        setDisableNextButton(false)
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

const prepareImport = () => {
    // const tasks = []

    // const services = {
    //   userServices: [],
    //   servicePackServices: []
    // }
    // // eslint-disable-next-line unicorn/no-for-loop
    // for (let i = 0; i < selectedUserServices.length; i++) {
    //   services['userServices'][i] = {}
    //   services['userServices'][i]['serviceName'] = selectedUserServices[i]
    //   services['userServices'][i]['assigned'] = true
    // }
    // // eslint-disable-next-line unicorn/no-for-loop
    // for (let i = 0; i < selectedServicesPacks.length; i++) {
    //   services['servicePackServices'][i] = {}
    //   services['servicePackServices'][i]['serviceName'] = selectedServicesPacks[i]
    //   services['servicePackServices'][i]['assigned'] = true
    // }

    // const task = Object.assign(
    //   {
    //     task: 'user.services.update',
    //     userId: '', /* userId will be set on users task */
    //     serviceProviderId: serviceProviderId,
    //     groupId: groupId
    //   },
    //   services
    // )

    // if(services.userServices.length > 0 || services.servicePackServices.length > 0) {
    //   tasks.push(task)
    // }

    // return tasks
}


  return (
    <>
        <p>This is Sip Trunking.</p>
    </>
	)
}

BulkSipTrunkingAuthentication.propTypes = {
  localStorageKey: PropTypes.string,
  initialData: PropTypes.object,
  handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func
}
