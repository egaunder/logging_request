const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressDevice = require('express-device')
const fs = require('fs')
const rfs = require('rotating-file-stream')
const path = require('path')
const logger = require('./services/logger')


const app = express();
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false  }))
app.use(expressDevice.capture())

const env = "development"
const PORT = 3000

const formatRequestLog = req => {
  const headers = `headers: ${JSON.stringify(req.headers)}`
  const method = `query: ${JSON.stringify(req.method)}`
  const body = `body: ${JSON.stringify(req.body)}`
  const device = `device: ${JSON.stringify(req.device)}`
  const url = `url: ${JSON.stringify(req.originalUrl)}`
  const query = `query: ${JSON.stringify(req.query)}`
  var ip = (req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress).split(",")[0];
  const ipAddress = `ip: ${ip}`

  return `{${headers}, ${ipAddress}, ${method}, ${body}, ${device}, ${url}, ${query}}`
}

app.post('*', (req, res) => {
  console.log(req);
  logger.info(formatRequestLog(req))
  res.end()
})

app.get('*', (req, res) => {
  console.log(req);
  logger.info(formatRequestLog(req))
  res.end()
})

app.head('*', (req, res) => {
  console.log(req);
  logger.info(formatRequestLog(req))
  res.end()
})

app.put('*', (req, res) => {
  console.log(req);
  logger.info(formatRequestLog(req))
  res.end()
})



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${env} mode`)
})