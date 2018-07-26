const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const expressDevice = require('express-device')
const fs = require('fs')
const rfs = require('rotating-file-stream')
const path = require('path')
const logger = require('./services/logger')

const renderIndex = require('./public/index')

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
  const xForwardedFor = `x-forwarded-for: ${req.headers['x-forwarded-for']}`
  const connectionRemoteAddress = `connection remote-address: ${req.connection.remoteAddress}`
  const socketRemoteAddress = `socket remote-address: ${req.socket.remoteAddress}`
  const connectionSocketRemoteAddress = `connection socket remote-address: ${(req.connection.socket.remoteAddress).split(",")[0]}`

  return `{${headers}, ${ipAddress}, ${method}, ${body}, ${device}, ${url}, ${query}, ${xForwardedFor}, ${connectionRemoteAddress}, ${socketRemoteAddress}, ${connectionSocketRemoteAddress} }`
}

const getRandomNum = (max) => {
  const num = Math.floor(Math.random() * max + 1)
  return num
}

const getRandomIndex = () => {
  const randomPage = getRandomNum(3)
  switch (randomPage) {
    case 1:
      return renderIndex(getRandomNum(1000))
      break;
    case 2:
      return renderIndex(getRandomNum(1000))
      break;
    case 3:
      return renderIndex(getRandomNum(1000))
      break;
    default:
      break;
  }
}

app.post('*', (req, res) => {
  console.log(req);
  logger.info(formatRequestLog(req))
  const indexFile = getRandomIndex()
  res.header('Cache-control', 'no-cache')
  res.status(200).send(indexFile)
})

app.get('*', (req, res) => {
  console.log(req);
  logger.info(formatRequestLog(req))
  const indexFile = getRandomIndex()
  res.header('Cache-control', 'no-cache')
  res.status(200).send(indexFile)
})

app.head('*', (req, res) => {
  console.log(req);
  logger.info(formatRequestLog(req))
  const indexFile = getRandomIndex()
  res.header('Cache-control', 'no-cache')
  res.status(200).send(indexFile)
})

app.put('*', (req, res) => {
  console.log(req);
  logger.info(formatRequestLog(req))
  const indexFile = getRandomIndex()
  res.header('Cache-control', 'no-cache')
  res.status(200).send(indexFile)
})



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${env} mode`)
})