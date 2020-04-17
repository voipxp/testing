import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import callCapacityApi from '@/api/service-providers-services/service-provider-trunk-group-call-capacity-service'
import { useAsync } from 'react-async-hook'
import { Input } from 'rbx'
import { UiFormField, UiSection, UiLoading } from '@/components/ui'
import { alertDanger } from '@/store/alerts'

export const ServiceProviderTrunkGroupsCallCapacity = ({
  serviceProviderId,
  setData
}) => {
  const initialForm = {
    maxActiveCalls: 0,
    burstingMaxActiveCalls: 0
  }

  const [form, setForm] = useState({ ...initialForm })
  const { result, error, loading } = useAsync(
    () => callCapacityApi.show(serviceProviderId),
    []
  )
  if (error) alertDanger(error)

  useEffect(() => {
    if (!loading && !error) {
      setForm(result)
    }
  }, [result, loading, error])

  useEffect(() => {
    setData(form)
  }, [setData, form])

  if (loading) return <UiLoading />

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
        <UiFormField label="Max Active Calls" horizontal>
          <Input
            type="number"
            onChange={handleInput}
            name="maxActiveCalls"
            value={form.maxActiveCalls}
            min="-1"
          />
          {form.maxActiveCalls === '-1' ? (
            <small>
              <strong>Unlimited</strong>
            </small>
          ) : (
            <small>
              <strong>Set to -1 for Unlimited</strong>
            </small>
          )}
        </UiFormField>

        <UiFormField label="Max Bursting Calls" horizontal>
          <Input
            type="number"
            onChange={handleInput}
            name="burstingMaxActiveCalls"
            value={form.burstingMaxActiveCalls}
            min="-1"
          />
          {form.burstingMaxActiveCalls === '-1' ? (
            <small>
              <strong>Unlimited</strong>
            </small>
          ) : (
            <small>
              <strong>Set to -1 for Unlimited</strong>
            </small>
          )}
        </UiFormField>
      </UiSection>
    </>
  )
}

ServiceProviderTrunkGroupsCallCapacity.propTypes = {
  serviceProviderId: PropTypes.string.isRequired,
  setData: PropTypes.func
}
