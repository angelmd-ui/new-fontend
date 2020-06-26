
export default{
    data(){
        return{
            act:true,
        swReg:null
        }
    },
    methods:{
        alertar(){
          alert('hello')
        },
         verificaSubscripcion(active){
            console.log(active)
            if(active){
                this.act = false
            }else{
              this.act = true
            }
         },
         getPublicKey(){
            return fetch('https://gouapp.herokuapp.com/key')
            .then( res => res.arrayBuffer())
            // returnar arreglo, pero como un Uint8array
            .then( key => new Uint8Array(key) );
           
         },
         activeSubcribe(){
            let vm = this;
            let v = vm.swReg;
            if(!vm.swReg) return console.log('no hay registro sw')
            this.getPublicKey().then( ( key ) =>{
    
            vm.swReg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: key
            })
            .then( res => res.toJSON() )
            .then( suscripcion => {
    
                 //console.log(suscripcion);
                 
                 fetch('https://gouapp.herokuapp.com/subscribe',{
                    method:'POST',
                    headers:{ 'Content-Type':'application/json' },
                    body: JSON.stringify(suscripcion)
                 })
                 .then(vm.verificaSubscripcion(false))
                 .catch( console.log )
                //vm.verificaSubscripcion(suscripcion)
               
    
    
            });
    
    
        });
    
         },
         cancelSubscribe(){
            let vm = this;
    
          this.swReg.pushManager.getSubscription().then( subs => {
    
            subs.unsubscribe().then( () =>  vm.verificaSubscripcion(true) );
          })
         },
         enviarNotificacion() {
    
        const notificationOpts = {
            body: 'Este es el cuerpo de la notificación',
            icon: 'img/icons/icon-72x72.png'
        };
    
    
        const n = new Notification('Hola Mundo', notificationOpts);
    
        n.onclick = () => {
            console.log('Click');
        };
    
    },
    
         notificarme() {
    
        if ( !window.Notification ) {
            console.log('Este navegador no soporta notificaciones');
            return;
        }
    
        if ( Notification.permission === 'granted' ) {
            
            // new Notification('Hola Mundo! - granted');
            this.enviarNotificacion();
    
        } else if ( Notification.permission !== 'denied' || Notification.permission === 'default' )  {
    
            Notification.requestPermission( function( permission ) {
    
                console.log( permission );
    
                if ( permission === 'granted' ) {
                    // new Notification('Hola Mundo! - pregunta');
                    this.enviarNotificacion();
                }
    
            });
    
        }
    
    
    
    },
    registersw(){
    
    
        let vm = this;
            var url = window.location.href;
        var swLocation = 'sw.js';
        console.log(swLocation)
        
        if ( navigator.serviceWorker ) {
        
        
          
                
                    window.addEventListener('load', function() {
        
                navigator.serviceWorker.register( swLocation ).then( (reg)=>{
        
                     console.log(reg)
                     vm.swReg = reg;
                  vm.swReg.pushManager.getSubscription()
        
                });
        
            });
           
        
        
        
        
        }
        
          }
      }
   
}