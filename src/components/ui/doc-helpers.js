import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'rbx'

export const ExampleBox = ({ text = 'Example Box' }) => <Box>{text}</Box>
ExampleBox.propTypes = { text: PropTypes.string }
