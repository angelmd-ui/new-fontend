<template>
    <div class="loading-box d-flex justify-content flex-column">

       <Spinner  color="#22e1ef" :size="40"   ></spinner>

       <h3 class="text--white mt-4">{{ text }} </h3>

    </div>
</template>
<script>
import Spinner from 'vue-spinner-component/src/Spinner.vue'
export default {
    props:['text'],
    components:{
        Spinner
    }
}
</script>