
self.addEventListener('install', event =>{
    //se dispara cuando haiga un cambio
     //descargar archivos
     //crear cache
     console.log('install');
  
  });
  
  self.addEventListener('activate', event =>{
    console.log('activate!---');
  });

self.addEventListener('push', e => {
   // console.log(e);
  
    console.log(e.data.text())
    const data = JSON.parse(e.data.text())

    const title = data.titulo;
    const options = {
      body: data.cuerpo,
      icon:'./img/icons/android-chrome-512x512.png',
      badge:'./favicon.ico',
      image:data.image,
      vibrate:[125,75,125,275,200,275,125,75,125,275,200,600,200,600],
      openUrl:'/home',
      data:{
        //url:'https://google.com',
        url:'/home'
        //id:data.user
      },
      actions:[
        {
          action:'viewv',
          title:'view',
          icon:'./img/icons/android-chrome-512x512.png'
        }
      ]
    }

    e.waitUntil(self.registration.showNotification(title,options))
 })

 self.addEventListener('notificationclose',(e)=>{

 })

 self.addEventListener('notificationclick',e=>{
        const notificacion = e.notification;
        const accion = e.action;

        console.log({  notificacion,accion })

        const respuesta = clients.matchAll()
        .then( clientes => {
          let cliente = clientes.find( c =>{
             return c.visibilityState === 'visible'
          });
          if( cliente !== undefined ){
            cliente.navigate( notificacion.data.url );
            cliente.focus()
          }else{
            clients.openWindow(  notificacion.data.url )
          }
          notificacion.close();
        } )
      
        e.waitUntil( respuesta )
       
 })