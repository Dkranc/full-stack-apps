const express= require ('express')
const router = express.Router()
const signUpTemplateCopy= require('../modles/SignUpModels')

router.post('/signup',(request,response)=>{ const signedUpUser=new signUpTemplateCopy({
     firstName:request.body.firstName,
     lastName:request.body.lastName,
     email:request.body.email,
     personalNumber:request.body.personalNumber,
     draftDate:request.body.draftDate,
     rank:request.body.rank
   })
   signedUpUser.save()
   .then(data=>{
      response.json(data)
   })
   .catch(error=>{
    response.json(error)
   })
})



module.exports=router




 