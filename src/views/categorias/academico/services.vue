

<template>
    <div class="container-view">

       <headerBase bgcolor="bg-white" height="85px">
        <div  slot="header-content" class="appear">
           <div class="d-flex">
               <font-awesome-icon class="text text-normal text--purple mr-3  d-lfex"
                :icon="['fa','arrow-left']" @click="$router.push('/home')" />
            <h1 class="text text-title--name text--purple">Experiencias</h1>
        </div>
   
           <div class="d-flex ">
      
            <selectFilter @active="activeMenu" text_color="white"    text="Areas" :select="datosAreas.select" :bg="[active === 'Areas' ?'#15ed53' : '#6e19f4' ]"  class="mr-2" @desactive="desactive()"/>
            <selectFilter @active="activeMenu" text_color="white" :select="datosTrbajos.select" text="Procesos" :bg="[active === 'Procesos' ?'#15ed53' : '#6e19f4' ]" class="mr-2 " @desactive="desactive()"  />
            <selectFilter @active="activeMenu" text_color="white" :select="datosTrbajos.select" text="Etiquetas" :bg="[active === 'Trabajos' ?'#15ed53' : '#6e19f4' ]" class="mr-2 " @desactive="desactive()"  />
           </div>
        </div>
       </headerBase>
  
        
          <!-- SERVICE-CONTAINER-VIEW -->
        <div  class="p-1 appear box-services">
             
           
            <!-- <div class=" shadow p-1 b-rounder--1 bg-white appear"  >
               <h1 class="text text--green" >En que te ayudo!</h1>
               <div :style="{
               'background-image': 'url('+ require('../../../assets/SVG/bg_academy-tech.svg') +')' ,
               'background-repeat':'no-repeat',
                'background-size':'cover',
                'width':'100%',
               'height':'160px',
           
   }">

               </div>
              <button class="m-btn m-btn__green mt-2" @click="$router.push('/preguntas/add')">Preguntale a la comunidad</button>
             </div>-->
                             
                <!--Services-->
                <h1 class="mt-2"></h1>
               <!--Areas-->
               <!-- <div v-if="!service" class="areas-box ">
                <div v-if="!loader">
                   <div v-for="(area,index) in areas" :key="index" @click="getArea(area.nombre,area._id)" class="translatex" >
                      <areas  :nombre="area.nombre" />
                   </div>
                   
                   </div>
            
               <div v-if="loader">
                <Spinner color="#0fdb8d" :size="40"></spinner>
               </div>
                </div>-->
              
                <temas  :title="serviceHeader" ref="serviced" class="appear" @viewDetails="viewPostDetails" />
           
        </div>
        <!--Categorys-->
       
       <categorys  v-if="category" :active="active" @categoriaActive="getCategoty" @closet="category = false" />
       
        <botmenu>
           <fragment slot="items">
              <div  class="menu-bottom__item d-flex flex-column justify-content" @click="$router.push('/aportes')">
              <font-awesome-icon class="text text-normal text--white mr-3  "
              :icon="['fa','comment-dots']"  /> 
             <span class="text--white">Aportes</span>
           </div>
           <div   class="menu-bottom__item d-flex flex-column justify-content" @click="$router.push('/temas/add')">
              <font-awesome-icon class="text text-normal text--white mr-3  "
              :icon="['fa','plus-circle']"  /> 
             <span class="text--white">Crear tema</span>
           </div>
           </fragment>
        </botmenu>

        <postDetails  v-if="showDetails" :photo="this.postDetails.img"  :title="this.postDetails.title" @closet="showDetails = false" /> 
    </div>
</template>

<script>
//Library
  import axios from 'axios'
  import {mapState} from 'vuex'
 
 

  //Componentes
  import selectFilter from '../../../components/filter'
  import temas from '../../../components/academy/temas'
  import categorys from '../../../components/academy/categorys'
  import headerBase from '../../../components/header'
  import areas from '../../../components/academy/areas'
  import categoryFilter from '../../../mixins/categoryFilter' 
  import Spinner from 'vue-spinner-component/src/Spinner.vue'
  import postDetails from '../../../components/PostDetalle'
  import botmenu from '../../../components/academy/botmenu'


//Mixins
import postdetails from '../../../mixins/postDetails'

export default {
    //props:['id_area','id_work'],
     mixins:[categoryFilter,postdetails],
     components:{
        selectFilter,
        temas,
        categorys,
        headerBase,
        areas,
        Spinner,
        postDetails,
        botmenu
       
    },
    data(){
        return{
          service:false,
          serviceHeader:'Servicios',
          posts:[],
          loader:true
          
         
        }
    },
    methods:{
             getCategoty(data){
             const { id,name } = data
            
              this.service = true
            this.category=false
           
             
            if(this.active === 'Procesos'){
                this.datosTrbajos.id_trabajo = id
                this.datosTrbajos.select = name
                //this.active = ''
  
               
                 
            }
               if(this.active === 'Areas'){
                   this.datosAreas.id_area = id
                   this.datosAreas.select = name
                   //this.active = ''
            
            }
                  
                  //OBTERNER TEMAS--SERVICIOS
                  this.$refs.serviced.getServices(this.datosAreas.id_area, this.datosTrbajos.id_trabajo)
        },
   

      desactive(){
         this.service = false
         this.datosTrbajos.select=""
            this.datosTrbajos.id_trabajo="all"
            this.datosAreas.select=""
            this.datosAreas.id_area="all"

            //OBTERNER TEMAS--SERVICIOS
            this.$refs.serviced.getServices(this.datosAreas.id_area, this.datosTrbajos.id_trabajo)
      },
        getArea(name,id){
           this.datosAreas.select = name
         this.service = true
         this.datosAreas.id_area = id

         //OBTERNER TEMAS--SERVICIOS
       this.$refs.serviced.getServices(this.datosAreas.id_area, this.datosTrbajos.id_trabajo)
         this.$store.dispatch('trabajosData', this.datosAreas.id_area)
      }
   
       
         
        
    },
    mounted(){
       this.$refs.serviced.getServices(this.datosAreas.id_area, this.datosTrbajos.id_trabajo)
    }
    /*mounted(){
       this.$store.dispatch('areasData').then(()=>{
          this.loader = false
          
          })
    },
    computed:{
       ...mapState(['areas'])
       }*/

   

    
}
</script>