<template>
      <div :style="{'width':width}" class="m-input mt-4">
                 <h3 class="m-input--label  " :class="labelColor">{{ label }}</h3>
               <div class="m-input--box mt-1">
         <input :type="type" name="title" ref="input"  :placeholder="placeholder" @keyup="inputChanged()" />
         </div>
            </div>
</template>
<script>
export default {
    props:{
        label:{
            type:String,
            description:'titulo label input '
        },
        labelColor:{
           default:'text--white'
        },
         name:{
            type:String,
            description:'name l input '
        },
        width:{
         type:String
        },
        type:{
         default:'text'
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
      inputChanged(event){
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