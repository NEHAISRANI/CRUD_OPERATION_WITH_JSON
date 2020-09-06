var express = require('express');
var app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.json());
var fs=require('fs');


app.post("/post",(req,res)=>{
    fs.readFile("courses.json",(err, data) => {
        if (err) {
            throw err;
        }
        var jsonData = JSON.parse(data)
        var user={
            courses_id:req.body.courses_id,
            courses:req.body.courses,
            exercise:req.body.exercise,
        } 
        user.exercise_id=jsonData.length+1
        jsonData.push(user)
        fs.writeFileSync("courses.json",JSON.stringify(jsonData,null,2))
        return res.send(jsonData)
    })
})

// //
app.get("/get",(req,res)=>{
    fs.readFile("courses.json",(err, data) => {
        if (err) {
            throw err;
        }
        var jsonData = JSON.parse(data)
        res.send(jsonData)
})
})
//
    app.put("/update/:id",(req,res)=>{
    var id=req.params.id;
    fs.readFile("courses.json",(err,data)=>{
        if (err) {
            throw err;
        }
        Data=JSON.parse(data)
        for(var i = 0; i < Data.length ; i++){
            if(Data[i]["exercise_id"]==id){
                Data[i]["courses_id"]=req.body.courses_id,
                Data[i]["courses"]=req.body.courses
            }
        }
        fs.writeFileSync("courses.json",JSON.stringify(Data,null,2));
        res.send(Data)
    })
}) 
    app.delete("/del/:id",(req,res)=>{
    var id=req.params.id;
    fs.readFile("courses.json",(err,data)=>{
        if (err) {
            throw err;
        }
        Data=JSON.parse(data)
        for(var i = 0; i < Data.length ; i++){
            if(Data[i]["exercise_id"]==id){
                delete(Data[i])
                console.log("yes")
            }
        }
        fs.writeFileSync("courses.json",JSON.stringify(Data,null,2));
        res.send(Data)

        })
    })
    


const server = app.listen(7856, function(){     
    var port= server.address().port
    console.log("listening on port %s...", server.address().port);
  }); 
  
  