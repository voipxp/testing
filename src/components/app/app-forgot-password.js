import React from 'react'
import { Hero, Box, Field, Control, Icon, Button, Input, Message } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useAlerts } from '@/store/alerts'
import { useUi } from '@/store/ui'
import { useUiTemplate } from '@/store/ui-template'
import resetPasswordApi from '@/api/reset-password'
import PropTypes from 'prop-types'
import ReCAPTCHA from "react-google-recaptcha";

export const AppForgotPassword = ({ match, history }) => {
  const { showLoadingModal, hideLoadingModal } = useUi()
  const { alertSuccess, alertDanger } = useAlerts()

  const { template } = useUiTemplate()
  const { pageLoginMessage } = template

  const formRef = React.useRef()
  const [valid, setValid] = React.useState(false)
  const [gRecaptchaResponse, setGRecaptchaResponse] = React.useState('')

  const [form, setForm] = React.useState({
    username: '',
    email: ''
  })

  function handleSubmit(e) {
    e.preventDefault()
    submitForm()
  }

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function onReCaptchaChange(value) {
    if(value) setValid(true)
    else setValid(false)
    setGRecaptchaResponse(value)
  }

  async function submitForm() {
    if(!gRecaptchaResponse) return false
    try {
      showLoadingModal()
      const resetRes = await resetPasswordApi.sendResetPasswordLink(
        {
          'userId': form.username,
          'email': form.email,
          'g-recaptcha-response': gRecaptchaResponse
        }
      )
      if(resetRes.status === 'success') alertSuccess(resetRes.message)
      else alertDanger(resetRes.error)
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
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={handleInput}
                    value={form.email}
                    required
                  />
                  <Icon size="small" align="left">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </Icon>
                </Control>
              </Field>

              <Field style={{paddingBottom:'20px'}}>
                <ReCAPTCHA
                  sitekey="6LeYru8UAAAAAFgdMxLYZklkMIdxDF4xeK7n6XAu"
                  onChange={onReCaptchaChange}
                />
              </Field>
              </>
              <Button color="link" fullwidth type="submit" disabled={!valid}>
                Submit
              </Button>
              <Field>
                <a href='/#!/'>
                  Go to Login Page
                </a>
              </Field>
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

AppForgotPassword.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
