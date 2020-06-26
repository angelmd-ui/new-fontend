<template>
    <div class="container-view">
        <headerBase bgcolor="bg-purple" height="85px">
            <div slot="header-content" class="appear">
                <div class="d-flex">
                    <font-awesome-icon class="text text-normal text--white mr-3  d-lfex" :icon="['fa','arrow-left']"
                        @click="$router.push('/academico')" />
                    <h1 class="text text-title--name  text--white">Aportes</h1>
                </div>

                <div class="d-flex mt-2 text text--white"><span class="mr-2">Todos</span> / <span class="ml-2"> Tus post</span></div>
            </div>
        </headerBase>

        <!--Posts
               <div class="translatex p-1" >
                   <h3>Posts</h3>
            <div v-for="(post,index) in posts" :key="index" class="p-1 shadow b-radius--2 mt-1" >
                <h2 class="text text--blue">{{ post.titulo }}</h2>
                <hr>
                <div>
                    <span class="bg-blue  text--white" @click="openModal(post._id)">Comentar</span>
                    <h4>Respuestas</h4>
                    <div class="mt-2">
                        <div v-if="post.responses.length <= 0">
                           <p>No hay comentarios</p>
                        </div>
                      <div v-else v-for="(response,res) in post.responses" :key="res" class="mt-2">
                          <span>
                             {{ response.author.username }}
                          </span>
                          <p >
                            {{ response.comentario }}
                          </p>
                      </div>
                    </div>
                </div>

            </div>
                </div>
               --->
     
        <post v-for="(post,index) in posts" :key="index" :title="post.titulo" class="appear">

            <div slot="cardFooter" class="mt-2 d-flex ">
                <userProfile class="d-flex d-flex-2" >
                    <div slot="description">
                  <star-rating read-only :star-size="15" :rating='4.0'></star-rating>
                </div>
                </userProfile>
                <div class="d-flex mt-5" @click="openComment(post._id)">
                 <span class="text text-medium">+10</span>
                  <font-awesome-icon class="text text-title--name text--black-light" :icon="['fa','comment-alt']" />
               </div>
                
            </div>

        </post>
    
        <Modal v-if="modal" @closet="modal = false">
            <div slot="message">
                <h1 class="text--white">Comentar</h1>
                <h4>Quieres comentar</h4>
                <textarea rows="9" placeholder="Comentar....." v-model="comentario.mensaje"></textarea>
                <button @click="comment">Comentar</button>
            </div>
        </Modal>

<modal  v-if="showComentario" class="bg-white appear" @swipe="swipe">
  <div slot="modalheader" class="d-flex justify-content">
     <font-awesome-icon class="text-normal text--white position-absolute position-move__top-1 position-move__left-1" :icon="['fa','times']"  @click="showComentario = false" />
     
        <div class="d-flex ">
      <h2 class="text--blue">Comentarios</h2>
  </div>
  </div>
 
  <div slot="modalbody" class="d-flex flex-column p-1 mt-2">
       <fragment v-if="!loader">
       <div class="m-comments-box" v-if="comentcontext !==false && comentarios.length !== 0">

        
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
         {{ comentario.comentario }}
         
    
       </div>
 
       </fragment>
       <div v-else class="d-flex justify-content flex-column" >
          
       <Spinner color="#0fdb8d" :size="40"></spinner>
       <span class="text--white">publicando...</span>
       </div>
      
  </div>
</modal>

        <botmenu>
           <fragment slot="items">
           <div   class="menu-bottom__item d-flex flex-column justify-content" @click="$router.push('/aportes/add')">
              <font-awesome-icon class="text text-normal text--white mr-3  "
              :icon="['fa','plus-circle']"  /> 
             <span class="text--white">aportar</span>
           </div>
           </fragment>
        </botmenu>
    </div>
</template>
<script>
    //Library
    import axios from 'axios'
    //components
    import headerBase from '../../../components/header'
    import Modal from '../../../components/messages'
    import post from '../../../components/news'
    import userProfile from '../../../components/userProfile'
    import botmenu from '../../../components/academy/botmenu'
    import modal from '../../../components/modal'
    import Spinner from 'vue-spinner-component/src/Spinner.vue'
    import textArea from '../../../components/textArea'
    export default {
        components: {
            Modal,
            headerBase,
            post,
            userProfile,
            botmenu,
            modal,
            Spinner,
            textArea
        },
        data() {
            return {
                posts: [],
                comentario: {
                    comentario:null,
                    author: '5e8e6936839d5e122f814bf2'
                },
                comentarios:[],
                modal: false,
                loader:true,
                showComentario:false,
                id_post: '',
                comentcontext:true,
            }
        },

        //Caundo se comenta un posts el usuario que se cargue solamente  los comentario del pots comentado
        methods: {
              sh(){
   this.comentcontext = false
  },
              swipe(state){
          this.showComentario = state
       },
         onchange(text,name){
    this.comentario[name] = text
  },
            getPosts() {
                axios.get('https://gouapp.herokuapp.com/service/posts')
                    .then(resp => {

                        const posts = resp.data;
                        this.posts = posts

                    })
                    .catch(err => {

                        console.log(err)
                    });
            },

            openModal(id_post) {
                this.modal = true
                this.id_post = id_post
            },
            comment() {
                
                this.loader = true
                const comentario = {
                    comentario: this.comentario.mensaje,
                    author: this.comentario.author
                }
                axios.post(`https://gouapp.herokuapp.com/service/post/${this.id_post}/comentario`, comentario)
                    .then(resp => {
                         this.loader = false
                       this.comentcontext = true
                       this.showComentario = false
                        const posts = resp.data;
                        this.getPosts()
                

                    })
                    .catch(err => {

                        console.log(err)
                    });
            },
              openComment(post){
          this.showComentario = true
          this.id_post = post
   
          this.getComents(post)
        },

        getComents(id_post){
          this.loader = true
            axios.get(`http://localhost:3000/service/post/${id_post}/comentarios`)
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
        mounted() {
            this.getPosts()
        }
    }
</script>