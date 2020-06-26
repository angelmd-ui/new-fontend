<template>
    <div class="inicio bg-green d-flex justify-content flex-column appear">

   <h1 class="text text--white">¿Inicia como?</h1>
        <div  class="d-flex mt-4" :style="{
     'background-image': 'url('+ require('../assets/SVG/bg_academy-tech.svg') +')' ,
             'background-repeat':'no-repeat',
             'background-position':'center',
            'background-size':'95%',  
            'height':'210px',
            'width':'100%'
   }">
        </div>
        
        <button style="width:80%;padding:1em" @click="initApp('TEACHER')" class="m-btn m-btn__blue d-flex mt-5">Profesor</button>
         <button style="width:80%; padding:1em" @click="initApp('STUDENT')" class="m-btn m-btn__blue-dark d-flex mt-2 ">Estudiante</button>

    </div>
</template>
<script>
import notification from '../mixins/notificacion'
export default {
    mixins:[notification],
    methods:{
        initApp(role){
            //this.activeSubcribe()
          this.$store.commit('SET_ROLE_USER',role) 
          this.$router.push('login')
        }
    },
    created(){
 this.registersw()
}
}
</script>