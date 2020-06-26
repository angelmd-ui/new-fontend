<template>
    <div class="filetype-prev d-flex b-rounder-3" >
      <div class="filetype-prev__icon" :style="{
                'background-image':'url('+require('../assets/SVG/'+fileType+'.svg')+')',
                
            }" >
        
      </div>
      <div class="filetype-prev__description" >
          <span class="text text-small text--white"> {{ namefile  }} </span>

      </div>
      <slot name="cancelFile">

      </slot>
     
    </div>
</template>
<script>
export default {
    props:['fileType','namefile']
}
</script>