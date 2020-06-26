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
                    <label v-show="placeholder" class="text  d-flex-2 text--white">Escribe o selecciona un
                        {{ item.name }}</label>
                    <label v-show="label" class="text  d-flex-2 text--white">{{ datosPrograma.program }}</label>
                    <font-awesome-icon class="text text-small text--white" :icon="['fa','book']" />
                </div>
                <!--CLOSE PROGRAMA OPTION-->

                <div class="add-box--input  d-flex " v-if="item.name == 'Tema'" @click="activeOption(item.name)">

                    <label class="text  d-flex-2 text--white">{{ datosTema.tema }}</label>
                    <font-awesome-icon class="text text-small text--white" :icon="['fa','book']" />
                </div>


                <div class="add-box--input  d-flex " v-if="item.name == 'Etiqueta'" @click="activeOption(item.name)">

                    <input type="text" v-show="inputSearch" v-model="datosEtiqueta.searchTags" name="searchTags" :id=" item.name"
                        @keydown="activeOption(item.name)">

                    <div class="tag bg-white b-rounder--2 mr-5  scale-to" v-if="datosEtiqueta.activeTag">
                        <font-awesome-icon class="text text-small text--black" :icon="['fa',iconSelect]" />
                        <span class="text text-small black-light"> {{ datosEtiqueta.etiquetaSelect }} </span>
                        <font-awesome-icon class="text  text--black" size="lg"  :icon="['fa','times']" @click="cancelTag" />
                    </div>


                    <label v-else class="text  d-flex-2 text--white">Buscar etiqueta</label>
                    <font-awesome-icon class="text text-small text--white" :icon="['fa','arrow-down']" />
                </div>

            </div>
            <!--FINALIZA OPCIONES-->
            <!--MODAL MUESTRA OPCIONES DE LOS CONTENIDOS  -->
            <div class="modal-add d-flex justify-center  " v-if="nameOption == item.name">


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
                                <span class="text text--green text-center">Etiquetas....</span>

                      
                    </div>
                    <div class="box-program" v-else>
                        <div class="spiner-box text-center d-flex flex-column justify-content  " v-if="datosEtiqueta.etiquetas.length == 0">
                              <div class="mt-8" >
                           <font-awesome-icon class="text text-title--name  text--black-light mb-1 "
                                    :icon="['fa','tag']" />
                           <h2 class="text text-title--name text--black-light" >! no hay etiquetas</h2>
                           <span 
                            @click="addTag = true "
                           class="text text-title--name mt-2 bg-gradient--blue text--white pl-1 pr-1 b-rounder--1">Craer etiqueta</span>
                       </div>
                        </div>
                        <div v-else v-for="(etiqueta,index) in datosEtiqueta.etiquetas" :key="index"
                            class="box-program-item d-flex  justify-content flex-column b-rounder--2 mr-1 mt-1 text-center scale-to">

                            <div @click="selectEtiqueta(etiqueta.titulo,etiqueta._id,etiqueta.icono)">
                             
                                     <font-awesome-icon  class="text text-title--name  text--black-light mb-1 "
                                    :icon="['fa',etiqueta.icono]" />

                                <span class="text text-small text--black-light"> {{ etiqueta.titulo }}</span>
                            </div>

                        </div>
                    </div>
                    <span class="text text-small text--yellower position-absolute position-move__bottom-2 position-move__right-1  pl-2 pr-2 b-rounder--1"
                        @click="nameOption = '' ">Cerrar</span>
                         <span  
                         v-if="datosEtiqueta.etiquetas.length > 0"
                         class="text text-small text--green position-absolute position-move__bottom-2 position-move__right-15  pl-2 pr-2 b-rounder--1"
                        @click="addTag = true ">Crear-etiquetas</span>
                </div>



            </div>

        </div>

        <!--SUBIDA MULTIMEDIA-->
        <div class="content-box ">
            <div class="content-box--wrapper b-rounder--2">


                <inputBase label="Titulo" name="titulo" placeholder="titulo del cotenido" @onchanged="inputchanged"></inputBase>
               
                <!--titulo y descrepcciòn del contenido-->
                <div class="mt-8">
                    <h3 class="text--white">Descripciòn </h3>
                    <div class="box-textarea  shadow b-rounder--2 mt-1">
                        <textarea v-model="registro.descripcion" placeholder="descripciòn noticia" rows="6"
                            cols="40"></textarea>
                    </div>
                </div>
                <div class="file-box mt-6">
                    <!--Subida de archivos--->
                    <div v-if="!image" class=" container-box flex-column justify-content">

                        <iconmave height="80px" width="80px" name="img-load" />
                        <label for="file" class="input-file"> Subir contenido </label>

                        <input type="file" name="photo" multiple ref="file" id="file" style="display:none"
                            @change="onFile">
                    </div>
                    <!--Previsualizacion de archivos-->
                    <div class="d-flex flex-column justify-content" style="width:100%" v-else>


                        <div class="img-prew mb-2 b-border--2" v-if="fileExtencion == 'jpg' || fileExtencion == 'png'">

                            <div v-if="image">
                                <img :src="image" />
                            </div>

                            <span class="cancel-file mt-3 bg-red text text--white" @click="image = ''"> x</span>

                        </div>

                        <fileTypePrev class="scale-to" :fileType='fileExtencion' :namefile="fileName"
                            v-if="fileExtencion == 'pdf'">
                            <span slot="cancelFile" class="filetype-prev__cancel text text-title--name text--white"
                                @click="image = ''"> x</span>
                        </fileTypePrev>


                        <fileTypePrev class="scale-to" :fileType='fileExtencion' :namefile="fileName"
                            v-if="fileExtencion == 'doc' || fileExtencion == 'docx'">
                            <span slot="cancelFile" class="filetype-prev__cancel text text-title--name text--white"
                                @click="image = ''"> x</span>
                        </fileTypePrev>
                        <fileTypePrev class="scale-to" :fileType='fileExtencion' :namefile="fileName"
                            v-if="fileExtencion == 'mp4'" >
                            <span slot="cancelFile" class="filetype-prev__cancel text text-title--name text--white"
                                @click="image = ''"> x</span>
                        </fileTypePrev>


                    

                    </div>

                </div>
            </div>

        </div>
    
    <div class="d-flex justify-content mt-2">
      <button class="m-btn m-btn-gradient__green" @click="registerSend">Send</button>
    </div>
           




        <loader v-if="loading == true" text="publicabdo.." />
       
        <messageModal v-if="addTag" @closet="addTag = false">
            <div slot="message" class="d-flex  align-items flex-column scale-to">
                <span class="text text-normal text--white">Icono Etiqueta</span>
                 <div class="box-program mt-2 " style="width:60%">
               <div v-for="(icon,index) in icons" :key="index" :class="[datosEtiqueta.icon === icon.name ? 'bg-white  circle':'bg-lighten circle']"
                class="box-program-item d-flex  justify-content flex-column b-rounder--2 mr-1 mt-1 text-center scale-to" @click="choiceIcon(icon.name)" >
                           
                    <font-awesome-icon :class="'text--'+icon.color" class="text text-title--name   mb-1 "
                    :icon="['fa',icon.name]" />
               </div>
             </div>
            <inputBase width="90%"  name="etiqueta" placeholder="Titulo etiqueta" @onchanged="inputchanged" />

            <button class="m-btn m-btn-gradient__green mt-4" @click="crearEtiqueta">Crear</button>
            </div>
             
        </messageModal>

       <messageModal v-if="message" @closet="message = false">
           <div slot="message" class="d-flex  justify-content flex-column scale-to" @click="$router.push({path:'/home'})">
            <iconEnjoy />
            <div>
             <h1 class="text text--white text-title--name mt-4">Ver ultimas publicaciones</h1>
            </div>
            
           </div>
       </messageModal>

    </div>
