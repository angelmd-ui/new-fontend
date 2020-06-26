import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Home from '../views/home'
import Inicio from '../views/inicio'
import Post from '../views/posts.vue'

//login

import Login from '../views/login'

//categorias
import Registro from '../views/Registro'
//import Noticias from '../views/categorias/Noticias'
import Eventos from '../views/categorias/Eventos'
import Acreditacion from '../views/categorias/Acreditacion'
import Academico from '../views/categorias/Academico'
import All from '../views/categorias/inicio'
//import Search from '../views/search'

//Academico
import AcademiServicioDetalle from '../views/categorias/academico/servicio_detalle'
import AcademicoServicios from '../views/categorias/academico/services'
import PublicacionesPreguntas from '../views/categorias/academico/posts'
import AddPreguntas from '../views/categorias/academico/question'
import AddServicio from '../views/categorias/academico/addServicio'
import PerfilDetalle from '../views/categorias/academico/perfilDetalle' 




Vue.use(Router)

const router =  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes:[
        {
            path:'/',
            name:'inicio',
            component: Inicio
    
            },
             
        {
        path:'/home',
        component: Home,
        props:true,
        meta: { requireAuth: true },
        children:[
            {
                path:'/',
                name:'all',
                component:All,
                props:true
        
                },

              
          
            /* {
               
               path:'/noticias',
                name:'noticias',
                component:Noticias,
                props:true
            
            },*/
           
            {
                path:'/eventos',
                name:'eventos',
                component:Eventos,
                props:true
                
            },
            {
                path:'/acreditaciòn',
                name:'acreditaciòn',
                component:Acreditacion,
                props:true
                    
            }
        ]},
                {
                path:'/academico',
                component:Academico,
                props:true,
                meta: { requireAuth: true },
                children:[
                    {
                        path:'/',
                        name:'temas',
                        component:AcademicoServicios
                        
                    },
                    {
                        path:'/servicio/detalle',
                        name:'ServicioDetalle',
                        component:AcademiServicioDetalle,
                        props:true
                    },
                    {
                        path:'/aportes',
                        name:'aportes',
                        component:PublicacionesPreguntas,
                        props:true
                    },
                    {
                        path:'/aportes/add',
                        name:'addAportes',
                        component:AddPreguntas,
                        props:true
                    },
                    {
                        path:'/temas/add',
                        name:'addTemas',
                        component:AddServicio,
                     
                    },
                    {
                        path:'/academico/usuario/perfil/:id_user',
                        name:'perfilDetalle',
                        component:PerfilDetalle,
                        props:true
                     
                    }
                ]

            },

        {
        path: '/post/',
        name:'post',
        component:Post
        
        },
        {
            path:'/registro@contenido',
            name:'Registro',
            component:Registro
    
        },
        {
            path:'/login',
            name:'login',
            component:Login
    
        },

     
       
      
       


         
    ]
})


router.beforeEach((to, from, next) => {
    const rutaProtegida = to.matched.some(record => record.meta.requireAuth)
    if (rutaProtegida && store.state.token === '') {
      next({name: 'inicio'})
    }else{
      next();
    }
  });

  export default router