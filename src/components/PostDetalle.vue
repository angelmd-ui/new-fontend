<template>
    <div class="post-details bg-blue-dark appear_vd d-flex flex-column "  >
       <div class="post-details__tile p-1 d-flex">
           <font-awesome-icon 
           @click="$emit('closet')"
             class="text text-title--name text--white mt-2 " :icon="['fa','times']"    />
           <div class="ml-4">
             <h1 class="text text--white ">{{ title }}</h1>
           </div>
     
       </div>
       <div class="post-details__image  mt-4 scale-to">
          <pinch-zoom>
    <img :src="photo" /> 
    </pinch-zoom>
       </div>
   
    </div>
</template>
<script>
export default {
    props:['photo','title']
}


</script>