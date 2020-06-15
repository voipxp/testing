import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { UiCard, UiCardModal, UiButton, UiLoadingModal } from '@/components/ui'
import { UserPersonalPhoneListSelect } from '@/components/users/user-personal-phone-list'
import { useAlerts } from '@/store/alerts'
import { UserPersonalPhoneListAdd } from '@/components/users/user-personal-phone-list'

export const UserPersonalPhoneList = ({ match, history }) => {
const { alertSuccess, alertDanger } = useAlerts()
const { userId } = match.params
const [newPhoneClicked, setNewPhoneClicked] = useState(false)
const [selectedPhone, setSelectedPhone] = useState({})
const [updatePhone, setUpdatePhone] = useState(false)
const [phoneInfo, setPhoneInfo] = useState({})
const [showConfirm, setShowConfirm] = useState(false)
const [loading, setLoading] = useState(false)

const addPhone = async () => {
  try {
    if(!phoneInfo.validation()) return false
    setLoading(true)
    await phoneInfo.addPhone()
    .then((result) => {
      setLoading(false)
      alertSuccess('Phone is added')
      setNewPhoneClicked(false)
    })
  } catch (error) {
    alertDanger(error)
    setLoading(false)
  }
}

const editPhone = async () => {
  try {
    if(!phoneInfo.validation()) return false
    setLoading(true)
    await phoneInfo.updatePhone()
    setLoading(false)
    alertSuccess('Phone is updated')
    setUpdatePhone(false)
  } catch (error) {
    alertDanger(error)
    setUpdatePhone(false)
    setLoading(false)
  }
}

const deletePhone = async () => {
  try {
    setLoading(true)
    await phoneInfo.deletePhone()
    setLoading(false)
    alertSuccess('Phone is deleted.')
    setUpdatePhone(false)
    setShowConfirm(false)
  } catch (error) {
    alertDanger(error)
    setUpdatePhone(false)
    setLoading(false)
  }
}

const setPhone = phone => {
  setSelectedPhone(phone)
  setUpdatePhone(true)
}

const setPhoneDetails = useCallback(phoneInfo => {
  setPhoneInfo(phoneInfo)
}, [])

const addNewPhoneModal = (
  <>
    <UiCardModal
      title="New Phone"
      isOpen={newPhoneClicked}
      onCancel={() => setNewPhoneClicked(false)}
      onSave={addPhone}
    >
      <UserPersonalPhoneListAdd
        userId={userId}
        setPhoneInfo={setPhoneDetails}
      />
    </UiCardModal>
  </>
)

const deletePhoneConfirmModal = (
    <UiCardModal
      title="Please Confirm"
      isOpen={showConfirm}
      onCancel={() => setShowConfirm(false)}
      onDelete={deletePhone}
    >
      <blockquote>
        Are you sure you want to delete this phone {selectedPhone.name}?
      </blockquote>
    </UiCardModal>
)

const updatePhoneModal = (
  <>
    <UiCardModal
      title="New Phone"
      isOpen={updatePhone}
      onDelete={() => setShowConfirm(true)}
      onCancel={() => setUpdatePhone(false)}
      onSave={editPhone}
    >
      <UserPersonalPhoneListAdd
        userId={userId}
        setPhoneInfo={setPhoneDetails}
        phoneInfo={selectedPhone}
      />
    </UiCardModal>
  </>
)

if(loading) {
  return <UiLoadingModal isOpen={loading} />
}

  return (
    <>
    { newPhoneClicked && addNewPhoneModal }
    { updatePhone && updatePhoneModal }
    { showConfirm && deletePhoneConfirmModal }

    <UiCard
        title="Personal Phone List"
        buttons={
          <>
            <UiButton
              color="link"
              icon="add"
              size="small"
              onClick={() => setNewPhoneClicked(true)}
            />
          </>
        }
      >
      <UserPersonalPhoneListSelect
        userId={userId}
        setSelectedPhone={(phone) => setPhone(phone)}
      />
      </UiCard>
    </>
  )
}

UserPersonalPhoneList.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired
}
