<template>
    <div id="addNews">
        <div class="header-title">
            <div class="text-box">
                <h1 class="text text-title text--white  mr-6">Crear Contenido</h1>
                <font-awesome-icon class="text text-title text--white" :icon="['fa','newspaper']" />
            </div>
        </div>
        <div class="add-box container-box flex-column">

            <div class="input-box">
                <div class="input-item">
                    <h3 class="text--blue">Topico </h3>
                    <div class="input--topic">
                        <div class="input--topic__item" v-for="(category,index) in categorys" :key="index"
                            :class="'input--topic__item input--topic__item-active__' + category.name">
                            <input type="radio" :checked="toogleChecked"  ref="topic" :id="category.name" :value="category.name"
                                v-model="post.topic" @click=" changedColor(index)">

                            <label :for="category.name">
                                <font-awesome-icon class=" mr-2" :icon="['fa',category.icon]" />
                                {{  category.name }}
                            </label>
                      <span class="pop-up">  <font-awesome-icon class=" mr-2" :icon="['fa',category.icon]" /></span>
                        </div>

               

                    </div>

                </div>

               

                <inputBase label="title" placeholder="titulo de la noticia" @onchanged="inputchanged" ></inputBase>
                <div class="mt-8">
                <h3 class="text--blue">Descripciòn </h3>
                <div class="box-textarea  shadow b-rounder--2">
                <textarea  v-model="post.description" placeholder="descripciòn noticia" rows="6"  cols="40"></textarea>
                </div>
                </div>


            </div>

            <div class="file-box mt-6">
                <div v-if="!image" class=" container-box flex-column justify-content">

                    <iconmave height="80px" width="80px" name="img-load" />
                    <label for="file" class="input-file"> Subir contenido </label>
                    <input type="file" name="photo" multiple ref="file" id="file" style="display:none" @change="onFile">
                </div>
                <div class="img-prew" v-else>

                    <div v-if="image">
                        <img :src="image" />
                    </div>



                </div>

            </div>

            <div class="d-flex justify-content mt-4">

                <button class="m-btn m-btn-gradient__blue" @click="poster">Send</button>

            </div>
        </div>


   <loader  v-if="loading == true"/>

    </div>
</template>
<script>
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
                loading: false,
                topic: '',
                post: {
                    typboard: '',
                    topic: '',
                    title: 'pepe',
                    descrption: ''
                },
                file: null,
                srcImage: null,
                image: '',
                imageName: '',
                toogleChecked: false,
                categorys: [{
                        name: 'educacion',
                        icon: 'book'
                    },
                    {
                        name: 'deporte',
                        icon: 'football-ball'
                    },
                    {
                        name: 'tecnologia',
                        icon: 'desktop'
                    },
                    {
                        name: 'cultura',
                        icon: 'globe-americas'
                    },
                    {
                        name: 'admin',
                        icon: 'book'
                    }
                ]

                //fileList:[]

            }
        },
        methods: {
            inputchanged(dato) {
                /* let  vm = dato[0]
             let d = JSON.stringify(vm)
        
        let dat = JSON.parse(d)
         
         console.log(vm)*/
                this.post.title = dato

            },
            changedColor(indx){
            let checked = this.$refs.topic[indx].checked;

            if (checked == !true){

            }
               
            },
            onFile(event) {
                this.file = event.target.files[0]
                 var files = this.file;
                files = event.target.files || event.dataTransfer.files;


                const filename = this.$refs.file.files[0].name;
                this.imageName = filename;

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
      
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      console.log(percentCompleted)
    }
                }

                axios.post('https://gouapp.herokuapp.com/news/add', formData,config)
                    .then(res => {
                        this.loading = false;
                        console.log(res);
                    })
                    .catch(err => console.log(err))


            },



        },
        mounted() {

        }
    }
</script>