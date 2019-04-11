import React, { useReducer } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import auth from '/services/api/auth'
import { alertWarning, alertDanger } from '../store/alerts'
import { setSession } from '../store/session'

const Section = styled.section`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .box {
    width: 400px;
    margin: auto;
  }

  button {
    width: 100%;
  }

  .hero-foot .message {
    border-radius: 0;
  }

  .hero-foot .message-body {
    text-align: center;
    padding: 0.75rem;
    border: none;
  }
`

const Login = ({
  apiUrl,
  loginMessage,
  alertWarning,
  alertDanger,
  setSession
}) => {
  const [state, setState] = useReducer(
    (state, newState) => ({
      ...state,
      ...newState
    }),
    {
      loading: false,
      username: '',
      password: '',
      newPassword1: '',
      newPassword2: '',
      needsChange: false,
      valid: false
    }
  )

  const handleUpdate = e => {
    setState({ [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('state', state)
    state.needsChange ? setPassword() : login()
  }

  async function login() {
    setState({ loading: true })
    try {
      const session = await auth.token(state.username, state.password)
      setSession(session)
    } catch (error) {
      console.log(error.message, error.status)
      alertDanger(error)
    } finally {
      setState({ loading: false })
    }
  }

  async function setPassword() {
    if (state.newPassword1 !== state.newPassword2) {
      return alertWarning('New Passwords Do Not Match')
    }
    setState({ loading: true })
    try {
      const session = await auth.password(
        state.password,
        state.newPassword1,
        state.username
      )
      setSession(session)
    } catch (error) {
      console.log(error)
      alertWarning(error)
    } finally {
      setState({ loading: false })
    }
  }

  return (
    <Section className="hero is-fullheight is-link">
      <div className="hero-body has-text-centered">
        <div className="box">
          <img src={`${apiUrl}/ui/images/imageLoginLogo.png`} alt="logo" />

          <form className="margin-top" onSubmit={handleSubmit}>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleUpdate}
                  value={state.username}
                  autoCapitalize="off"
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
              </p>
            </div>

            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleUpdate}
                  value={state.password}
                  required
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock" />
                </span>
              </p>
            </div>

            {state.needsChange && (
              <>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="New Password"
                      name="newPassword1"
                      onChange={handleUpdate}
                      value={state.newPassword1}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock" />
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="New Password"
                      name="newPassword2"
                      onChange={handleUpdate}
                      value={state.newPassword2}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock" />
                    </span>
                  </p>
                </div>
              </>
            )}

            <button className="margin-top button is-link" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>

      {loginMessage && (
        <div className="hero-foot">
          <div className="message">
            <div className="message-body">{loginMessage}</div>
          </div>
        </div>
      )}
    </Section>
  )
}

Login.propTypes = {
  apiUrl: PropTypes.string,
  loginMessage: PropTypes.string,
  alertWarning: PropTypes.func,
  alertDanger: PropTypes.func,
  setSession: PropTypes.func
}

const mapState = state => ({
  apiUrl: state.ui.apiUrl,
  loginMessage: state.ui.template.pageLoginMessage
})
const mapDispatch = {
  alertWarning,
  alertDanger,
  setSession
}

export default connect(
  mapState,
  mapDispatch
)(Login)
