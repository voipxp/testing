import React from 'react'
import PropTypes from 'prop-types'
import { useReduxDispatch } from 'reactive-react-redux'
import { Field, Control, Button, Input, Select, Tag } from 'rbx'
import { UiCard } from '@/components/ui'
import { saveUserProfile } from '@/store/auto-attendant'

const types = [
  { key: 'select', name: 'Please select...' },
  { key: 'basic', name: 'Basic' },
  { key: 'standard', name: 'Standard' }
]

const domains = [
  { key: 'select', name: 'Please select...' },
  { key: 'parkbenchsolutions.com', name: 'parkbenchsolutions.com' }
]

const numbers = [
  { key: 'select', name: 'Please select...' },
  { key: 'number1', name: '1234567890' },
  { key: 'number2', name: '2345678901' },
  { key: 'number3', name: '3456789012' }
]

const services = [
  { key: 'select', name: 'Please select...' },
  { key: 'anonymousCallRejection', name: 'Anonymous Call Rejection' },
  { key: 'authentication', name: 'Authentication' },
  { key: 'callForwardingAlways', name: 'Call Forwarding Always' }
]

export const CreateAutoAttendantProfile = props => {
  const dispatch = useReduxDispatch()

  const [typeKey, setTypeKey] = React.useState('')
  const [domainKey, setDomainKey] = React.useState('')
  const [numberKey, setNumberKey] = React.useState('')
  const [serviceKey, setServiceKey] = React.useState('')
  const [usernameString, setUsernameString] = React.useState('')
  const [extensionString, setExtensionString] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleTypeSelect = e => {
    setTypeKey(e.target.value)
  }

  const handleDomainSelect = e => {
    setDomainKey(e.target.value)
  }

  const handleNumberSelect = e => {
    setNumberKey(e.target.value)
  }

  const handleServiceSelect = e => {
    setServiceKey(e.target.value)
  }

  const handleUsername = e => {
    setUsernameString(e.target.value)
  }

  const handleExtension = e => {
    setExtensionString(e.target.value)
  }

  const next = e => {
    e.preventDefault()
    setLoading(true)
    dispatch(
      saveUserProfile({
        type: typeKey,
        domain: domainKey,
        number: numberKey,
        service: serviceKey,
        username: usernameString,
        extension: extensionString
      })
    )
    props.onSubmit()
  }

  const cancel = e => {
    e.preventDefault()
    setLoading(true)
  }

  return (
    <>
      <UiCard title="Create Auto Attendant">
        <form style={{ marginBottom: '1rem' }} onSubmit={next}>
          <Field horizontal kind="addons">
            <Field.Label>
              <Tag color="link" size="medium">
                Type
              </Tag>
            </Field.Label>
            <Field.Body>
              <Control>
                <Select.Container>
                  <Select
                    disabled={loading}
                    value={typeKey}
                    onChange={handleTypeSelect}
                    name="typeKey"
                  >
                    {types.map(type => (
                      <Select.Option key={type.key} value={type.key}>
                        {type.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Select.Container>
              </Control>
            </Field.Body>
          </Field>

          <Field horizontal>
            <Field.Label>
              <Tag color="link" size="medium">
                Service ID
              </Tag>
            </Field.Label>
            <Field.Body>
              <Control>
                <Input
                  type="text"
                  placeholder="UserID"
                  onChange={handleUsername}
                  disabled={loading}
                  name="usernameString"
                  value={usernameString}
                />
              </Control>
              <Control>
                <Tag color="link" size="medium">
                  @
                </Tag>
              </Control>
              <Control>
                <Select.Container>
                  <Select
                    disabled={loading}
                    value={domainKey}
                    onChange={handleDomainSelect}
                    name="domainKey"
                  >
                    {domains.map(domain => (
                      <Select.Option key={domain.key} value={domain.key}>
                        {domain.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Select.Container>
              </Control>
            </Field.Body>
          </Field>

          <Field horizontal>
            <Field.Label>
              <Tag color="link" size="medium">
                Phone Number
              </Tag>
            </Field.Label>
            <Field.Body>
              <Control>
                <Select.Container>
                  <Select
                    disabled={loading}
                    value={numberKey}
                    onChange={handleNumberSelect}
                    name="numberKey"
                  >
                    {numbers.map(number => (
                      <Select.Option key={number.key} value={number.name}>
                        {number.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Select.Container>
              </Control>
            </Field.Body>
          </Field>

          <Field horizontal>
            <Field.Label>
              <Tag color="link" size="medium">
                Extension
              </Tag>
            </Field.Label>
            <Field.Body>
              <Control>
                <Input
                  type="text"
                  placeholder="Extension"
                  onChange={handleExtension}
                  disabled={loading}
                  name="extensionString"
                  value={extensionString}
                />
              </Control>
            </Field.Body>
          </Field>

          <Field horizontal>
            <Field.Label>
              <Tag color="link" size="medium">
                Service
              </Tag>
            </Field.Label>
            <Field.Body>
              <Control>
                <Select.Container>
                  <Select
                    disabled={loading}
                    value={serviceKey}
                    onChange={handleServiceSelect}
                    name="serviceKey"
                  >
                    {services.map(service => (
                      <Select.Option key={service.key} value={service.key}>
                        {service.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Select.Container>
              </Control>
            </Field.Body>
          </Field>
          <Field horizontal kind="group">
            <Button.Group>
              <Button
                type="reset"
                state={loading ? 'loading' : ''}
                onClick={cancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                state={loading ? 'loading' : ''}
                color="success"
              >
                Next
              </Button>
            </Button.Group>
          </Field>
        </form>
      </UiCard>
    </>
  )
}

CreateAutoAttendantProfile.propTypes = { onSubmit: PropTypes.func.isRequired }