</template>
<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import axios from 'axios'
    //icons
    import iconmave from '../components/iconsMave'
    import iconEnjoy from '../components/icons/enjoyed'
    import Spinner from 'vue-spinner-component/src/Spinner.vue'
    import {icons} from'../mixins/icons'
    
    //elements
    import inputBase from '../components/input'
    import loader from '../components/loading'
    import fileTypePrev from '../components/fileType'
    import messageModal from '../components/messages'
    export default {
        components: {
            iconmave,
            Spinner,
            inputBase,
            loader,
            fileTypePrev,
            messageModal,
            iconEnjoy
        },
        data() {
            return {
                inputSearch:true,
                icons:[],
                label: false,
                placeholder: true,
                showOpcion: false,
                nameOption: '',
                optionSelectd: '',

                loading: false,
                spiner: true,
                message:false,
                addTag:false,
                topic: '',

                registro: {
                    titulo: 'pepe',
                    descripcion: '',
                    etiqueta:'tags',
                   
                  
                },
                file: null,
                fileName: 'pdf',
                srcImage: null,
                image: '',
                fileExtencion: '',
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
                datosTema: {
                    id_tema: 'all',
                    tema: 'Selecciona Categoria',
                },

                datosEtiqueta: {
                    id_etiqueta:null,
                    searchTags: '',
                    etiquetas:[],
                    etiquetaSelect: null,
                    activeTag: false,
                    icon:'tag',
                    activeIcon:'',
                    iconSelect:''

                },
                messageData:{
                    titulo:'',
                    cuerpo:'',
                    usuario:''
                }



            }
        },
        methods: {

            selectProgram(nombre, id) {
                this.datosPrograma.id_programa = id
                this.datosPrograma.program = nombre
                this.placeholder = false
                this.label = true
                this.datosPrograma.searchProgram = ""



                //se llama a la etiqueta por el id del programa
                console.log(id)

                this.datosEtiqueta.activeTag = false
                this.getEtiqueta(id, this.datosTema.id_tema)

            },
            selectTema(nombre, id) {
                this.datosTema.tema = nombre
                this.datosTema.id_tema = id
                console.log(this.datosTema.id_tema)

                this.getEtiqueta(this.datosPrograma.id_programa,
                    this.datosTema.id_tema)

                 this.datosEtiqueta.activeTag = false

            },
            selectEtiqueta(nombre,id,icono) {
                this.datosEtiqueta.etiquetaSelect = nombre
                this.datosEtiqueta.activeTag = true
                this.datosEtiqueta.searchTags = ''
                this.datosEtiqueta.id_etiqueta= id
                this.inputSearch = false,
                this.iconSelect= icono

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
                    //console.log(vm.datosTema.id_tema)
                    setTimeout(()=>{
                      this.getEtiqueta(
                        vm.datosPrograma.id_programa,
                        vm.datosTema.id_tema
                    )
                    },600)
                   
                };





            },
            inputchanged(dato,name) {
               this.registro[name]  = dato             
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
                this.fileName = filename;
                this.fileExtencion = filename.split('.').pop();








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
            registerSend() {
                this.loading = true;
                let vm = this;
                const formData = new FormData();
                formData.append('id_categoria', vm.datosTema.id_tema)
                formData.append('id_programa', vm.datosPrograma.id_programa)
                formData.append('id_etiqueta', vm.datosEtiqueta.id_etiqueta)
                formData.append('titulo', vm.registro.titulo)
                formData.append('descripcion', vm.registro.descripcion)
                formData.append('photo', this.file)
                
                //console.log(formData)


                axios.post('https://gouapp.herokuapp.com/registro', formData)
                    .then(res => {
                        this.loading = false;
                        this.message = true;
                         const message ={
                     titulo: vm.registro.titulo,
                     cuerpo: 'se ha publicado una nueva noticia',
                     usuario:'admin',
                     image:res.data.photo
                }
                 this.notification(message)
                        console.log(res);
                    })
                    .catch(err => {
                        this.loading = true;
                        console.log(err)
                    })


            },
            getPrograma() {
                let vm = this;
                axios.get(`https://gouapp.herokuapp.com/programas?searchProgram=${vm.datosPrograma.searchProgram}`)
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
            getEtiqueta(programa, tema) {


                if (programa == null) {

                } else {
                    let vm = this;
                    vm.spiner = true;
                    axios.get(
                            `https://gouapp.herokuapp.com/etiqueta/${programa}/${tema}?searchTags=${vm.datosEtiqueta.searchTags}`
                            )
                        .then(resp => {
                            let datos = resp.data.etiqueta;
                            vm.datosEtiqueta.etiquetas = datos
                            vm.spiner = false;
                        })
                        .catch(err => {
                            vm.spiner = true;
                            console.log(err)
                        });
                }

            },
            crearEtiqueta(){
                let vm = this;
                 vm.spiner = true;
     

                
                axios.post(`https://gouapp.herokuapp.com/etiqueta`,{
                    id_categoria:vm.datosTema.id_tema,
                    id_programa:vm.datosPrograma.id_programa,
                    titulo: vm.registro.etiqueta,
                    icono:vm.datosEtiqueta.icon

                })
                    .then(resp => {
                            console.log(resp.data)
                            vm.spiner = false;
                            vm.addTag = false;
                            vm.getEtiqueta(resp.data.programa,resp.data.categoria)
                            vm.selectEtiqueta(resp.data.titulo,resp.data._id)
                        })
                        .catch(err => {
                            vm.spiner = true;
                            console.log(err)
                        });
            },
            notification(message){
               
                axios.post(`https://gouapp.herokuapp.com/push`,message)
           .then(resp => {
                    console.log(res)
                })
                .catch(err => {
                   
                    console.log(err)
                });
            } ,
            choiceIcon(icon){
                this.datosEtiqueta.icon = icon
                this.datosEtiqueta.activeIcon =icon 
            },
            cancelTag(){
                this.datosEtiqueta.activeTag = false
                this.inputSearch = true
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
         this.icons = icons
        }
    }
</script>