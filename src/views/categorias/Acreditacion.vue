<template>

<fragment v-if="registrosCategoria.length != 0 ">


 <post
   
       v-for="(registro, index) in registrosCategoria"
       :key="index"
         :description="registro.descripcion"
         :poster="registro.photo"
         :views="registro.visita"
         :likes="registro.like"
          @viewDetails="viewPostDetails"
          class="appear">
          <div slot="cardHeader" class="d-flex m-card--header__acreditacion ">
               <div class="d-flex">
                   <div class="header-icon__acreditacion  d-flex justify-content bg-gradient--green">
                <font-awesome-icon class="text text--white" :icon="['fa','book']" />
  
              </div>
             </div>
              <h2 class="ml-2 text text-normal text--green d-flex-1">{{ registro.titulo}}</h2>
            
        
            </div>
            <div slot="cardFooter" class="mt-2 d-flex ">
              <div class="rate-opinion d-flex-1">
              <span>Opinion</span>
              
               </div>
               <div class="d-flex mt-5" @click="openComment(registro._id)">
                 <span>+10</span>
                  <font-awesome-icon class="text text-title--name text--green-light" :icon="['fa','comment-alt']" />
               </div>
            </div>
         
       </post>

      <postDetails  v-if="showDetails" :photo="this.postDetails.img"  :title="this.postDetails.title" @closet="showDetails = false" />

<modal  v-if="showComentario" class="bg-blue-dark appear" @swipe="swipe">
  <div slot="modalheader" class="d-flex justify-content">
     <font-awesome-icon class="text-normal text--white position-absolute position-move__top-1 position-move__left-1" :icon="['fa','times']"  @click="showComentario = false" />
     
        <div class="d-flex ">
      <h2 class="text--blue">Comentarios</h2>
  </div>
  </div>
 
  <div slot="modalbody" class="d-flex flex-column p-1 mt-2">
       <fragment v-if="!loader">
       <div class="m-comments-box" v-if="comentcontext !==false && comentarios.length != 0">

        
          <div class="m-comments d-flex flex-column b-rounder--1 mt-3 scale-to" v-for="(comentario,key) in comentarios" :key="key">
              <div class="m-comments-user d-flex">
              <div class="m-comments-user__avatar d-flex justify-content mr-2">
              <font-awesome-icon class=" text--black" :icon="['fa','user-alt']" size="1x" />
              </div>
               <span class="">{{ comentario.author.username }}</span>
              </div>
              
              <div >
                <span class="text text-medium">{{ comentario.comentario }}</span>
              </div>
          </div>
               <div  class="btn-add-comments circle bg-blue position-absolute position-move__bottom-2 position-move__right-3 d-flex justify-content" @click="sh">
             <font-awesome-icon class="text text-title--name text--white" :icon="['fa','comment-alt']" />
          </div>
          
       </div>
       
        <div v-else class="d-flex flex-column align-items" style="height:100vh">
     
               <font-awesome-icon class=" text--blue" :icon="['fa','comment-alt']" size="6x" />
          <span class="text text--normal text--blue">!se el primero en comentar!</span>
         <textArea  name="comentario" @onchanged="onchange" placeholder="coment" />
         <button class="m-btn m-btn__blue mt-3" @click="comment">Comentar</button>
         
    
       </div>
 
       </fragment>
       <div v-else class="d-flex justify-content flex-column" >
          
       <Spinner color="#0fdb8d" :size="40"></spinner>
       <span class="text--white">publicando...</span>
       </div>
      
  </div>
</modal>

</fragment>
<div v-else>
 
</div>
</template>
<script>
/*plugins*/

import { mapState } from 'vuex'
import axios from 'axios'
/* Components */
import post from '../../components/news'
import postDetails from '../../components/PostDetalle'
import modal from '../../components/modal'
import textArea from '../../components/textArea'
import Spinner from 'vue-spinner-component/src/Spinner.vue'
import loading from '../../components/loading'
/*MIXINGS*/
import details from '../../mixins/postDetails' 
export default {
mixins:[details],
props:['categoria'],
components:{
  post,
  postDetails,
  modal,
  textArea,
 Spinner,
 loading
},
data(){
 return{
     loader:false,
     showComentario:false,
     comentarios:[],
     comentario:{
       author:'5e8e6936839d5e122f814bf2',
       comentario:null
     },
     id_registro:null,
     comentcontext:true,
 }
},

watch:{
  registrosCategoria: function(oldate,newdate){
    console.log(oldate)
  }
},
methods:{
  sh(){
   this.comentcontext = false
  },
  swipe(state){
     this.showComentario = state
  },
  onchange(text,name){
    this.comentario[name] = text
  },
     comment(){
            this.loader = true
            const comentario = {
                comentario:this.comentario.comentario,
                author:this.comentario.author
            }
          axios.post(`https://gouapp.herokuapp.com/registro/${this.id_registro}/comentario`,comentario)
           .then(resp => {
                   
                  this.loader = false
                  this.comentcontext = true
                  this.getComents(this.id_registro)
                    
                })
                .catch(err => {
                   
                    console.log(err)
                });
        },
        openComment(registro){
          this.showComentario = true
          this.id_registro = registro
   
          this.getComents(registro)
        },
        getComents(id_registro){
          this.loader = true
            axios.get(`https://gouapp.herokuapp.com/registro/${id_registro}/comentarios`)
           .then(resp => {
                   
                    const posts= resp.data;
                    this.loader = false
                    this.comentarios = posts
                    
                })
                .catch(err => {
                   
                    console.log(err)
                });
        }
},
mounted(){

},
computed:mapState(['registrosCategoria'])
    
}
</script>