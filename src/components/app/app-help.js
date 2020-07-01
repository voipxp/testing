import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { useModulePermissions } from '@/utils'
import _ from 'lodash'

export const AppHelpBase = ({ match, history, module='' }) => {
  const [showHelp, setShowHelp] = React.useState(false)

  /*
  const search = history.location.search
  const params = new URLSearchParams(search)
  const moduleName = params.get('module')
  const { getModule } = useModulePermissions()
  const module = getModule(moduleName)
  */
 const { getModule } = useModulePermissions()

  const thisModule = _.isString(module) ? getModule(module) : module

  const quickHelp = () => {
    return (
      <div className="quickview is-active">
        <header className="quickview-header">
          <p className="title">Quick Help</p>
        </header>
        <div className="quickview-body">
          <div className="quickview-block" style={{ padding: '1rem' }}>
            <p className="subtitle">
              {thisModule.alias}
              <button
                className="button is-small is-pulled-right"
                onClick={() => setShowHelp(!showHelp)}
              >
                <span className="icon">
                  <i className="fas fa-times"></i>
                </span>
              </button>
            </p>
            <p>{thisModule.description}</p>
            {
              thisModule.url &&
              <div className="large-margin-top">
                <a href={thisModule.url}
                target="_blank"
                rel="noreferrer noopener"
                >
                More Information
                </a>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {thisModule && (
        <React.Fragment>
          <div className="is-grouped is-pulled-right">
            <button
              className="button is-small"
              onClick={() => setShowHelp(!showHelp)}
            >
              <span className="icon">
                <i className="fas fa-info"></i>
              </span>
            </button>
          </div>
          {showHelp && quickHelp()}
        </React.Fragment>
      )}
    </>
  )
}

AppHelpBase.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  module: PropTypes.any
}

export const AppHelp = withRouter(AppHelpBase)
