<template>
  <fragment>
    <div v-if="loader == false" id="home" class="container-box flex-column">

      <headerBase bgcolor="bg-gradient--green" height="85px">
        <div v-if="view" slot="header-content" class="appear">
          <div class="d-flex justify-content" style="width:90%">
            <font-awesome-icon class="text text-normal text--white mr-3  d-lfex " v-if="categoria != 'Noticias'"
              :icon="['fa','arrow-left']" @click="goToHome()" />
            <h1 class="text text-title text--white d-flex-1 ">{{ categoria }}</h1>
            <font-awesome-icon class="text text-normal text--white  " :icon="['fa','search']" @click="searchView()" />
          </div>
          <div>
            <!--Filter-->
            <selectFilter 
            @desactive="disabledFilter"
            :bg="['rgba(#fff,.9)']"
            @active="activeProgram" text="Programas" 
            :select="datosPrograma.titulo" class="mr-4" />

            <selectFilter @active="activeProgram" text="Etiquetas" :select="datosEtiqueta.titulo" icon="tag" @desactive="disabledFilter" />
          </div>

        </div>
        <div v-else slot="header-content" class="translatex d-flex justify-content">
           <inputBase name="search" placeholder="buscar registros " style="width:80%;transform:translateX(-6%)" />
             <font-awesome-icon class="text text-normal text--white ml-1 " :icon="['fa','times']" @click="view = true" />
        </div>
      </headerBase>



      <!--MOSTRAT TODOS LOS REGISTROS DE 10 EN 10-->
      <div v-if="view" class="container-view ">
        <router-view></router-view>

      </div>

     <search v-if="!view" class="translatex" />

      <Menu :categorias="categorias" @activeCategory="category" :active="activeCategory">
        <div slot="item" @click="$router.push('registro@contenido')"
          class="menu-box--item d-flex flex-column justify-content b-rounder--1">
          <font-awesome-icon class="text text-title--name text--black-light" :icon="['fa','plus-circle']" />
          <h3 class="text  text-medium text--black-light">Crear</h3>
        </div>
      </Menu>


      <!--modal-->
      <modal class="bg-white" v-if="modalActive" :class="[ modalActive ? 'translateY' : 'translateY-reverse' ]" @swipe="swipe">
        <div slot="modalheader" class="d-flex">
          <font-awesome-icon class="text  text--black-light ml-2 mt-2" :icon="['fa','times']"
            @click="modalActive = false" />
          <div class="d-flex d-flex-1 justify-content flex-column text text-medium text--blue">
            <h4 class="text text-normal text--green">{{modalHeader}}</h4>
            <span class="mt-2" v-if="datosPrograma.id == null && modalHeader == 'Etiquetas'">Recomendados!</span>
             <inputBase v-if="modalHeader == 'Etiquetas' " class="d-flex"   placeholder="buscar etiqueta .." @onchanged="inputchanged"></inputBase>
          </div>
        </div>
        <!--PROGRAMAS-->
        
        <div v-if="modalHeader == 'Programas'" slot="modalbody"  style="padding:4px">
          <div class="spiner-box text-center d-flex flex-column justify-content" v-if="spinner">
            <Spinner color="#0fdb8d" :size="40"></spinner>
          </div>
          
          <div  v-else>
            <div class="d-flex justify-content flex-column" >
            <selectFilter  @active="activeProgram" text="Facultades" text_color="white" :bg="['#2bce41']" />
            <!--MOSTRAR FACULTADES-->
            <div v-if="facultades"
             class="falcultades-select shadow mt-2 bg-gradient--green b-rounder--2">
             <div class="d-flex" @click="nombre_facultad = null" >
             <font-awesome-icon class="text text--white d-flex justify-content" 
              :icon="['fa','university']" />
              <span class="text text--white text-small">Mostrar todos</span>
              </div>
              <span class="falcultades-select__item d-flex  justify-content text text--white mt-2 shadowb-rounder--2 "
               v-for="(programa,index) in programas" 
               :key="index"
               @click="selectFacultad(programa.facultad)">
                 
              {{programa.facultad}}</span>
            </div>
            </div>

            <div>


            </div>
            <div class="box-program mt-2 " >
                      <div  style="padding:2px"
           @click="selectPrograma('all')"
            class="shadow d-flex  justify-content flex-column b-rounder--2 mr-1 mt-1 text-center scale-to">


            <font-awesome-icon class="text text-title--name  mb-1 text--black-light" 
              :icon="['fa','newspaper']" />

            <span class="text text-small text--black-light" >Todo</span>


          </div>
          <div  v-for="(programa,index) in getProgramafacultades" :key="index" style="padding:2px"
           @click="selectPrograma(programa._id,programa.descripcion)"
            class="shadow d-flex  justify-content flex-column b-rounder--2 mr-1 mt-1 text-center scale-to">


            <font-awesome-icon class="text text-title--name  mb-1 " :class="'text--'+programa.descripcion"
              :icon="['fa',programa.icon]" />

            <span class="text text-small" :class="'text--'+programa.descripcion"> {{ programa.descripcion }}</span>


          </div>
          </div>
     
           </div>
        </div>

        <!-- ETIQUETAS -->
        <div slot="modalbody" v-else>
          <div class="spiner-box d-flex flex-column justify-content  " v-if="spinner == true">

            <Spinner color="#0fdb8d" :size="40"></spinner>
            <span class="text text--green text-center">Etiquetas....</span>


          </div>
          <div class="box-program mt-4 "  style="padding:4px" v-else>
            <div class="spiner-box text-center d-flex flex-column justify-content  " v-if="etiquetas.length == 0">
              <div class="mt-10">
                <font-awesome-icon class="text text-title--name  text--black-light mb-1 " :icon="['fa','tag']" />
                <h2 class="text text-title--name text--black-light">! no hay etiquetas</h2>

              </div>
            </div>
            
             
                <div 
                @click="selectPrograma(etiqueta._id,etiqueta.titulo)"
                v-else v-for="(etiqueta,index) in etiquetas" :key="index"
              class="box-program-item d-flex  justify-content flex-column b-rounder--2 mr-1 mt-1 text-center scale-to">
             
             
                <font-awesome-icon class="text text-title--name  text--black-light mb-1 " :icon="['fa',etiqueta.icono]" />

                <span class="text text-small text--black-light"> {{ etiqueta.titulo }}</span>
           

            </div>
  
           
          </div>
        </div>


      </modal>

     


    </div>
    <Loader v-else text="cargando..." />
  </fragment>
