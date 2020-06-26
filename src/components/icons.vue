<template>
<div class="category-item-container">


    <div class="category-item" >
        <div class="icons-category" :style="{
                'background-image':'url('+require('../assets/SVG/icons/book.svg')+')',
                'background-repeat':'no-repeat',
                'background-size':'100%',
                'background-position':'top'}">

        </div>
   
</div>

         <h3 class="text text-small">{{ text }}</h3>   
    </div>
</template>
<script>
export default {
    props:['nameIcon','text']
}
</script>