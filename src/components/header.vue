<template>
      <div class="header-box position-fixed z-index-10 position-move__left-0 position-move__top-0" :class="bgcolor" :style="{
                'height':height
            }">
            <div class="header-box__cover z-index-1" :style="{
     'background-image': 'url('+ require('.././assets/SVG/shapes_bg.svg') +')' ,
             'background-repeat':'no-repeat',
             //'background-size':'40% 90%',
             'background-position':'right bottom'
   }">

              </div>
          <div class="header-box__content z-index-2 position-relative">
               <slot name="header-content">
                <h1 class="text text-title text--black mr-6">Item1</h1>
                <font-awesome-icon class="text text-title text--white" :icon="['fa','newspaper']" />
                </slot>
            </div>
           
        </div>
</template>
<script>
export default {
    props:['bgcolor','height']

}
</script>