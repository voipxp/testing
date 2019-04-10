import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  padding: 1rem;
  height: 50px;
`
const Footer = ({
  title = 'odin Web',
  version = 'N/A',
  copyright = 'Park Bench Solutions Inc.'
}) => {
  return (
    <StyledFooter className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>{title}</strong>&nbsp;
          <span>&copy; {copyright}</span>&nbsp;
          <small>({version})</small>
        </p>
      </div>
    </StyledFooter>
  )
}

Footer.propTypes = {
  title: PropTypes.string,
  version: PropTypes.string,
  copyright: PropTypes.string
}

const mapState = state => ({
  copyright: state.ui.template.pageCopyright,
  title: state.ui.template.pageFooterTitle,
  version: state.session.version
})

export default connect(mapState)(Footer)
