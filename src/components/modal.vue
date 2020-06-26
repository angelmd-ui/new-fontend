<template>

    <div class="m-modal shadow" ref="modals" >
        <v-touch @swipedown="toucher"  >
        <div class="m-modal--header">
           <slot name="modalheader">

           </slot>
        </div>
           <div class="m-modal--body">
           <slot name="modalbody" ></slot>
        </div>
 </v-touch>
    </div>
   
</template>
<script>
export default {
    data(){
        return{
           swipe:false
        }
  
    },
    methods:{
     toucher(){
                   const mdy = this.$refs.modals
      console.log(screen.height)
 let vm = this
 mdy.addEventListener('touchmove',function(ev){
     //ev.preventDefault()
   let touchlocation = ev.targetTouches[0];
      this.style.transition = 'top 1s ease'
        this.style.top = touchlocation.pageY + 'px'
    if(touchlocation.pageY  > screen.height ){
     
        this.classList.add('desappear')

        this.addEventListener('animationend',()=>{
             vm.swipe = false
          vm.$emit('swipe',vm.swipe)
        })

    };
   

 })
     },
     doSomething(){
         console.log('swipe')
     }
    },
    mounted(){

    }
}
</script>