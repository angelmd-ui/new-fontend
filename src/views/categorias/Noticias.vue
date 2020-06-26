<template>
<div>
 <h1>i am noticia</h1>

</div>
</template>
<script>
export default {


    mounted(){
        console.log(this.$route.params.title)
    }
    
}
</script>