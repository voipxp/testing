import { configure } from '@storybook/react'
import '@/index.scss'
configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module)
