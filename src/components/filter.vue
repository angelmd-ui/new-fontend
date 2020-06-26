<template>
    <div   class="select-box  b-rounder--4 mt-2 shadow" :style="{'background-color':bg }" >
        <div @click="active" >

             <font-awesome-icon 
            
             class="text  text-medium ml-2  " :icon="['fa',icon]" :class="'text--'+text_color" @click="desactiveFilter" />
            <span  class="text text-medium "   v-if="select || select !== ''" :class="'text--'+text_color">{{ select }}</span>
             <span  class="text text-medium "   v-else :class="'text--'+text_color">{{ text }}</span>
            
        </div>
        <div  v-if="select !== '' & select !== text" @click="desactiveFilter">
       <font-awesome-icon 
            
             class="text  text-medium ml-2  " :icon="['fa','times']"  :class="'text--'+text_color"  />
             </div>
    </div>
</template>
<script>
export default {
    props:{
        text:{
            type:String
        },
        text_color:{
            type:String,
            default:'white' 
        },
        bg:{
            type:Array,
            //default:['rgba(#fff,.5);']
        },
        select:{
           default:''
        },
        icon:{
             type:String,
            default:'arrow-down'
        }
    },
    methods:{
        active(){
            let name = this.$props.text
            let swh = true
            this.$emit('active',swh,name)
        },
          desactiveFilter(){
       
          this.$emit('desactive',this.$props.text)
       
    }
    }
  
}
</script>