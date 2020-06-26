<template>
    <div class="post">
        <div class="post-header">
            <h2>{{ post.title }}</h2>
        </div>
        <div class="post-body">
            <h2>{{ post.descripcion }}</h2>
        </div>
        <div class="post-footer">
            <div class="post-coment-box">
                <div class="post-comment-inpu">
                    <button @click="addComments()">Add coments</button>
                    <textarea v-model="commenta.comment"/>
                    <input type="text" v-model="commenta.author">
                </div>
                <div class="comment-box">
                    <h3>comments </h3>
                      <div v-for="(item,index) in post.comments" :key="index"  class="comment-box__item">
                          <p>{{ item.comment }}</p>
                      </div>
                </div>

            </div>
            
        </div>
         
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
      return{
          commenta:{
              comment:'',
              author:''
          }
          
      }
    },
    props:['post'],
    methods:{
       addComments(){
           let vm = this;
        let id_post = this.post._id
         axios.post(`board/${id_post}/coment`,{
             comment:vm.commenta.comment,
             author:vm.commenta.author

         })
         .then(resp =>{
            console.log(resp)
         })
         .catch(error =>{
             console.log(error)
         })
       },
       
    },
    mounted(){
      
    }
}
</script>