import React from 'react'
import { Hero, Box, Field, Control, Icon, Button, Input, Message } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useAlerts } from '@/store/alerts'
import { useUi } from '@/store/ui'
import { useUiTemplate } from '@/store/ui-template'
import resetPasswordApi from '@/api/reset-password'
import PropTypes from 'prop-types'

export const AppNewPassword = ({ match, history }) => {
  const { email, token } = match.params
  const { showLoadingModal, hideLoadingModal } = useUi()
  const { alertSuccess, alertDanger, alertWarning } = useAlerts()
  const { template } = useUiTemplate()
  const { pageLoginMessage } = template
  const formRef = React.useRef()
  const [canSubmit, setCanSubmit] = React.useState(false)
  const [form, setForm] = React.useState({
    password: '',
    password_confirmed: '',
    email: email,
    token: token
  })

  function handleSubmit(e) {
    e.preventDefault()
    submitForm()
  }

  const goToLoginPage = () => history.push('/')

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function submitForm() {
    if (form.password !== form.password_confirmed) {
      return alertWarning('New Passwords Do Not Match')
    }
    try {
      showLoadingModal()
      const resetRes = await resetPasswordApi.resetPasswordFromLink(
        {
        email: form.email,
        token: form.token,
        password: form.password,
        password_confirmed: form.password_confirmed
        }
      )
      if(resetRes.status === 'success') {
        alertSuccess(resetRes.message || 'Password has been reset successfully.')
        goToLoginPage()
      }
      else alertDanger(resetRes.error)
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
    }
  }

  const validateToken = async () => {
    try {
      showLoadingModal()
      const resetRes = await resetPasswordApi.validateToken(
        {
          email: form.email,
          token: form.token
        }
      )
      if(resetRes.success) {
        setCanSubmit(true)
      }
      else alertDanger(resetRes.error)
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
    }
  }

  React.useEffect(() => {
    validateToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="pbs-login">
      <Hero color="link" size="fullheight">
        <Hero.Body textAlign="centered">
          <Box style={{ width: '400px', margin: 'auto' }}>
            <img src="/api/v2/ui/images/imageLoginLogo.png" alt="logo" />
            <form onSubmit={handleSubmit} ref={formRef}>
                <>
                <Field>
                  <Control iconLeft>
                    <Input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleInput}
                      value={form.password}
                      required
                    />
                    <Icon size="small" align="left">
                      <FontAwesomeIcon icon={faLock} />
                    </Icon>
                  </Control>
                </Field>

                <Field>
                  <Control iconLeft>
                    <Input
                      type="password"
                      placeholder="Confirmed Password"
                      name="password_confirmed"
                      onChange={handleInput}
                      value={form.password_confirmed}
                      required
                    />
                    <Icon size="small" align="left">
                      <FontAwesomeIcon icon={faLock} />
                    </Icon>
                  </Control>
                </Field>
              </>
              <Button color="link" fullwidth type="submit" disabled={!canSubmit}>
                Submit
              </Button>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <a href='/#!/'>
                  Go to Login Page
                </a>
              </div>
            </form>
          </Box>
        </Hero.Body>

        {pageLoginMessage && (
          <Hero.Foot>
            <Message radiusless>
              <Message.Body textAlign="centered">
                {pageLoginMessage}
              </Message.Body>
            </Message>
          </Hero.Foot>
        )}
      </Hero>
    </div>
  )
}

AppNewPassword.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
