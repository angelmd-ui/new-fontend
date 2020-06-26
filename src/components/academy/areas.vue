<template>
<fragment>
        <div class="area-item d-flex b-rounder--3 mt-2 shadow text-center " >
                        <div class="area-item__icon mr-2 d-flex " :style="{
                'background-image':'url('+require('../../assets/SVG/'+nombre+'.svg')+')',
                 'background-repeat':'no-repeat',
                'background-size':'cover',
                
            }" >
              </div>
                <h2 class="text text-normal text--black">{{ nombre }}</h2>
               </div>

      </fragment>         
</template>
<script>
export default {
    props:['nombre']
}
</script>