<template>
    <div id="searchBox" class="d-flex flex-column justify-content translatex pt-8 p-1">
    
                 <div class="info-search d-flex" :style="{
     'background-image': 'url('+ require('.././assets/SVG/newester.svg') +')' ,
             'background-repeat':'no-repeat',
            'background-size':'cover',
           
   }">

              </div>
                 <div class="text-center">
           <h2 class="text text-normal mt-2 text--black-light mt-">Pudes buscar registros por titulos o descripciòn</h2>
           </div>
     
    </div>
</template>
<script>
import inputBase from '../components/input'
export default {
    components:{
     inputBase
    }
}
</script>