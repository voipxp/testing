import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Input } from 'rbx'
import { UiCardModal, UiLoading, UiDataTable, UiFormField, UiCard, UiInputCheckbox, UiCheckbox } from '@/components/ui'
import groupServicesApi from '@/api/group-services'
import { useAsync } from 'react-async-hook'

const columns = [
  {
    key: 'serviceName',
    label: 'Service'
  },
  {
    key: 'limited',
    label: 'Limited'
  },
  {
    key: 'usage',
    label: 'Allocated'
  },
  {
    key: 'authorized',
    label: 'Authorized',
    // eslint-disable-next-line react/display-name
    render: row => <UiCheckbox isChecked={row.authorized} />
  },
  {
    key: 'assigned',
    label: 'Assigned',
    // eslint-disable-next-line react/display-name
    render: row => <UiCheckbox isChecked={row.assigned} />
  }
]

const initialForm = {
    authorized: true,
    assigned: true,
    isUnlimited: true,
    quantity:''
}

export const BulkSelectGroupServices = ({
  serviceProviderId,
  groupId,
  showSelect,
  setData
}) => {
  const [form, setForm] = useState({...initialForm})
  const [selectedServices, setSelectedServices] = useState([])
  const [editSettings, setEditSettings] = useState(false)

  const filterServices = (services) => {
    return services.map( service => {
          if(service.limited === "Limited") service.limited = service.quantity
          return service
        })
  }

  const {result, error, loading, execute} = useAsync(
    () => groupServicesApi.show(groupId, serviceProviderId)
    .then((services) => {
        return services["groupServices"]
    })
    .then((services) => {
      return filterServices(services)
    })
    ,[]
  )
  const services = result || []

  if(loading) return <UiLoading />

  const handleServices = (services) => {
    setSelectedServices(services)
    setEditSettings(true)
  }

  const handleInput = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    setForm({ ...form, [name]: value })
  }

  const saveSettings = () => {
    const services = editServices()
    setData(services)
    setEditSettings(false)
  }

  const editServices = () => {
    return selectedServices.map((service) => {
      const tempService = {}
      tempService['serviceName'] = service['serviceName']
      tempService['authorized'] = form.authorized
      tempService['assigned'] = form.assigned
      tempService['isUnlimited'] = form.isUnlimited
      tempService['licensed'] = true
      tempService['userAssignable'] = true
      if(form.isUnlimited) tempService['quantity'] = 1
      else tempService['quantity'] = form.quantity

      return tempService
    })
  }

  const serviceSettingModal = (
    <>
      <UiCardModal
          title="Edit Settings"
          isOpen={editSettings}
          onCancel={() => setEditSettings(false)}
    	    onSave={saveSettings}
        >
          <UiCard title="Authorization" horizontal>
              <UiInputCheckbox
                name="authorized"
                label="Service Authorized"
                checked={form.authorized}
                // onChange={handleInput}
              />
              <UiInputCheckbox
                name="assigned"
                label="Service Assigned"
                checked={form.assigned}
                //onChange={handleInput}
              />
          </UiCard>

          <UiCard title="Licensing" horizontal>
            <UiInputCheckbox
                name="isUnlimited"
                label="Unlimited Licenses"
                checked={form.isUnlimited}
                onChange={handleInput}
            />
            {
            (!form.isUnlimited)
            ?
            <UiFormField label="Licenses (Unlimited)" horizontal>
              <Input
                type='text'
                name="quantity"
                onChange={handleInput}
              />
            </UiFormField>
            :
            null
          }
          </UiCard>
      </UiCardModal>
    </>
  )

  return (
    <>
    { (editSettings && selectedServices.length > 0) ? serviceSettingModal : null}
     <UiDataTable
        columns={columns}
        rows={services || []}
        rowKey="serviceName"
        pageSize={50}
        showSelect={showSelect}
        onSelect={(items) => {handleServices(items)}}
    />
    </>
	)
}

BulkSelectGroupServices.propTypes = {
  serviceProviderId: PropTypes.string,
  groupId: PropTypes.string,
  showSelect: PropTypes.bool,
  setData: PropTypes.func
}
