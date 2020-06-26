<template>

<fragment v-if="registros.length != 0 ">
  
        <div class="welcome-box scale-to" style="width:100%">
 <welcomeIcon />
</div>
       <news 
   
       v-for="(registro, index) in registros"
       :key="index"
        :title="registro.titulo" 
         :description="registro.descripcion"
         :poster="registro.photo"
         :views="registro.visita"
         :likes="registro.like"
         @viewDetails="viewPostDetails">
         
          <div  slot="tagprograma" class="d-flex b-rounder--1" :class="'bg-'+registro.programa.descripcion">
               <h3 class="text text-medium text--white">Ember louis / </h3>     
              <span  slot="tag-program" class="text text-medium text--white ml-1 ">{{ registro.programa.nombre }}</span>
            </div>
       </news>
      
      
        <postDetails  v-if="showDetails" :photo="this.postDetails.img"  :title="this.postDetails.title" @closet="showDetails = false" />
       </fragment>
        <div v-else>
            
             <div v-if="loader">
              <Loader />
             </div>
              <div v-else>
             <h1>No existen registros</h1>
             </div>
         
       </div>
</template>
<script>
   import {
        mapState,
        mapGetters,
        mapMutations
    } from 'vuex'

      import news from '../../components/news'
     import Loader from '../../components/loading'
     import welcomeIcon from '../../components/icons/welcome'
     import postDetails from '../../components/PostDetalle'
     import details from '../../mixins/postDetails'
export default {
     mixins:[details],
     props:['loader'],
    components:{
         news,
         Loader,
         welcomeIcon,
         postDetails,


    },
 
  
     computed:mapState(['registros']),



}
</script>