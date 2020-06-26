<template>
    <div 
    class="post-question  ">

            <h1>Preguntar por</h1>
            <p>Puedes preguntar por areas o trabajos</p>
                   <div slot="filter">
                <selectFilter text="Areas" 
                @active="activeMenu"  
                @desactive="disabledfilter"
                name="Areas" text_color="green" :select="datosAreas.select" 
                 />
      
        <selectFilter text="Trabajos" @active="activeMenu"  name="Trabajos" text_color="green" :select="datosTrbajos.select" @desactive="disabledfilter" />
            </div>
             
            <textarea rows="9" v-model="post.titulo" ></textarea>
            <button class="m-btn m-btn-gradient__green mt-4" @click="setPost()" >Crear</button>
            <div>
                
            </div>
            <div  >
            
            <h1>!hey te interesa!</h1>
            <div  v-for="(post,index) in post.data"  :key="index">
             <span>{{ post.titulo }}</span>
            </div>
               </div>
             <categorys  v-if="category" :active="active" @categoriaActive="getCategoty" @closet="category = false" />
    </div>
</template>
<script>
import axios from 'axios'
import selectFilter from '../../../components/filter'
import temas from './../../../components/academy/temas'
import categorys from './../../../components/academy/categorys'
import categoryFilter from '../../../mixins/categoryFilter' 

export default {
    mixins:[categoryFilter],
    props:['idArea','idTrabajo'],
    components:{
     selectFilter,
     temas,
     categorys,
     
    },
    data(){
        return{
            loader:false,
            showposts:false,
           post:{
              titulo:'',
              data:[]
          },
          service:false,
       
        }
    },
    methods:{
          setPost(){
              if(this.datosTrbajos.id_trabajo === 'all'){
                  const post={
                  titulo:this.post.titulo,
                  usuario:'5e8e6925839d5e122f814bf2',
                  area:this.datosAreas.id_area,
             
                   }
                }
                  if(this.datosAreas.id_area === 'all'){
                  const post={
                  titulo:this.post.titulo,
                  usuario:'5e8e6925839d5e122f814bf2',
             
                   }
                }
                
                if(this.datosTrbajos.id_trabajo === 'all' && this.datosAreas.id_area === 'all'){
                       const post={
                  titulo:this.post.titulo,
                  usuario:'5e8e6925839d5e122f814bf2',
              }
                }
            
            
              axios.post('https://gouapp.herokuapp.com/service/post',post)
                .then(resp => {
                   
                    const pots= resp.data;
                    console.log(pots)
                    
                })
                .catch(err => {
                   
                    console.log(err)
                });
        },
        
  
      getCategoty(data){
             const { id,name } = data
            
              this.service = true
            this.category=false
           
             
            if(this.active === 'Trabajos'){
                this.datosTrbajos.id_trabajo = id
                this.datosTrbajos.select = name
                //this.active = ''
                this.getPost(this.datosAreas.id_area, this.datosTrbajos.id_trabajo)
               
                 
            }
               if(this.active === 'Areas'){
                   this.datosAreas.id_area = id
                   this.datosAreas.select = name
                   //this.active = ''
                  this.getPost(this.datosAreas.id_area, this.datosTrbajos.id_trabajo)
            }
        },
        getPost(id_area,id_work){
            
             
             const vm = this
             vm.loader = true
             vm.showposts = true
                axios.get(`https://gouapp.herokuapp.com/service/posts/${id_area}/${id_work}`)
                .then(resp => {
                  
                    const post = resp.data;
                    console.log(post)
                    vm.post.data = post
                    vm.loader = false
                    
                    
                    
                })
                .catch(err => {
                    console.log(err)
                }); 
       
        },
   

    }
}
</script>