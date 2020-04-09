import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import callCapacityApi from '@/api/group-services/group-trunk-group-call-capacity-service'
import { useAsync } from 'react-async-hook'
import { Input , Select} from 'rbx'
import {
  UiFormField,
  UiSection,
  UiLoading
} from '@/components/ui'
import {
  alertDanger
} from '@/store/alerts'

export const GroupTrunkGroupsCallCapacity = (
  {
    serviceProviderId,
    groupId,
    maxActiveCall,
    maxBurstCall,
    setData
  }
) => {
  const initialForm = {
    maxActiveCalls: 0,
    burstingMaxActiveCalls: 0
  }

  const [form, setForm] = useState({...initialForm})
  const {result, error, pending, loading, execute} = useAsync(
    () => callCapacityApi.show(serviceProviderId, groupId),[]
  )
  if(error) alertDanger(error)

  useEffect( () => {
    if( !loading && !error) {
      setForm(result)
    }
  },[result, loading, error])

  useEffect(() => {
    setData(form)
  }, [setData, form])

  if(loading) return <UiLoading />

  function handleInput(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    setForm({ ...form, [name]: value })
    // setData(form)
  }

  return (
    <>
      <UiSection>
        <UiFormField label="Max Active Calls" horizontal >
          <Input
            type="number"
            onChange={handleInput}
            name="maxActiveCalls"
            value={form.maxActiveCalls}
            min="-1"
            max={maxActiveCall}
          />
          {
            <small>
              <strong> (Max: {maxActiveCall}) </strong>
            </small>
          }

        </UiFormField>

        <UiFormField label="Max Bursting Calls" horizontal >
          <Input
            type="number"
            onChange={handleInput}
            name="burstingMaxActiveCalls"
            value={form.burstingMaxActiveCalls}
            min="-1"
            max={maxBurstCall}
          />
          {
            <small>
              <strong> (Max: {maxBurstCall}) </strong>
            </small>
          }
        </UiFormField>
      </UiSection>
    </>
	)
}

GroupTrunkGroupsCallCapacity.propTypes = {
  serviceProviderId: PropTypes.string.isRequired,
  setData: PropTypes.func,
  groupId: PropTypes.string,
  maxActiveCall: PropTypes.string,
  maxBurstCall: PropTypes.string
}