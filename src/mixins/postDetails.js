export default{
    data(){
        return{
        postDetails:{
            img:'',
            title:''
          },
          showDetails:false
        }
       },

      methods:{
        viewPostDetails(data){
             let { title,photo } = data.params
             this.showDetails = true
         this.postDetails.img = photo
         this.postDetails.title = title
        }
      }
}