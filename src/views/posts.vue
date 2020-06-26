<template>
    <div>
        <h1>Post</h1>
         <poster :post="itemPost"/>
    </div>
</template>
<script>
import poster from '../components/card'
import axios from 'axios'
export default {
    components:{
      poster
    },
    data(){
        return{
         post:this.$route.params.po,
         itemPost:{}
        }
        
    },
    methods:{
        getItemPost(){
         let vm = this;
         axios.get('board/'+this.post)
         .then(resp =>{
             //console.log(resp.data.borditem.comments)
             vm.itemPost = resp.data.borditem;
         })
         .catch(err=>console.log(err));
        }


    },
   created(){
        this.getItemPost();
    }
}
</script>