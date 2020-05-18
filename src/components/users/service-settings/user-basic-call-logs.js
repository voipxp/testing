import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUi } from '@/store/ui'
import { Input } from 'rbx'
import { useAlerts } from '@/store/alerts'
import { useQuery, setQueryData } from 'react-query'
import api from '@/api/user-services-settings/user-basic-call-logs-service'
 
import {
  UiButton,
  UiCard,
  UiCheckbox,
  UiFormField,
  UiInputCheckbox,
  UiListItem,
  UiLoadingCard,
  UiSection,
  UiDataTable
} from '@/components/ui'


const columns = [
  { key: 'phoneNumber', label: 'Number' },
  { key: 'name', label: 'Name' },
  { key: 'time', label: 'Date' },
   
]

export const UserBasicCallLogs = ({ match }) => {
  const { userId } = match.params
  const { alertSuccess, alertDanger } = useAlerts()
  const { showLoadingModal, hideLoadingModal } = useUi()
  const [form, setForm] = useState({})
  const [showModal, setShowModal] = useState(false)
  
  const { data: result, isLoading, error } = useQuery(
    'user-basic-call-logs',
	  () => api.show(userId)		
  )
  const userServiceData = result || {} 
  const tab = 'placed'
  console.log(result)

  if (error) alertDanger(error)
  if (isLoading) return <UiLoadingCard />
   
  return (
    <>
      <UiCard
        title="Basic Call Logs"
      >
         <div className="tabs">
      <ul>
      <li className="{'is-active': tab === 'placed'}">
          <a ng-click="tab = 'placed'">Placed</a>
        </li>
        <li ng-class="{'is-active': $ctrl.tab === 'received'}">
          <a ng-click="tab = 'received'">Received</a>
        </li>
        <li ng-class="{'is-active': $ctrl.tab === 'missed'}">
          <a ng-click="tab = 'missed'">Missed</a>
        </li>
      </ul>
    </div> 


        <UiDataTable
          columns={columns}
          rows={true}
          rowKey="userId"
          pageSize={50}
          onClick={true}
        />
      </UiCard>
 
    </>
  )
}
UserBasicCallLogs.propTypes = {
  match: PropTypes.object.isRequired
}
