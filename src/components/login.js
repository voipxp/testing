import React, { useReducer } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Hero, Box, Field, Control, Icon, Button, Input, Message } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import auth from '/api/auth'
import { showLoadingModal, hideLoadingModal } from '/store/ui'
import { alertWarning, alertDanger } from '/store/alerts'
import { setSession } from '/store/session'

const Login = ({
  apiUrl,
  loginMessage,
  alertWarning,
  alertDanger,
  setSession,
  showLoadingModal,
  hideLoadingModal
}) => {
  const [state, setState] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState
    }),
    {
      username: '',
      password: '',
      newPassword1: '',
      newPassword2: '',
      needsChange: false,
      valid: false
    }
  )

  // FIND AN EASIER WAY TO DO VALIDATIONS
  function handleUpdate(e) {
    const currentState = state
    currentState[e.target.name] = e.target.value
    currentState.valid = currentState.username && currentState.password
    if (currentState.needsChange) {
      currentState.valid =
        currentState.valid &&
        currentState.newPassword1 &&
        currentState.newPassword2
    }
    setState(currentState)
  }

  function handleSubmit(e) {
    e.preventDefault()
    state.needsChange ? setPassword() : login()
  }

  async function login() {
    try {
      showLoadingModal()
      const session = await auth.token(state.username, state.password)
      await setSession(session)
    } catch (error) {
      if (error.status === 402) {
        alertWarning(error)
        setState({ needsChange: true })
      } else {
        alertDanger(error)
      }
    } finally {
      hideLoadingModal()
    }
  }

  async function setPassword() {
    if (state.newPassword1 !== state.newPassword2) {
      return alertWarning('New Passwords Do Not Match')
    }
    try {
      showLoadingModal()
      await auth.password(state.password, state.newPassword1, state.username)
      const session = await auth.token(state.username, state.newPassword1)
      await setSession(session)
    } catch (error) {
      alertDanger(error)
    } finally {
      hideLoadingModal()
    }
  }

  return (
    <Hero color="link" size="fullheight">
      <Hero.Body textAlign="centered">
        <Box style={{ width: '400px', margin: 'auto' }}>
          <img src={`${apiUrl}/ui/images/imageLoginLogo.png`} alt="logo" />
          <form onSubmit={handleSubmit}>
            <Field>
              <Control iconLeft>
                <Input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleUpdate}
                  value={state.username}
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
                  onChange={handleUpdate}
                  value={state.password}
                  required
                />
                <Icon size="small" align="left">
                  <FontAwesomeIcon icon={faLock} />
                </Icon>
              </Control>
            </Field>

            {state.needsChange && (
              <>
                <Field>
                  <Control iconLeft>
                    <Input
                      type="password"
                      placeholder="New Password"
                      name="newPassword1"
                      onChange={handleUpdate}
                      value={state.newPassword1}
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
                      name="newPassword2"
                      onChange={handleUpdate}
                      value={state.newPassword2}
                      required
                    />
                    <Icon size="small" align="left">
                      <FontAwesomeIcon icon={faLock} />
                    </Icon>
                  </Control>
                </Field>
              </>
            )}

            <Button
              color="link"
              fullwidth
              type="submit"
              disabled={!state.valid}
            >
              Login
            </Button>
          </form>
        </Box>
      </Hero.Body>

      {loginMessage && (
        <Hero.Foot>
          <Message radiusless>
            <Message.Body textAlign="centered">{loginMessage}</Message.Body>
          </Message>
        </Hero.Foot>
      )}
    </Hero>
  )
}

Login.propTypes = {
  apiUrl: PropTypes.string,
  loginMessage: PropTypes.string,
  alertWarning: PropTypes.func,
  alertDanger: PropTypes.func,
  setSession: PropTypes.func,
  showLoadingModal: PropTypes.func,
  hideLoadingModal: PropTypes.func
}

const mapState = state => ({
  apiUrl: state.ui.apiUrl,
  loginMessage: state.ui.template.pageLoginMessage
})

const mapDispatch = {
  alertWarning,
  alertDanger,
  setSession,
  showLoadingModal,
  hideLoadingModal
}

export default connect(
  mapState,
  mapDispatch
)(Login)
