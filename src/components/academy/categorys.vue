<template>
     <div  id="category-services"  class=" position-fixed position-move__top-0 position-move__left-0 d-flex flex-column bg-white translate">
            <!--Trabajos-->
            <div class="p-1" v-if="active == 'Procesos'">
                <div class="d-flex">
                       <span class="mr-4" @click="$emit('closet')" >X</span>
                      <h2 class="text text--black">Procesos</h2>
                   </div>
               <div v-if="trabajos.length === 0 ">
                 <h1>no se encontro.... (seleccione un area)</h1>
               </div>
            <div class="proccess-card d-flex  b-rounder--2 p-1 mt-2" v-else v-for="(trabajo,index) in trabajos" :key="index" @click="viewService(trabajo._id,trabajo.nombre)">
                 <font-awesome-icon class="text text-normal text--purple mr-3  d-lfex"
                :icon="['fa','flask']" @click="$router.push('/home')" />
                <h2 class="text text--purple ">{{ trabajo.nombre }}</h2>

            </div>
                </div>

                  <!--Areas--->  
               <div  class="p-1" v-if="active == 'Areas'">
                   <div class="d-flex">
                       <span class="mr-4" @click="$emit('closet')" >X</span>
                      <h2>Areas</h2>
                   </div>
            <div class="area-card b-rounder--2 mt-2 d-flex " v-for="(area,index) in areas" :key="index" @click="viewService(area._id,area.nombre)">
                <div class="area-card--overlays " :style="{
               'background-image': 'url('+ require('../../assets/SVG/bg_pedagoy.svg') +')'}">
                </div>
                <div class="area-card__icon ml-4 d-flex justify-content">   
                   <div class="area-card__icon-box" :style="{
               'background-image': 'url('+ require('../../assets/SVG/pedagogy.svg') +')'}">
                    
                   </div>
                </div>
                <h3 class="text text--white ml-4">{{ area.nombre }}</h3>

            </div>
                </div>

        </div>
</template>
<script>
 import { mapState } from'vuex'
export default {
    props:['active'],
    data(){
        return{
          id_area:'all'
        }
    },
    methods:{
         viewService(id,name){
             const { active } = this.$props
             this.id_area = id
             const category ={id,name}
          this.$emit('categoriaActive',category)
             
          
           if(active === 'Areas'){
               this.$store.dispatch('trabajosData',this.id_area)
           }
                
        
         
        
        },
      
       
       
    },
    mounted(){
       
               if(this.active === 'Areas'){
              
                   this.$store.dispatch('areasData')
                  
               }
    },
     computed:{
        ...mapState(['trabajos','areas'])
    },
  
    
}
</script>