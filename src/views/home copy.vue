<template>
    <div id="news" class="container-box flex-column">
         <!--
         <div class="news-header ">

         <div class="d-flex">
           <h1 class="text text-title text--blue d-flex-2">News</h1>
        <font-awesome-icon class="text text-title text--blue" :icon="['fa','bars']" @click="menu = true"/>
         </div>
        
        
        <div class="category-box">
            <carousel id="navber" class="navber" :nav="false" :dots="false"
                :responsive="{0:{items:5,touchDrag:true,mouseDrag:true},600:{items:6,nav:true,touchDrag:false,mouseDrag:false}}">

                <icons nameIcon="book" text="Academico" />
                <icons nameIcon="earth-globe" text="Deporte" />
                <icons nameIcon="basketball" text="Cultura" />
                <icons nameIcon="mouse" text="tecnologia" />
                <icons nameIcon="art" text="arte" />
                <icons nameIcon="mouse" />

            </carousel>

        </div>

        
</div>
        <div class="news-container" v-for="(item,index) in news" :key="index">

           <news   
             :title="item.title"
             :pathImg="item.fileRecord"
             :description="item.description"
             :views="item.views"
            />


        </div>
        
-->
        <router-view></router-view>
        <Menu v-if="menu" id="iconcloset" @closetMenu="closet" @activeCategory="category" ></Menu>
    </div>
</template>
<script>
  

    import icons from '../components/icons'
    import carousel from 'vue-owl-carousel'
    import news from '../components/news'
    import Menu from '../components/menu'

  
    export default {

        components: {
            icons,
            carousel,
            news,
            Menu
        },
        data() {
            return {
                menu:true,
            }
        },
       
        methods:{
          closet(){
            let closet = document.getElementById('iconcloset')
            iconcloset.classList.add('translatereverse')
   
           iconcloset.addEventListener("animationend",() =>{
           this.menu = false;
         }); 
          },
          category(data){
             this.menu = data
          }
        },
         mounted(){
          this.menu= true
        },
    }
</script>