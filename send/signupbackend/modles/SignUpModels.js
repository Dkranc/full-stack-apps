const mongoose =require ('mongoose')

const signUpTemplate=new mongoose.Schema({
   firstName:{
        type:String,
        required:true
   },
      lastName:{
        type:String,
        required:true
   },
      email:{
        type:String,
        required:true
   },
       personalNumber :{
         type:String,
         required:true
   },
       draftDate :{
         type: Date,
         required:true
       },
         rank :{
         type: String,
         required:true
       },
       currentDate:{
        type:Date,
        default:Date.now
       }

})

module.exports=mongoose.model('mytable', signUpTemplate)