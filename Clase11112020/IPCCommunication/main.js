const {app, BrowserWindow, ipcMain} = require('electron')

let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800, x: 100, y: 140,
    webPreferences: { nodeIntegration: true }
  })

  mainWindow.loadFile('index.html')

  //mainWindow.webContents.openDevTools();

  mainWindow.webContents.on( 'did-finish-load', e => {
    // mainWindow.webContents.send( 'mailbox', {
    //   from: 'Oscardo',
    //   email: 'oepinzon@urepublicana.edu.co',
    //   priority: 1
    // })
  })

  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

ipcMain.on( 'sync-message', (e, args) => {
  console.log(args)

  setTimeout( () => {
    e.returnValue = 'Una respuesta de sincronización del proceso principal'
  }, 4000)

})

ipcMain.on( 'channel1', (e, args) => {
  console.log(args)
  e.sender.send( 'channel1-response', 'Mensaje recibido el "Canal1". Gracias!')
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
