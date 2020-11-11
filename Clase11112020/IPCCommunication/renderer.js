const { ipcRenderer } = require('electron')
let i = 1
setInterval( () => {
  console.log(i)
  i++
}, 1000)

document.getElementById('talk').addEventListener('click', e => {
  // ipcRenderer.send( 'channel1', 'Hola desde la ventana principal')
  let response = ipcRenderer.sendSync( 'sync-message', 'Esperando respuesta')
  console.log(response)

})

ipcRenderer.on( 'channel1-response', (e, args) => {
  console.log(args)
})

ipcRenderer.on( 'mailbox', (e, args) => {
  console.log(args)
})
