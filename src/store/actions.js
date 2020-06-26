import axios from 'axios'

 const actions = {

       programData: ({commit,state}) => {
        
        axios.get('https://gouapp.herokuapp.com/programas')
        .then(resp =>{
            //console.log(resp.data.borditem.comments)  
            const posts = resp.data.programa;   
    
            commit('SET_PROGRAMA',posts)
                
        })
        .catch(err=>console.log(err));
       },
      /* registerData: ({commit},payload) => {

        const { id_programa, id_etiqueta } = payload

        if(id_programa === null || id_etiqueta === null ){
            axios.get('https://gouapp.herokuapp.com/registros/lasted')
            .then(resp =>{
                console.log('llamada a todos los progrmas')
                
                let posts = resp.data;
            
                commit('SET_REGITERS',posts)
            })
            .catch(err=>console.log(err));
        }else{
            axios.get('https://gouapp.herokuapp.com/registros/'+id_programa)
            .then(resp =>{
             console.log('llamada desde los programas ' +id_programa )
                
                let posts = resp.data;
            
                commit('SET_REGITERS',posts)
             
            })
            .catch(err=>console.log(err));
        }
        
      
       },*/
      
       registerData: ({commit},payload) => {

        const { id_programa, id_etiqueta } = payload

       
        axios.get(`https://gouapp.herokuapp.com/registros/${ id_programa}/${id_etiqueta}`)
        .then(resp =>{
            //console.log(resp.data.borditem.comments)
            
            let posts = resp.data;
            
            commit('SET_REGITERS',posts)
        })
        .catch(err=>console.log(err));  
      
       },
       registerByCategory: ({commit},payload) => {
        
        const { id_categoria,id_programa,id_etiqueta } = payload
     
        axios.get(`https://gouapp.herokuapp.com/registro/categoria/${id_categoria}/programa/${id_programa}/etiqueta/${id_etiqueta}`)
        .then(resp =>{
            //console.log(resp.data.borditem.comments)
            
            let posts = resp.data;
            
            commit('SET_REGITERCATEGORY',posts)
        })
        .catch(err=>console.log(err));  
      
       },
      

       temasData: ({commit}) => {
        
        axios.get('https://gouapp.herokuapp.com/categorias')
        .then(resp =>{
            //console.log(resp.data.borditem.comments)
            
            let categorias = resp.data.categoria;
            commit('SET_CATEGORIA',categorias)
        })
        .catch(err=>console.log(err));
       },

       //POST METHODS
       etiquetasData:({ commit },params)=>{
           const { programa,tema,searchTags } = params
          

          if(tema !=='all') {
       
            if (programa == 'all' ) {
            
                axios.get(
                    `https://gouapp.herokuapp.com/etiqueta/categoria/${tema}?searchTags=${searchTags}`
                    )
                .then(resp => {
                    
                    let etiqueta = resp.data.etiqueta;
                    
                    commit('SET_ETIQUETAS',etiqueta)
                    
                })
                .catch(err => {
                   
                    console.log(err)
                }); 
    
            
        }else{
            axios.get(
                `https://gouapp.herokuapp.com/etiqueta/${programa}/${tema}?searchTags=${searchTags}`
                )
            .then(resp => {
               
                let etiqueta = resp.data.etiqueta;
                commit('SET_ETIQUETAS',etiqueta)
                
            })
            .catch(err => {
               
                console.log(err)
            }); 
        }

    }else{
        if (programa == 'all' ) {
            
            axios.get(
                `https://gouapp.herokuapp.com/etiquetas/favorites?searchTags=${searchTags}`
                )
            .then(resp => {
                
                let etiqueta = resp.data.etiqueta;
                
                commit('SET_ETIQUETAS',etiqueta)
                
            })
            .catch(err => {
               
                console.log(err)
            });

        
    }else{
        axios.get(
            `https://gouapp.herokuapp.com/etiqueta/${programa}/${tema}?searchTags=${searchTags}`
            )
        .then(resp => {
           
            let etiqueta = resp.data.etiqueta;
            commit('SET_ETIQUETAS',etiqueta)
            
        })
        .catch(err => {
           
            console.log(err)
        }); 
    }
    }
      

},

//academico
trabajosData({commit},id_area){

  
    axios.get(`https://gouapp.herokuapp.com/trabajos/area/${id_area}`)
        .then(resp => {
           
            const works = resp.data;
            commit('SET_TRABAJOS',works)
            
        })
        .catch(err => {
           
            console.log(err)
        });
},

areasData({commit}){
    axios.get('https://gouapp.herokuapp.com/areas')
        .then(resp => {
           
            const areas = resp.data;
            commit('SET_AREAS',areas)
            
        })
        .catch(err => {
           
            console.log(err)
        });
},

guardarUsuario({commit},payload){
    localStorage.setItem('token',payload);
    commit('GET_USUARIO',payload);
  },
  cerrarSesion({commit}){
    commit('GET_USUARIO','');
    localStorage.removeItem('token');
    router.push({name:'login'});
  },
  leerToken({commit}){
    const token = localStorage.getItem('token');
    if(token){
      commit('GET_USUARIO',token);
    }else{
      commit('GET_USUARIO','');
    }
  }
 
   
}

export default actions