const mongoose=require('mongoose');
let TaskSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:new Date()
    }
});
let Task=module.exports=mongoose.model('Task',TaskSchema);