/* global fin, browser */
const spawn = require('child_process').spawn
const fork = require('child_process').fork

exports.config = {
  specs: [
    './test/*.js'
  ],
  maxInstances: 10,
  capabilities: [{
    maxInstances: 5,
    browserName: 'chrome',
    chromeOptions: {
      extensions: [],
      binary: 'RunOpenFin.bat',
      args: ['--config=http://localhost:3000/testingapp.json']
    }
  }],
  sync: true,
  port: 9515,
  path: '/',
  logLevel: 'silent',
  coloredLogs: true,
  bail: 0,
  screenshotPath: './errorShots/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd'
  },
  reporters: ['spec'],
  onPrepare: function (config, capabilities) {
    fork('./localhost.js')
    spawn('./chromedriver.exe')
  },
  after: function (result, capabilities, specs) {
    browser.execute(() => {
      fin.desktop.Application.getCurrent().close()
    })
  }
}
