import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { UiCard, UiSelectableTable, UiLoading, UiDataTable } from '@/components/ui'
import { useAlerts } from '@/store/alerts'
import { Button } from 'rbx'
import userApi from '@/api/users'


export const BulkSelectUserId = (props) => {
  const { serviceProviderId, groupId } = props
  //const [isNextBtnDisabled, setDisableNextButton] = useState(false)
  const [availableUser, setAvailableUser] = useState([])
  const [selectedUser, setSelectedUser] = useState([])
  const { alertDanger } = useAlerts()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async() => {
      try {
          const users = await userApi.search({serviceProviderId, groupId})
          setAvailableUser(users)
          setLoading(false)
      } catch(error) {
          setLoading(false)
          //alertDanger(error)
      }
    }
    fetchUsers()
  }, [alertDanger, serviceProviderId, groupId])

  useEffect( () => {
    props.settUsers(
      {
        availableUser: availableUser,
        selectedUser: selectedUser
      }
    )
  }, [availableUser, selectedUser])

  if(loading) return <UiLoading />

  // const handleUsers = () => {
  //   const tempData = {...props.initialData, 'users': selectedUser}
  //   props.handleWizData(tempData)
  //   // setDisableNextButton(false)
  //   props.setToNext()
  // }

  return (
    <>
      <UiSelectableTable
        title="Users"
        availableUser={availableUser}
        setAvailableUser={(availableItem) => setAvailableUser(availableItem)}
        selectedUser={selectedUser}
        setSelectedUser={(selectedItem) => setSelectedUser(selectedItem)}
        rowKey='userId'
      />
    </>
	)
}

BulkSelectUserId.propTypes = {
  // initialData: PropTypes.object.isRequired,
  //handleWizData: PropTypes.func.isRequired,
  setToNext: PropTypes.func,
  settUsers: PropTypes.func
}
