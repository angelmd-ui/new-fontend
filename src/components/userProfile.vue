<template>
    <div class="user-profile d-flex" >
       <div class="user-profile__photo">
           <img class="img__avatar" src="https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519_960_720.jpg" />
       </div>
       <div class="user-profile__username d-flex flex-column">
         <span class="text text-medium">Ember louis</span>
         <slot name="description">
          
         </slot>
       </div>
    </div>
</template>
<script>
export default {
    props:['username','photo']
}
</script>