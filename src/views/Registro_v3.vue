<template>
    <div id="addNews">
        <div class="header-title">
            <div class="text-box">
                <h1 class="text text-title text--white  mr-6">Crear Contenido</h1>
                <font-awesome-icon class="text text-title text--white" :icon="['fa','newspaper']" />
            </div>
        </div>

        <div class="add-box d-flex  flex-column justify-content " v-for="(item,i) in items" :key="i">

            <!--INPUT DE OPCIONES PARA CREAR CONTENIDO-->
            <div class="add-box--option b-rounder--2 " :id="item.name" :class="'bg-gradient--'+item.bg">

                <!--PROGRAMA OPTION-->
                <div class="add-box--input  d-flex " v-if="item.name == 'Programa'" @click="activeOption(item.name)">
                    <input type="text" v-model="datosPrograma.searchProgram" :id=" item.name" name="searchProgram"
                        @keydown="activeOption(item.name)">
                    <label v-show="placeholder" class="text  d-flex-2 text--white">Escribe o selecciona un {{ item.name }}</label>
                    <label v-show="label" class="text  d-flex-2 text--white">{{ datosPrograma.program }}</label>
                    <font-awesome-icon class="text text-small text--white" :icon="['fa','book']" />
                </div>
                <!--CLOSE PROGRAMA OPTION-->

                <div class="add-box--input  d-flex " v-if="item.name == 'Tema'"  @click="activeOption(item.name)">

                    <label class="text  d-flex-2 text--white">{{ datosTema.tema }}</label>
                    <font-awesome-icon class="text text-small text--white" :icon="['fa','book']" />
                </div>


                <div class="add-box--input  d-flex " v-if="item.name == 'Etiqueta'" @click="activeOption(item.name)">
         
                    <input type="text" v-model="datosEtiqueta.searchTags" name="searchTags" :id=" item.name" @keydown="activeOption(item.name)">
                    
                        <div class="tag bg-white b-rounder--2 mr-5  scale-to"  v-if="datosEtiqueta.activeTag" >
                        <font-awesome-icon class="text text-small text--black" :icon="['fa','tag']" />
                         <span class="text text-small black-light"> {{ datosEtiqueta.etiquetaSelect }} </span>
                       </div>
                          
                
                    <label v-else class="text  d-flex-2 text--white">{{ item.name }}</label>
                    <font-awesome-icon class="text text-small text--white" :icon="['fa','arrow-down']" />
                </div>

            </div>
            <!--FINALIZA OPCIONES-->
            <!--MODAL MUESTRA OPCIONES DE LOS CONTENIDOS  -->
            <div class="modal-add d-flex justify-center  " v-if="nameOption == item.name" >


                <div class="modal-add__body  d-flex flex-column b-rounder--2" v-if="nameOption == 'Programa'">
                    <div class="spiner-box d-flex flex-column justify-content  " v-if="spiner == true">
                        <Spinner color="#0fdb8d" :size="40"></spinner>
                        <span class="text text--green text-center">Buscando....</span>
                    </div>
                    <div class="box-program mt-4" v-else>


                        <div class="box-program-item d-flex  justify-content flex-column b-rounder--2 mr-1 mt-1 text-center scale-to"
                            v-for="(program,i) in programas" :key="i">


                            <div v-if="program" @click="selectProgram(program.nombre,program._id)">
                                <font-awesome-icon class="text text-title--name  text--black-light mb-1 "
                                    :icon="['fa',program.icon]" />
                                <span class="text text-small text--black-light"> {{ program.nombre }}</span>
                            </div>
                            <div v-else>
                                <Spinner color="#0fdb8d" :size="40"></spinner>
                                <span class="text text--green text-center">Programas....</span>
                            </div>

                        </div>

                    </div>
                    <span class="text text-small text--white modal-add__closet-icon bg-yellower pl-2 pr-2 b-rounder--1"
                        @click="nameOption = '' ">Cerrar</span>
                </div>

              <!--TEMAS OPTIONS-->
                <div class="modal-add__body  d-flex flex-column b-rounder--2" v-if="nameOption == 'Tema'">
                  
                    <div class="box-program">
                        <div v-for="(tema,index) in categorias" :key="index"
                            class="box-program-item d-flex  justify-content flex-column b-rounder--2 mr-1 mt-1 text-center scale-to">
                            <div @click="selectTema(tema.nombre,tema._id)">
                                <font-awesome-icon class="text text-title--name  text--black-light mb-1 "
                                    :icon="['fa','book']" />
                                <span class="text text-small text--black-light"> {{ tema.nombre }}</span>
                            </div>

                        </div>
                    </div>
                    <span class="text text-small text--white modal-add__closet-icon bg-yellower pl-2 pr-2 b-rounder--1"
                        @click="nameOption = '' ">Cerrar</span>
                </div>

              <!--ETIQUETA OPTIONS-->
                <div class="modal-add__body  d-flex flex-column b-rounder--2" v-if="nameOption == 'Etiqueta'">
                      <div class="spiner-box d-flex flex-column justify-content  " v-if="spiner == true">
                        <Spinner color="#0fdb8d" :size="40"></spinner>
                        <span class="text text--green text-center">Categorias....</span>
                    </div>
                    <div class="box-program" v-else>
                         <div v-if="datosEtiqueta.etiquetas.length == 0">
                                  <span  class="text">No hayu etiquetas</span> 
                            </div>
                        <div  v-else v-for="(etiqueta,index) in datosEtiqueta.etiquetas" :key="index"
                            class="box-program-item d-flex  justify-content flex-column b-rounder--2 mr-1 mt-1 text-center scale-to">
                           
                            <div   @click="selectEtiqueta(etiqueta.titulo)">
                                <font-awesome-icon class="text text-title--name  text--black-light mb-1 "
                                    :icon="['fa','tag']" />
                                
                                <span class="text text-small text--black-light"> {{ etiqueta.titulo }}</span>
                            </div>

                        </div>
                    </div>
                    <span class="text text-small text--white modal-add__closet-icon bg-yellower pl-2 pr-2 b-rounder--1"
                        @click="nameOption = '' ">Cerrar</span>
                </div>


            </div>

        </div>


     <div class="content-box ">
         <div class="content-box--wrapper b-rounder--2">

         
           <inputBase label="Titulo" placeholder="titulo del cotenido" @onchanged="inputchanged" ></inputBase>
                <div class="mt-8">
                <h3 class="text--white">Descripciòn </h3>
                <div class="box-textarea  shadow b-rounder--2 mt-1">
                <textarea  v-model="post.description" placeholder="descripciòn noticia" rows="6"  cols="40"></textarea>
                </div>
                </div>
                   <div class="file-box mt-6">
                <div v-if="!image" class=" container-box flex-column justify-content">

                    <iconmave height="80px" width="80px" name="img-load" />
                    <label for="file" class="input-file"> Subir contenido </label>
                   
                    <input type="file" name="photo" multiple ref="file" id="file" style="display:none" @change="onFile">
                </div>
                <div class="flex-column justify-content" v-else>

               
                <div class="img-prew mb-2 b-border--2"  >

                    <div v-if="image">
                        <img :src="image" />
                    </div>


                 
                </div>
                <input type="file" name="photo" multiple ref="file" id="file" style="display:none" @change="onFile">
                 <span class="cancel-file mt-3 bg-red text text--white" @click="image = ''"> x</span>
                  </div>

            </div>
        </div>

     </div>












        <loader v-if="loading == true" />

    </div>
