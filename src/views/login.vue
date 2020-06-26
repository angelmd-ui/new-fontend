<template>
   
   <div class="inicio  bg-green">
       <div class="d-flex flex-column justify-content translatex">
           <div class="d-flex justify-content">
                <font-awesome-icon class="text text-normal text--white mr-3  d-lfex"
                :icon="['fa','arrow-left']" @click="$router.push('/')" />
                <h1 class="text text--white">Inicia </h1>
           </div>
           <inputBase type="text" label="Usuario"  name="username"  placeholder="usuario" @onchanged="inputchanged"></inputBase>
           <inputBase type="password" label="Contraseña"   name="password" placeholder="contraseña" @onchanged="inputchanged"></inputBase>
            <button class="m-btn m-btn__blue d-flex mt-5" @click="guardar">Iniciar</button>
              <Spinner v-if="loader" color="#0fdb8d" :size="40"></spinner>
            <p>{{ message }}</p>
          
       </div>
   </div>

</template>
<script>
 //store
  import {mapActions} from 'vuex'
  import axios from 'axios'
 //Components
 import inputBase from '../components/input'
 import Spinner from 'vue-spinner-component/src/Spinner.vue'
export default {
    components:{
        inputBase,
        Spinner
    },
    data(){
        return{
            user:{
                username:null,
                password:null,
                role:this.$store.state.userRole,
            },
           
            message:'',
            loader:false
        }
    },
    methods:{
          ...mapActions(['guardarUsuario']),
          inputchanged(dato,name) {
               this.user[name]  = dato             
          },
        
          guardar() {
          // console.log(this.usuario);   
            this.loader = true
            axios.post("http://localhost:3000/login", this.user)
            .then(res => {
             console.log(res.data.usuario,res.data.token);
             const token = res.data.token;
             this.guardarUsuario(token);
             this.loader = false
             })
                .catch(err => {
                console.log(err);
                  this.loader = false
                 this.message = err.response.data.err.message;
      });
   }
    }
}
</script>