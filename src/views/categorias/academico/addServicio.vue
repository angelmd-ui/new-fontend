<template>
    <div class="">
        <h1>Servicio</h1>
    <div v-if="showServiceForm">  
      
        <p>Para prestar un servicio llene el siguiente formulario , toda informacion proporcionada </p>
       <div class="mt-2">
       <h4>Cuentanos sobre ti</h4>
       <textarea rows="9" placeholder="Tus habilidades" v-model="servicio.biografia" ></textarea>
        </div>
        <div>
            <h4>Contacto</h4>
            <inputBase  class="d-flex"  name="tel" placeholder="telefono"  @onchanged="inputchanged"></inputBase>
             <inputBase  class="d-flex"  name="correo" placeholder="Correo" @onchanged="inputchanged"></inputBase>
        </div>
        <span class="bg-blue" @click="showServiceProfile = true">INFO SERVICIO</span>
  </div> 
    <!--SERVICIO-->
   
    <div v-if="showServiceProfile">
      <div class="d-flex">
        <selectFilter @active="activeMenu"  :select="datosAreas.select" text="Areas" text_color="green" class="mr-4" name="Areas"  @desactive="disabledfilter" />
        <selectFilter @active="activeMenu"  :select="datosTrbajos.select" text="Trabajos" text_color="green" class="mr-4" name="Trabajos"  @desactive="disabledfilter" />
          
      </div>
        
      
       
          <inputBase  class="d-flex"  name="titulo" placeholder="Nombre del servicio" label="Nombre" @onchanged="inputchanged"></inputBase>
        <div>
            <h4>descripcion</h4>
        <textarea rows="9" placeholder="descripcion..." v-model="servicio.descripcion" ></textarea>
        </div>

        <div class="mt-2">
          <h4>Añadir photos</h4>
          <p>maximo 5</p>
          <input type="file" name="photo" multiple ref="file" id="file" style="display:block"
                            @change="onFile">
          <img width="100px" height="100px" :src="image" />
         
           
          <!--Hacer una grilla-->
          <div class="mt-2 shadow" style="width:50px; height:50px" v-for="(image,index) in images" :key="index"  >
            <img width="50px" height="50px" :src="image" />
          </div>
          <button @click="addService">add</button>
        </div>
         <categorys  v-if="category" :active="active" @categoriaActive="getCategoty" @closet="category = false" />
        </div>

      
    </div>
</template>
<script>
import axios from 'axios'
import inputBase from '../../../components/input'
import selectFilter from '../../../components/filter'
import categorys from '../../../components/academy/categorys'
import categoryFilter from '../../../mixins/categoryFilter' 
export default {
    mixins:[categoryFilter],
    components:{
      inputBase,
      selectFilter,
      categorys
    },
    data(){
        return{
         servicio:{
                 usuario:'5e8e6936839d5e122f814bf2',
                 tel:null,
                 direccion:'',
                 correo:'',
                 biografia:'',
                 titulo:'',
                 descripcion:'',
                 potho:[],

               
         },
         servicioProfile:{},
         showServiceForm:false,
         showServiceProfile:false,
         images:[],
         file:null,
         archives:[],
         image:null

        }
    },
    methods:{
            
            inputchanged(dato,name){
              this.servicio[name] = dato
            },
              onFile(event) {
                this.file = event.target.files[0]
                const filename = this.$refs.file.files[0].name
                //this.fileName = filename;
                //this.fileExtencion = filename.split('.').pop();
                this.createImage(this.file);
            },

            createImage(file) {
                this.archives.push(file)
                const image = new Image()
                const reader = new FileReader()
                let vm = this
                reader.onload = (e) => {
                 vm.images.push(e.target.result)
                };
               
                reader.readAsDataURL(file);
                           
            
            },
         
            removeImage: function (e) {
                this.image = '';
            },
            addService(){
                const vm = this
                 const formData = new FormData();
               
                formData.append('usuario', vm.servicio.usuario)
                formData.append('titulo', vm.servicio.titulo)
                formData.append('descripcion', vm.servicio.descripcion)
                formData.append('id_user', '5e8e6936839d5e122f814bf2')
                formData.append('area',  this.datosAreas.id_area) 

                if(this.datosTrbajos.id_trabajo !== 'all'){
                  formData.append('trabajo',  this.datosTrbajos.id_trabajo)  
                }
                
                this.archives.map(item =>{
                   formData.append('photo', item)
                  })
          
                axios.post('https://gouapp.herokuapp.com/servicio',formData)
                .then(resp => {
                   
                    const pots= resp.data;
                    console.log(pots)

                    if( vm.showServiceForm){
                      vm.updateUser()
                    }
                    
                })
                .catch(err => {
                   
                    console.log(err)
                });
        },
        updateUser(){
             const vm = this
             const info = {
              biografia: vm.servicio.biografia,
              contacto:{
                tel: vm.servicio.tel,
                correo:vm.servicio.correo
              }
             }
           
                 axios.put('https://gouapp.herokuapp.com/usuario/5e8e6936839d5e122f814bf2',info)
                .then(resp => {
                   
                    const pots= resp.data;
                    console.log(pots)
                    
                })
                .catch(err => {
                   
                    console.log(err)
                });
        },

      verifygetUser(){
         axios.get(`https://gouapp.herokuapp.com/usuario/5e8e6936839d5e122f814bf2`)
                .then(resp => {
                   
                    const usuario = resp.data;
                    console.log(usuario.statuService)
                    
                    if(!usuario.statuService){
                      this.showServiceForm = true
                      
                    }else{
                      this.showServiceProfile = true
                      this.verifygetServiceUser()
                    }

                
                    
                })
                .catch(err => {
                   
                    console.log(err)
                });
        
      
        },
        verifygetServiceUser(){
               axios.get(`https://gouapp.herokuapp.com/servicio/usuario/active/5e8e6936839d5e122f814bf2`)
                .then(resp => {
                   
                    const servicio = resp.data;
                    
                    if(servicio.length === 0){
                      this.showServiceProfile = true
                      this.showServiceForm = false
                    }

                    this.servicioProfile = servicio
                    
                })
                .catch(err => {
                   
                    console.log(err)
                });
        },
        getCategoty(data){
            this.category=false
            const { id,name } = data
            if(this.active === 'Trabajos'){
                this.datosTrbajos.id_trabajo = id
                this.datosTrbajos.select = name   
                 
            }
               if(this.active === 'Areas'){
                   this.datosAreas.id_area = id
                   this.datosAreas.select = name
            }
        }

    },
    mounted(){
    this.verifygetUser()
    }
}
</script>