import React from 'react'
import { Hero, Box, Field, Control, Icon, Button, Input } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useAlerts } from '@/store/alerts'
import { useUi } from '@/store/ui'
import authApi from '@/api/auth'
import PropTypes from 'prop-types'

export const AppResetPassword = ({ match, history }) => {
  const { showLoadingModal, hideLoadingModal } = useUi()
  const { alertSuccess, alertWarning, alertDanger } = useAlerts()

  const formRef = React.useRef()
  const [form, setForm] = React.useState({
    username: '',
    password: '',
    newPassword1: '',
    newPassword2: ''
  })

  const goToLoginPage = () => history.push('/')

  function handleSubmit(e) {
    e.preventDefault()
    changePassword()
  }

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function changePassword() {
    if (form.newPassword1 !== form.newPassword2) {
      return alertWarning('New Passwords Do Not Match')
    }
    try {
      showLoadingModal()
      await authApi.tokenPassword(
        form.password,
        form.newPassword1,
        form.username
      )
      alertSuccess('Password has been reset successfully!')
      goToLoginPage()
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
    }
  }

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
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleInput}
                    value={form.username}
                    autoCapitalize="off"
                    required
                  />
                  <Icon size="small" align="left">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </Icon>
                </Control>
              </Field>

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
                        placeholder="New Password"
                        name="newPassword1"
                        onChange={handleInput}
                        value={form.newPassword1}
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
                        placeholder="Confirm New Password"
                        name="newPassword2"
                        onChange={handleInput}
                        value={form.newPassword2}
                        required
                      />
                      <Icon size="small" align="left">
                        <FontAwesomeIcon icon={faLock} />
                      </Icon>
                    </Control>
                  </Field>
                </>
              <Button color="link" fullwidth type="submit">
                Reset Password
              </Button>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <a href='/#!/'>
                  Go to Login Page
                </a>
              </div>
            </form>
          </Box>
        </Hero.Body>
      </Hero>
    </div>
  )
}

AppResetPassword.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
