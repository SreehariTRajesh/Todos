const express=require('express');
const app=express();
const bodyParser=require('body-parser')
const mongoose=require('mongoose');
const cors=require('cors');
mongoose.connect('mongodb://localhost/taskDB');
let db=mongoose.connection;
//Check for db errors
db.on('error',(err)=>{
    console.log(err);
});
db.once('open',()=>{
    console.log('Connected to MongoDB');
});
let Task=require('./models/task');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.post('/add-task',function(req,res){
    console.log(req.body);
    var T=new Task();
    console.log(req.body.name);
    console.log(req.body.date);
    T.name=req.body.name;
    T.date=new Date(req.body.date);
    T.save();
    res.json(true);
});
app.get('/add-task',function(req,res){
    Task.find({},(err,tasks)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(tasks);
        }
    });
});
app.put('/delete-task',function(req,res){
    const id= new mongoose.Types.ObjectId(req.body._id)
    Task.findByIdAndRemove({_id:id},(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
            console.log('deleted successfully');
        }
    });
});
app.listen(3001,function(){
    console.log(`Server up and running on http://localhost:3001`);
});