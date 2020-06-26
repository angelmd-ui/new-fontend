import axios from 'axios' 
export default{
data() {
    return {
      state:false,
      inicio:true,
      menu: true,
      categoria: 'Noticias',
      activeCategory: 'noticias',
      categorias: [],
      modalActive: false,
      modalHeader: '',
      loader: true,
      spinner: false,
      datosPrograma: {
        id:'all',
        titulo:'Programas'
      },
      
      datosCategoria: {
        id: 'all'
      },
      datosEtiqueta: {
        id:'all',
        titulo:'Etiquetas'
        
      },
      queryTag:'',
      nombre_facultad:null,
      facultades:false
    }
  },

  watch:{
      queryTag(newData,oldData){
         this.spinner = true
        setTimeout(this.getEtiquetas(), 500)
       }
   },

  methods: {
      inputchanged(dato,name) {
             this.queryTag = dato 
                        
          },
    activeProgram(data, name) {
     
      
      if (name == 'Programas') {
        this.getPrograma()
        this.modalHeader = name
         this.modalActive = data

         
      }
      if (name == 'Etiquetas') {
        this.getEtiquetas()
        this.modalHeader = name
         this.modalActive = data
     
      }
        if (name == 'Facultades') {
          this.facultades = !this.facultades

          
         
      }
   

    },

    selectPrograma(id,name){
        
      
       
       if(this.modalHeader == 'Programas'){
       this.datosPrograma.id = id
       this.modalHeader = name
       this.datosPrograma.titulo = name
         if(this.activeCategory !== 'noticias'){
         this.getRegisterByCategory()
       }else{
          this.getRegister()
       }
       }
       if(this.modalHeader == 'Etiquetas'){
        this.datosEtiqueta.titulo= name
        this.datosEtiqueta.id = id
        //this.modalHeader = name
     
           if(this.activeCategory !== 'noticias'){
         this.getRegisterByCategory()
       }else{
          this.getRegister()
       }
       }
       this.modalActive = false

      
       


    },
    selectFacultad(name){
    this.nombre_facultad = name
    },

    category(categoria,loader) {
       this.loader = loader
       this.inicio = false
      let { nombre, id} = categoria
      this.activeCategory = nombre
      this.categoria = nombre.toUpperCase()
   
   //cambiar estados del id categoria
     this.datosCategoria.id=id
     this.datosPrograma.id = 'all'

     //cambiar texto de los filtros
     this.datosPrograma.titulo = 'Programas'
     this.datosEtiqueta.titulo = 'Etiquetas' 

     this.getRegisterByCategory()
    

    },

    //OBTENER-REGISTRO-BY-CATEGORIAS
    getRegisterByCategory(){
      this.loader = true
     const payload = {
       id_categoria:this.datosCategoria.id,
       id_programa:this.datosPrograma.id,
       id_etiqueta:this.datosEtiqueta.id
     }
     this.$store.dispatch('registerByCategory',payload)
     .then(()=>this.loader = false)
    },

  //OBTENER TEMAS-CATEGORIAS
  getCategorys() {

       this.loader = true
      axios.get('https://gouapp.herokuapp.com/categorias')
        .then(resp => {
          //console.log(resp.data.borditem.comments)
          const categoria = resp.data.categoria;
          this.categorias = categoria
           this.loader = false
           this.getRegister()
         


        })
        .catch(err => console.log(err));

    },
    getEtiquetas(){
       this.spinner = true
          const payload = {
          programa: this.datosPrograma.id,
          tema: this.datosCategoria.id,
          searchTags:this.queryTag
        }
        this.$store.dispatch('etiquetasData', payload)
          .then(() => {
            this.spinner = false
          })
          .catch(err => {
            this.spinner = true
          })
    },
    getPrograma() {
      this.spinner = true
      this.$store.dispatch('programData').then(() => {
        this.spinner = false
      })
    },
  
    goToHome() {
      this.categoria = 'Noticias',
      this.activeCategory = 'noticias'
      this.$router.replace('home')
     this.$router.push({name:'all',params:{loader:false}})

     this.datosCategoria.id='all'
     this.datosEtiqueta.titulo=''
     this.datosPrograma.titulo=''
     
    },
      getRegister(){
    
            this.loader = true
             const payload = {
                  id_programa:this.datosPrograma.id,
                  id_etiqueta:this.datosEtiqueta.id
             }
             this.$store.dispatch('registerData',payload)
         .then(()=>{
             this.loader = false
             if(this.activeCategory === ''){
                this.$router.push({name:'all',params:{loader:false}})
             }
              
              
              
         }) 

         
            
           },
           disabledFilter(data){
             if(data === 'Programas'){
              
                this.datosPrograma.titulo = ''
                this.datosPrograma.id = 'all'
             }
             if(data === 'Etiquetas'){
        

                  this.datosEtiqueta.titulo = ''
                 this.datosEtiqueta.id = 'all'
             }
             this.getRegister()
          
           }

  },

  
  beforeUpdate(){
    /*if(this.datosPrograma.id !== 'all' & this.datosEtiqueta.id !== 'all'){
      if(this.modalHeader !== 'Programas'){
           this.datosPrograma.id = 'all' 
       this.datosEtiqueta.id = 'all'
      }
      
      
    }*/
  }
}