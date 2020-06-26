<template>
    <div>
        <h1>Service Details</h1>
        {{ detalle }}
    </div>
</template>
<script>
export default {
    props:['detalle'],
    mounted(){
        console.log(this.$props.detalle)
    }
}
</script>