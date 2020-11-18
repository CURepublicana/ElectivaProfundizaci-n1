const {app, BrowserWindow, Menu} = require('electron'); 
const path = require('path'); 
const url = require('url'); 

let window = null;

const template = [
  {
    role: 'window',
    label: 'Ventana',
    submenu: [
       {
          role: 'minimize',
          label: 'Minimizar'
       },
       {
          role: 'close',
          label: 'Cerrar'
       }
    ]
 },
]

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 400px
    width: 800,
    // Set the initial height to 500px
    height: 600,
    // Don't show the window until it ready, this prevents any white flickering
    show: false,
    // Don't allow the window to be resized.
    resizable: false
  });

  // Load a URL in the window to the local index.html path
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

   // abre las herramientas de desarrollador
   //window.webContents.openDevTools();

  // Show window when page is ready
  window.once('ready-to-show', () => {
    window.show();
  });
});
