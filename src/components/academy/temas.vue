<template>
  <div class="">
    <div v-if="!loader">
      <h1 class="text text-normal text--black">Temas</h1>
      <div v-if="services.lenght !== 0">

        

        <div v-for="(service,index) in services" :key="index" class="service-card translatex shadow b-rounder--2 mt-3"
          :style="{
               backgroundImage: 'url('+ require('../../assets/img/overlays_tema.jpg') +')' ,
               'background-repeat':'no-repeat',
                'background-size':'cover',}">
          <div class="overlays-cover position-absolute position-move__top-0 position-move__left-0">

          </div>
          <div class="service-card__user ">
            <div class="service-card__user-header d-flex flex-column ">
          
               <h2 class="text text-title--name text--white ">{{ service.titulo }}</h2>
                
                <div class="d-flex mt-1">
                  <img ref="imgUser" class=" mr-2" :src="service.usuario.photo" />
                  <div class="d-flex flex-column">
                    <span class="text text-medium text--white">{{ service.usuario.username }}</span>
                   <span class="text text-medium" @click="perfil(service.usuario._id)">ver perfil</span>
                  </div>
                  
                  <div class="d-flex tag-tweet">
                    <div>
                    <span class="text text-small  b-rounder--2 bg-white ml-2">Etiqueta</span>
                    </div>
                  </div>
                 

                </div>

                <div>

             
              </div>
            </div>
          </div>


        </div>

      </div>
      <div v-else>
        <h1>No hay servicios</h1>
      </div>


    </div>
    <Spinner v-else color="#0fdb8d" :size="40"></spinner>

  </div>
</template>
<script>
  import axios from 'axios'
  import Spinner from 'vue-spinner-component/src/Spinner.vue'
  import carousel from 'vue-owl-carousel'
  import postDetails from '../PostDetalle'

  export default {
    props: ['title'],
    components: {
      Spinner,
      carousel,
      postDetails
    },
    data() {
      return {
        services: [],
        loader: true,
        token:this.$store.state.token
      }
    },
    methods: {
      getServices(id_area, id_work) {
       

        const vm = this
        axios.get(`http://localhost:3000/tema/${id_area}/${id_work}`, 
          {
            headers: {
            "token": `${this.$store.state.token}`
            } 
        } )
          .then(resp => {

            const service = resp.data;
            console.log(resp)
            vm.services = service
            vm.loader = false


          })
          .catch(err => {
            console.log(err)
          });
      },
      details(service) {
        this.$router.push({
          name: 'ServicioDetalle',
          params: {
            detalle: service
          }
        })
      },
      perfil(id) {
        this.$router.push({
          name: 'perfilDetalle',
          params: {
            id_user: id
          }
        })
      }
    },
    mounted(){
      
     
      
    }
  }
</script>