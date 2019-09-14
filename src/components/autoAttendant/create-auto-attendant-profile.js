import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Field, Control, Button, Input, Select, Tag, Help } from 'rbx'
import { UiCard } from '@/components/ui'
import { useAutoAttendant } from '@/store/auto-attendant'

const types = [
  { key: 'select', name: 'Please select...' },
  { key: 'basic', name: 'Basic' },
  { key: 'standard', name: 'Standard' }
]

const services = [
  { key: 'select', name: 'Please select...' },
  { key: 'anonymousCallRejection', name: 'Anonymous Call Rejection' },
  { key: 'authentication', name: 'Authentication' },
  { key: 'callForwardingAlways', name: 'Call Forwarding Always' }
]

export const CreateAutoAttendantProfile = withRouter(props => {
  const {
    autoAttendant,
    getDomains,
    getNumbers,
    saveUserProfile,
    clearAutoAttendant
  } = useAutoAttendant()
  const [typeKey, setTypeKey] = React.useState('')
  const [domainKey, setDomainKey] = React.useState('')
  const [numberKey, setNumberKey] = React.useState('')
  const [serviceKey, setServiceKey] = React.useState('')
  const [usernameString, setUsernameString] = React.useState('')
  const [extensionString, setExtensionString] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [helpText, setHelpText] = React.useState('')

  React.useEffect(() => {
    setLoading(true)
    Promise.all([
      getDomains(props.groupId, props.serviceProviderId),
      getNumbers(props.groupId, props.serviceProviderId)
    ]).then(() => setLoading(false))
  }, [getDomains, getNumbers, props.groupId, props.serviceProviderId])

  React.useEffect(() => {
    clearAutoAttendant()
  }, [clearAutoAttendant])

  const handleTypeSelect = e => {
    if (helpText === 'type') {
      setHelpText('')
    }
    setTypeKey(e.target.value)
  }

  const handleDomainSelect = e => {
    setDomainKey(e.target.value)
  }

  const handleNumberSelect = e => {
    if (helpText === 'number') {
      setHelpText('')
    }
    setNumberKey(e.target.value)
  }

  const handleServiceSelect = e => {
    setServiceKey(e.target.value)
  }

  const handleUsername = e => {
    if (helpText === 'username') {
      setHelpText('')
    }
    if (e.target.value.length < 6) {
      setHelpText('shortuser')
    } else {
      if (helpText === 'shortuser') {
        setHelpText('')
      }
    }
    setUsernameString(e.target.value)
  }

  const handleExtension = e => {
    setExtensionString(e.target.value)
  }

  const next = e => {
    e.preventDefault()
    if (typeKey === '') {
      setHelpText('type')
    } else if (usernameString === '') {
      setHelpText('username')
    } else if (numberKey === '') {
      setHelpText('number')
    } else {
      saveUserProfile({
        type: typeKey,
        domain:
          domainKey === ''
            ? autoAttendant &&
              autoAttendant.domains &&
              autoAttendant.domains.default
            : domainKey,
        number: numberKey,
        service: serviceKey,
        username: usernameString,
        extension: extensionString
      })
      props.onSubmit()
    }
  }

  const cancel = e => {
    e.preventDefault()
    props.history.goBack()
  }

  return (
    <>
      <UiCard title="Create Auto Attendant">
        <form style={{ marginBottom: '1rem' }}>
          <Field horizontal kind="addons">
            <Field.Label>
              <Tag color="link" size="medium">
                Type
              </Tag>
            </Field.Label>
            <Field.Body>
              <Control>
                <Select.Container color={helpText === 'type' ? 'danger' : ''}>
                  <Select
                    disabled={loading}
                    value={typeKey}
                    onChange={handleTypeSelect}
                    name="typeKey"
                  >
                    {types.map(type => (
                      <Select.Option key={type.key} value={type.name}>
                        {type.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Select.Container>
                {helpText === 'type' ? (
                  <Help color="danger">This field is required</Help>
                ) : null}
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
                  state={
                    helpText === 'username' || helpText === 'shortuser'
                      ? 'focused'
                      : ''
                  }
                  color={
                    helpText === 'username' || helpText === 'shortuser'
                      ? 'danger'
                      : ''
                  }
                />
                {helpText === 'username' ? (
                  <Help color="danger">This field is required</Help>
                ) : null}
                {helpText === 'shortuser' ? (
                  <Help color="danger">
                    Username should be more than 6 characters long!
                  </Help>
                ) : null}
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
                    {autoAttendant &&
                    autoAttendant.domains &&
                    autoAttendant.domains.default ? (
                      <Select.Option
                        key={autoAttendant.domains.default}
                        value={autoAttendant.domains.default}
                      >
                        {autoAttendant.domains.default}
                      </Select.Option>
                    ) : null}
                    {autoAttendant &&
                      autoAttendant.domains &&
                      autoAttendant.domains.domains &&
                      autoAttendant.domains.domains.map(domain =>
                        autoAttendant.domains.default !== domain ? (
                          <Select.Option key={domain} value={domain}>
                            {domain}
                          </Select.Option>
                        ) : null
                      )}
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
                <Select.Container color={helpText === 'number' ? 'danger' : ''}>
                  <Select
                    disabled={loading}
                    value={numberKey}
                    onChange={handleNumberSelect}
                    name="numberKey"
                  >
                    <Select.Option value="Please select...">
                      {'Please select...'}
                    </Select.Option>
                    {autoAttendant &&
                      autoAttendant.numbers &&
                      autoAttendant.numbers.dns &&
                      autoAttendant.numbers.dns.map(number =>
                        number.assigned ? null : (
                          <Select.Option key={number.min} value={number.min}>
                            {number.min}
                          </Select.Option>
                        )
                      )}
                  </Select>
                </Select.Container>
                {helpText === 'number' ? (
                  <Help color="danger">This field is required</Help>
                ) : null}
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
              <Button type="reset" onClick={cancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                state={loading ? 'loading' : ''}
                color="success"
                onClick={next}
              >
                Next
              </Button>
            </Button.Group>
          </Field>
        </form>
      </UiCard>
    </>
  )
})

CreateAutoAttendantProfile.propTypes = {
  history: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  groupId: PropTypes.string,
  serviceProviderId: PropTypes.string
}
