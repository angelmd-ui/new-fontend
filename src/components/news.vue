<template>
  <div class="m-card d-flex flex-column justify-center">
    <div v-if="user" class="m-card--header  ">
      <div class=" user-public bg-white b-rounder--2 shadow">
        <slot name="cardHeader">
        <div class="avatar-box">
          <img class="img__avatar" src="https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519_960_720.jpg" />
          <div>
            <slot name="tagprograma">
              <h3 class="text text-medium text--black">Ember louis </h3>
            </slot>

            <span class="text text-medium text--black-light">Public - may 12</span>
          </div>

        </div>
        </slot>
      </div>
    </div>
    <div class="d-flex justify-content flex-column mt-1">


      <div class="m-card--body  ">
        <div class="m-card--body-text">
          <div class="m-card--title flex-column ">


            <div v-if="title" class="d-flex ">
              <slot name="cardTitle">
              <h2 class="text text-normal text--black d-flex-1">{{ title }}</h2>
              </slot>
              <div class="views-item d-flex">
                <font-awesome-icon class="text text--black-light" :icon="['fa','eye']" />
                <span class="text text--black-light">+{{ views }}</span>
              </div>
            </div>


          </div>

          <div class="m-card--description">
            <div class="description-text text  text-p text--black-light">
              {{ description }}
            </div>
          </div>
        </div>
        <fragment v-if="poster">
        <div v-if="fileExtencion == 'png' || fileExtencion == 'jpg' || fileExtencion == 'gif'" class="m-card--image"
          :style="{
             'background-image': 'url('+poster+')' ,
             'background-repeat':'no-repeat',
             'background-size':' cover',
             'background-position':'center'

         }" @click="$emit('viewDetails',{params:{photo:poster,title:title}})">
        </div>
        <fileTypePrev fileType='pdf' namefile="Archivo" v-if="fileExtencion == 'pdf'">
          <span slot="cancelFile" class="filetype-prev__cancel text text-title--name text--white">
            <font-awesome-icon class="text  text-normal mr-4 mt-4  text--white" :icon="['fa','arrow-down']" /></span>
        </fileTypePrev>
        </fragment>
        <div class="m-card--footer">
          <slot name="cardFooter">
         <div class="like-item d-lex">

            <font-awesome-icon class="text text--black-light" :icon="['fa','thumbs-up']" />
            <span class=" text-small">+{{ likes }}</span>
          </div>
          </slot>
          
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import fileTypePrev from './fileType'
  export default {
    props: ['title', 'description', 'poster', 'views', 'likes','typeCard','user'],
    components: {
      fileTypePrev

    },
  
    computed:{
      fileExtencion(){
        return this.poster.split('.').pop()
      }
    }
  }
</script>