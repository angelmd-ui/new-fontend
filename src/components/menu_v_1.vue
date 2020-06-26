<template>
   
 <fragment>
   
      <div  v-if="loader == false" class="menu bg-white translatex"  id="iconcloset">
        <Header bgcolor="bg-gradient--purple" height="140px" >
          <template slot="header-content" >
            <div class="d-flex" >
                <div class="d-flex-1 d-flex mt-2 text-center">
                             <font-awesome-icon  class="text text-title text--white mr-4 " :icon="['fa','times']" @click="closetWidget"/>
             <h1 class="text text-title   text--white mr-6 ">Quieres ver...</h1>
                </div>

                <font-awesome-icon class="text text-title text--white d-flex-1 mt-2" :icon="['fa','search']" />
            </div>
               
          </template>
        </Header>

        <div class="menu-box ">
          <div 
           @click="linkDirect(categoria.nombre,categoria._id)"
          class="menu-box--item bg-gradient--blue translate"
          v-for="(categoria,index) in categorias" :key="index">
             <font-awesome-icon class="text text-title text--white" :icon="['fa','newspaper']" />
             <h3 class="text--white">{{ categoria.nombre }}</h3>
          </div>
            <div 
           @click="$router.push('registro@contenido')"
          class="menu-box--item bg-gradient--blue translate"
           >
             <font-awesome-icon class="text text-title text--white" :icon="['fa','newspaper']" />
             <h3 class="text--white">Crear</h3>
          </div>
        
         
      

        </div>
       
     </div>
     <loader v-else text="cargando.." />
     </fragment>
</template>
<script>
 import {
        mapState,
        mapGetters,
        mapMutations
    } from 'vuex'

import Header from './header'
import loader from './loading'
export default {
    components:{
        Header,
        loader
    },
    data(){
     return{
       closet:false,
       loader:true
     }
    },
    methods:{
        closetWidget(){
         this.$emit('closetMenu')
        },
        linkDirect(nombre,id){
          this.$router.push(nombre)
          const categoria = {id,nombre}
          this.$emit('activeCategory',this.closet,categoria)

        }
    },
       created() {
           
            this.$store.dispatch('temasData').then(() => {
                this.loader = false
                console.log('finalizado')
            })


        },

        computed: {
            //...mapState(['programas']),
            ...mapState(['categorias'])
        }
    
}
</script>