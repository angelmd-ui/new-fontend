<template>
  <div class="message-box d-flex justify-content appear">
    <div class="message-box__body ">
      <slot name="message">

      </slot>
    </div>
    <span class="text text-title--name text--white closet--icon" @click="$emit('closet')">x</span>
  </div>
</template>
<script>
export default {
    
}
</script>