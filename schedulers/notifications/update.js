const fetch = require('node-fetch')
// レスポンスは必要ないのであえてawaitしない
const port = process.env.PORT || '3000'
const apiPath = '/api/notifications/all'
const url =
  port === '3000'
    ? `http://localhost:${port}${apiPath}`
    : `https://tsundoku-accelerator.herokuapp.com${apiPath}`
fetch(url, { method: 'POST' })