</template>
<script>
    import {
        mapState,
        mapGetters,
        mapMutations
    } from 'vuex'
    import axios from 'axios'
    import iconmave from '../components/iconsMave'
    import Spinner from 'vue-spinner-component/src/Spinner.vue'

    import inputBase from '../components/input'
    import loader from '../components/loading'
    export default {
        components: {
            iconmave,
            Spinner,
            inputBase,
            loader
        },
        data() {
            return {
                label: false,
                placeholder: true,
                showOpcion: false,
                nameOption: '',
                optionSelectd: '',

                loading: false,
                spiner: true,
                topic: '',

                post: {
                    typboard: '',
                    topic: '',
                    title: 'pepe',
                    descrption: ''
                },
                file: null,
                fileType:null,
                srcImage: null,
                image: '',
                imageName: '',
                toogleChecked: false,
                items: [{
                        name: 'Programa',
                        placeholder: 'Elige un programa',
                        bg: 'green'
                    },
                    {
                        name: 'Tema',
                        placeholder: 'Elige un tema',
                        bg: 'blue'
                    },
                    {
                        name: 'Etiqueta',
                        placeholder: 'selecciona una etiqueta o crea una',
                        bg: 'purple'
                    }
                ],
                programas: [],

                datosPrograma: {
                    id_programa: null,
                    searchProgram: '',
                    program: null,
                },
                datosTema:{
                 id_tema:'all',   
                 tema: 'Selecciona Categoria',
                },
                
                datosEtiqueta: {
                     searchTags:'',
                    etiquetas:[],
                    etiquetaSelect:null,
                    activeTag:false,
                    
                }



            }
        },
        methods: {

            selectProgram(nombre,id) {
                this.datosPrograma.id_programa = id
                this.datosPrograma.program = nombre
                this.placeholder = false
                this.label = true
                this.datosPrograma.searchProgram = ""



                //se llama a la etiqueta por el id del programa
                console.log(id)

                this.datosEtiqueta.activeTag=false
                this.getEtiqueta(id,this.datosTema.id_tema)
             
            },
            selectTema(nombre,id) {
                this.datosTema.tema = nombre
                this.datosTema.id_tema = id
                console.log(this.datosTema.id_tema)
                 this.getEtiqueta(this.datosPrograma.id_programa,
                        this.datosTema.id_tema)
                
            },
              selectEtiqueta(nombre) {
                this.datosEtiqueta.etiquetaSelect = nombre
                this.datosEtiqueta.activeTag = true
                this.datosEtiqueta.searchTags= ''
                
            },

            activeOption(nombre) {
                     let vm = this;
                this.placeholder = false
                this.showOpcion = true
                this.nameOption = nombre
  

              
                //console.log(item)

                //item.classList.add('animation-item')
                if (nombre == 'Programa') {
                    //this.$store.dispatch('temasData')
                   
                     return this.getPrograma()
                

                 
                };

                 if (nombre == 'Etiqueta') {
                    //this.$store.dispatch('temasData')
                    console.log(vm.datosTema.id_tema)
                     this.getEtiqueta(
                        vm.datosPrograma.id_programa,
                        vm.datosTema.id_tema
                        )
                };
                  

               


            },
            inputchanged(dato) {
                /* let  vm = dato[0]
             let d = JSON.stringify(vm)
        
        let dat = JSON.parse(d)
         
         console.log(vm)*/
                this.post.title = dato
        
            },
            changedColor(indx) {
                let checked = this.$refs.topic[indx].checked;

                if (checked == !true) {

                }

            },
            onFile(event) {
                this.file = event.target.files[0]
                var files = this.file;
                files = event.target.files || event.dataTransfer.files;


                const filename = this.$refs.file.files[0].name;
                this.imageName = filename;

                this.fileType = this.imageName.split('.').pop();

                

                //this.fileList.push(event.target.files)

                // console.log( this.fileList)
                if (!files.length)
                    return;
                this.createImage(files[0]);

            },
            createImage(file) {
                const image = new Image();
                const reader = new FileReader();
                let vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            removeImage: function (e) {
                this.image = '';
            },
            poster() {
                this.loading = true;
                let vm = this.post;
                const formData = new FormData();
                formData.append('title', vm.title)
                formData.append('topic', vm.topic)
                formData.append('description', vm.descrption)
                formData.append('photo', this.file)

                const config = {
                    onUploadProgress: (progressEvent) => {

                        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        console.log(percentCompleted)
                    }
                }

                axios.post('https://gouapp.herokuapp.com/news/add', formData, config)
                    .then(res => {
                        this.loading = false;
                        console.log(res);
                    })
                    .catch(err => console.log(err))


            },
            getPrograma() {
                let vm = this;
                axios.get(`http://localhost:3000/programas?searchProgram=${vm.datosPrograma.searchProgram}`)
                    .then(resp => {
                  

                        let posts = resp.data.programa;
                        vm.programas = posts
                        vm.spiner = false;

                    })
                    .catch(err => {
                      vm.spiner = true;  
                      console.log(err)
                    });
            },
            getEtiqueta(programa,tema){

                
                  if(programa == null){
                   
                  }else{
                     let vm = this;
                   vm.spiner = true;
                   axios.get(`http://localhost:3000/etiqueta/${programa}/${tema}?searchTags=${vm.datosEtiqueta.searchTags}`)
                    .then(resp => {
                    
                
                        let datos = resp.data.etiqueta;
                      
                             vm.datosEtiqueta.etiquetas = datos
                              
        
                           vm.spiner = false;
                     

                    })
                    .catch(err =>{
                     vm.spiner = true;  
                     console.log(err)
                    } );
                  }
                  
            }



        },
        created() {
            this.$store.dispatch('temasData')


        },

        computed: {
            //...mapState(['programas']),
            ...mapState(['categorias'])
        },
        mounted() {

        }
    }
</script>