import { withNextRouter } from 'storybook-addon-next-router'
import { addDecorator } from '@storybook/react'
import { configure } from '@storybook/react'
import './mockNextRouter'
import '../src/styles/globals.css'
import * as nextImage from 'next/image';

addDecorator(
  withNextRouter({
    path: '/', // defaults to `/`
    asPath: '/', // defaults to `/`
    query: {}, // defaults to `{}`
    push() {}, // defaults to using addon actions integration, can override any method in the router
  })
)

addDecorator((Story) => (
  <>
      <Story />
  </>
))

const addParameters = require('@storybook/react').addParameters

addParameters({
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
})

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: props => <img {...props} />
});