const {app, BrowserWindow, dialog, ipcMain} = require('electron')

let mainWindow

//asincrono servicio podria ser await, wait o not await
async function PreguntaSobreFruta () {
  let fruta = ['Manzana', 'Naranja', 'Uva']
  let eleccion = await dialog.showMessageBox({
    message: 'Recoge una fruta:',
    buttons: fruta
  })

  return fruta[eleccion.response]
}

ipcMain.handle('Pregunta-Fruta', e => {
  return PreguntaSobreFruta()
})

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 1000, height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  mainWindow.loadFile('index.html')

  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
