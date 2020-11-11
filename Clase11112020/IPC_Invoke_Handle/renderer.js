const { ipcRenderer } = require('electron')
document.getElementById('pregunta').addEventListener('click', e => {
  ipcRenderer.invoke( 'Pregunta-Fruta' ).then( answer => {
    // declaración de una promesa
    console.log(answer)
  })

})