</template>
<script>
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex'


  import axios from 'axios'
  import carousel from 'vue-owl-carousel'
  import news from '../components/news'
  import Menu from '../components/menu'
  import Programas from '../components/programasIcons'
  import Loader from '../components/loading'
  import headerBase from '../components/header'
  import selectFilter from '../components/filter'
  import modal from '../components/modal'
  import Spinner from 'vue-spinner-component/src/Spinner.vue'
  import inputBase from '../components/input'
  import inicio from './categorias/inicio'
   import welcomeIcon from '../components/icons/welcome'
   import search from './search'


  import registroFilter from '../mixins/registroFilter'
  import notification from '../mixins/notificacion'

  export default {
    props:['photo','title'],
    mixins:[registroFilter,notification],
    data(){
     return{
     
       showDetails:false,
       view:true
     }
    },
    components: {
      carousel,
      news,
      Menu,
      Programas,
      Loader,
      headerBase,
      selectFilter,
      modal,
      Spinner,
      inputBase,
      inicio,
      welcomeIcon,
      search
   

    },


   
    methods:{
       swipe(state){
     this.modalActive = state
  },
  searchView(){
    this.view = false
  }
    },
     created() {
     this.getCategorys()
    
  
  },

  

  computed: {
    getProgramafacultades(){
    return this.$store.getters.getFalcultades(this.nombre_facultad)
    },
    ...mapState(['programas','etiquetas','registros']),


  },

  }
</script>
<style scoped>

</style>