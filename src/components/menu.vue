<template>
  
      <div   class="menu bg-white position-fixed position-move__bottom-0 position-move__left-0 z-index-10"  id="iconcloset">
      
        <div class="menu-box d-flex justify-content" >
             

             <div 
           @click="linkDirect(categoria.nombre,categoria._id)"
          class="menu-box--item d-flex flex-column justify-content  b-rounder--1 "
          :class="[active == categoria.nombre ? 'menu--item_scale':'']"
          v-for="(categoria,index) in categorias" :key="index">
             <font-awesome-icon 
             :class="[active == categoria.nombre ? 'text--green':'text--black-light']"
             class="text text-title--name " :icon="['fa',categoria.icono]" />
             <h3 class="text text-medium" :class="[active == categoria.nombre ? 'text--green':'text--black-light']" >{{ categoria.nombre }}</h3>
          </div>
          <slot name="item">

          </slot>
           

           
        
        
         
      

        </div>
       
     </div>
</template>
<script>

 

import Header from './header'
import loader from './loading'
import carousel from 'vue-owl-carousel'
export default {
    components:{
        Header,
        loader,
        carousel
    },
    props:{
      active:{
        type:String,
        default:''
      },
      categorias:{
        type:Array,
        default:[]
      }
    },
    data(){
     return{
       closet:false,
       loader:true,
       
     }
    },
    methods:{
   
        linkDirect(nombre,id){
          
          if(nombre === 'academico'){
                this.$router.push('/academico')
          }
          else if(nombre === 'noticias'){
            
            this.$router.push('/home')
          }else{
             this.$router.push({ name:nombre, params: {categoria: id }})
          const active = this.active
          const categoria = {id,nombre,active}
          this.$emit('activeCategory',categoria,this.loader)
          }
       

        },
       
    }
       

    
}
</script>