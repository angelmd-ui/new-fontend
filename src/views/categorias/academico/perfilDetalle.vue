<template>
<div class="profile appear">  
        <div class="profile-detail__header d-flex appear"  :style="{
               'background-image': 'url('+ profile.photo +')' ,
               'background-repeat':'no-repeat',
                'background-size':'cover',}">
                <font-awesome-icon class="text text-normal text--white  d-lfex back-row"
                :icon="['fa','arrow-left']" @click="$router.push('/academico')" />
           <div class="profile-detail__name">
               <h1 class="text text--white">{{ profile.username }}</h1>
               <p class="text text--white">Developer Expert</p>
               
           </div>
           <div>
               <div class="profile-detail--overlays">
                    
               </div>
           </div>
        </div>
        <div class="profile-detail__description bg-white">
            <div class="profile-detail__experiencie">
              <h3>Experiencias</h3>
              <div class="experiencie-card d-flex b-rounder--2  mt-4" :style="{
               'background-image': 'url('+ profile.photo +')' ,
               'background-repeat':'no-repeat',
                'background-size':'cover',}">
                <div class="bg-overlays bg-area--pedagogia"></div>
                <div class="experiencie-card__description d-flex flex-column">
                 <span class="text text--white text-normal experiencie-card__title">Awesome title about the culture</span>
                 <div>
                    <span class="text text-small  b-rounder--2 bg-white ml-2">Etiqueta</span>
                    </div>
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
         profile:[],
         services:[]
        }
    },
    methods:{
        getService(){
         let vm = this
            axios.get(`https://gouapp.herokuapp.com/servicio/usuario/active/${vm.$route.params.id_user}`)
                .then(resp => {
                   
                    const servicio = resp.data;
                    this.services = servicio;
                                   
                })
                .catch(err => {
                   
                    console.log(err)
                });
        },
          getUserProfile(){
            let vm = this
        
            axios.get(`https://gouapp.herokuapp.com/usuario/${vm.$route.params.id_user}`)
                .then(resp => {
                    const servicio = resp.data;
                    this.profile = servicio;
                     this.getService()
                })
                .catch(err => {
                   
                    console.log(err)
                });
        },
        
    },
    mounted(){
        this.getUserProfile()

    }
}
</script>