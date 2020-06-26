export default{
  data(){
    return{
        active:'',
        category:false,
        datosTrbajos:{
          trabajos:[],
          id_trabajo:'all',
          select:''
        },
        datosAreas:{
          areas:[],
         id_area:'all',
         select:''
        },
    }
  },
  methods:{
         
         activeMenu(data,name){
          
           this.category=true
           if(name === 'Areas'){
               this.active = name
               console.log(name)
           }

             if(name === 'Procesos'){
    
                this.active = name
                console.log(name)
           }
        },
        disabledfilter(data){
           const { id,name } = data
          
         
             
          if(data === 'Areas'){
            this.datosTrbajos.select=""
            this.datosTrbajos.id_trabajo="all"
            this.datosAreas.select=""
            this.datosAreas.id_area="all"
            
            }
          
        
      }
  }
}

