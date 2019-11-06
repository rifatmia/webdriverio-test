/* global browser, describe, it, fin */
const expect = require('chai').expect
const myApp = browser

describe('Application For Webinar', () => {
  it('Has a Home Page on launch', () => {
    let currentWindowTitle = myApp.getTitle()

    let openfinWindowName = myApp.execute(() => {
      return fin.desktop.Window.getCurrent().name
    }).value

    expect(currentWindowTitle).to.equal('Home Page')
    expect(openfinWindowName).to.equal('SeleniumTesting')
  })
  it('Shows a 2nd window when Hello World is submitted to the form', () => {
    let homePageWindowTabId = myApp.getCurrentTabId()

    myApp.setValue('#valueField', 'Hello World')
    myApp.click('#submitButton')
    myApp.pause(3000)
    myApp.setValue('#valueField', '')
    myApp.pause(3000)

    let myAppWindowTabIds = myApp.getTabIds()

    expect(myAppWindowTabIds.length).to.equal(2)

    let confirmationPageWindowTabId = myAppWindowTabIds.filter(
      (value) => {
        return value !== homePageWindowTabId
      })[0]

    myApp.switchTab(confirmationPageWindowTabId)

    let currentWindowTitle = myApp.getTitle()
    let openfinWindowName = myApp.execute(() => {
      return fin.desktop.Window.getCurrent().name
    }).value

    expect(currentWindowTitle).to.equal('Confirmation Page')
    expect(openfinWindowName).to.equal('confirmationWindow')

    myApp.execute(() => {
      fin.desktop.Window.getCurrent().close()
    })
    myApp.switchTab(homePageWindowTabId)

    let newWindowTitle = myApp.getTitle()
    expect(newWindowTitle).to.equal('Home Page')
  })
  it('Verifies the version of the OpenFin Runtime', () => {
    myApp.timeouts('script', 5000)
    let runtimeVersion = browser.executeAsync(function (done) {
      fin.desktop.System.getVersion(function (version) {
        done(version)
      })
    }).value
    expect(runtimeVersion).to.equal('14.78.45.31')
  })
 
})
