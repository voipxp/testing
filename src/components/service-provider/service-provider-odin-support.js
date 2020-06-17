import React from 'react'
import PropTypes from 'prop-types'
import { UiCard } from '@/components/ui'

export const ServiceProviderOdinSupport = ({ match, ...props }) => {

  const script = document.createElement('script')
    script.src = 'https://js.hsforms.net/forms/v2.js'
    document.head.append(script)
    script.addEventListener('load', () => {
    	if(window.hbspt) {
      	window.hbspt.forms.create({
        	portalId: '7091219',
          formId: '90035aa2-d5e9-47b0-a368-e80092d84d0d',
          target: '#hubspotForm'
        })
      }
    })

  return (
    <>
      <UiCard title="Odin Support">
        <div id="hubspotForm"></div>
      </UiCard>
    </>
  )
}

ServiceProviderOdinSupport.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
}
