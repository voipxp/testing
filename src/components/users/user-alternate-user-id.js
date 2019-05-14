import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Field, Control, Button, Input, Select, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAlerts } from '@/store/alerts'
import {
  UiCard,
  UiLoadingCard,
  UiDataTable,
  UiButton,
  UiCardModal
} from '@/components/ui'
import apiUserService from '@/api/user-alternate-user-id'
export const UserAlternateUserId = ({ match }) => {
  const [loading, setLoading] = useState(true)
  const [alternateUserUd, setAlternateUserId] = React.useState('')
  const [maxAltnerateUsers, setMaxAltenateUsers] = useState(false)
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const [isModal, setModal] = useState(false)
  const [isError, setIsError] = useState(false)
  const [savedAlternateUserIds, setAlternateUserIds] = useState([])
  const columns = [
    { key: 'userId', label: 'Alternate User Id' },
    { key: 'description', label: 'Description' }
  ]

  const handleAlternateUserId = (e, index) => {
    console.log(e.target.value, index)
    setAlternateUserId(e.target.value)
  }

  function edit(alternateUserId) {
    setModal(true)
    console.log(alternateUserId)
  }

  function save(shitballs) {
    console.log(shitballs)
    setAlternateUserIds(savedAlternateUserIds)
    alertSuccess('Saved Alternate User IDs')
    setModal(false)
  }
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const result = await apiUserService.show(userId)
        console.log('result', result)
        if (result.users.length >= 4) {
          setMaxAltenateUsers(true)
          console.log(result.users.length)
        }
        setAlternateUserIds(result.users)
      } catch (error) {
        setIsError(true)
      }
      setLoading(false)
    }
    fetchData()
  }, [userId])

  return (
    <>
      {isError && <div>Error loading Alternate User IDs</div>}
      {loading ? (
        <UiLoadingCard />
      ) : (
        <>
          <UiCard
            title="Alternate User IDs"
            buttons={
              <UiButton
                enabled="false"
                color="info"
                icon="add"
                size="small"
                onClick={() => setModal(true)}
              />
            }
          >
            <UiDataTable
              columns={columns}
              rows={savedAlternateUserIds}
              rowKey="userId"
              hideSearch={true}
              onClick={alternateUserId => edit(alternateUserId)}
            />
          </UiCard>
          <UiCardModal
            title="Alternate User IDs"
            isOpen={isModal}
            onCancel={() => setModal(false)}
            onSave={() => save(savedAlternateUserIds)}
          >
            <form style={{ marginBottom: '1rem' }} onSubmit={save}>
              <Field>
                <Control>
                  <Input
                    type="text"
                    name="user1"
                    value={
                      savedAlternateUserIds[0] &&
                      savedAlternateUserIds[0].userId
                    }
                    onChange={handleAlternateUserId}
                  />
                </Control>
                <Control>
                  <Input
                    type="text"
                    name="description1"
                    value={
                      savedAlternateUserIds[0] &&
                      savedAlternateUserIds[0].description
                    }
                    onChange={e => handleAlternateUserId(e, 0)}
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Input
                    type="text"
                    name="user2"
                    value={
                      savedAlternateUserIds[1] &&
                      savedAlternateUserIds[1].userId
                    }
                    onChange={handleAlternateUserId}
                  />
                </Control>
              </Field>
            </form>
          </UiCardModal>
        </>
      )}
    </>
  )
}
UserAlternateUserId.propTypes = {
  match: PropTypes.object.isRequired
}
