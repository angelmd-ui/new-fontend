<template>
    <div class="programas-box d-flex flex-column  ">
      
            <div class="programas-box__icon  bg-gradient--green d-flex justify-content">
        <font-awesome-icon class="text text--white" :icon="['fa',icon]" />
        </div>
       
     <div class="programas-box-title  ">
        
      <h1 class="text text-small">{{ name }}</h1>
    
     </div>

    </div>
</template>
<script>
export default {
    props:['icon','name']
}
</script>