module.exports = (app, fs) => {
    const dataPath = "route/data/user.json";
    app.get("/users", (req, res) => {
        fs.readFile(dataPath, (err, data) => {
            if (err) {  
                throw err;
            }
            console.log("nehaaaa")
            res.send("neha"); 
        });
    }); 

   
// //          ----------------------------------

    app.post("/postApi", (req, res) => {
        fs.readFile(dataPath,(err, data) => {
            if (err) { 
                throw err;
            }
            var data = JSON.parse(data)
            var newUserId = (data.length) + 1                   
            // add the new user 
            var detail = req.body  
            detail['id'] = newUserId 
            data.push(detail)    
            fs.writeFileSync('route/data/user.json',JSON.stringify(data,null,2));
            return res.send(data);   
        }); 
    })
// //          -----------------------------------

    app.put("/update/:id",(req,res)=>{
        var id = req.params.id;
        fs.readFile(dataPath,(err, data) => {
            if (err) {  
                throw err; 
            } 
            newdata = JSON.parse(data)
            for(var i=0; i<newdata.length; i++){
                if(newdata[i]["id"] == id){
                    newdata[i]["name"] =req.body.name,
                    newdata[i]["email"]=req.body.email
                }
            }
            fs.writeFileSync('route/data/user.json',JSON.stringify(newdata,null,2));
            res.send(newdata)
        })
    })
//     ---------------------------------
    app.delete("/deleteApi/:id",(req,res)=>{ 
        var id = req.params.id
        fs.readFile(dataPath,(err, data) => {
            newdata = JSON.parse(data) 
            for(var i=0; i<newdata.length; i++){
                if(newdata[i]["id"] == id){
                    delete newdata[i]  
                    console.log("delete");
                }
            }
            console.log('not F ');       
            res.send('not ')   
         
          
            fs.writeFileSync('route/data/user.json',JSON.stringify(newdata,null,2));
        })
    })
}

