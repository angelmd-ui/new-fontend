<template>
      <div  class="m-textarea d-flex mt-2 ">
                
         <textarea :style="{'width':width}" class=" b-rounder--1" rows="10"  type="text" name="text" ref="input"  :placeholder="placeholder" @keyup="inputChanged()" />
        
    </div>
</template>
<script>
export default {
    props:{
       
         name:{
            type:String,
            description:'name l input '
        },
        width:{
         type:String,
         default:'100%'
        },
         placeholder:{
            type:String,
            description:'titulo placeholder input'
        },
        model:{}
    },
    data(){
      return{
          dato:null
      }
    },
    methods:{
      inputChanged(){
        //let text = event.target.value
       let text = this.$refs.input.value
        let name = this.$props.name
     
        this.$emit('onchanged',text,name)

      }
   
    },
    mounted(){
     
      //this.data = $refs.title
    }
}
</script>