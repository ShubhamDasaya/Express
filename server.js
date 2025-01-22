import express from 'express'
const app = express();

app.use(express.urlencoded({express:true}))
app.use(express.json());

let data = [
    {"id":"1","name":"Shubham","city":"Dhar", "collage":"ITEP" },
    {"id":"2","name":"karan", "city":"Indor","collage":"ITEP"},
    {"id":"3","name":"rohan","city":"devas","collage":"ITEP"},
    {"id":"4","name":"deepak","city":"ujjain","collage":"ITEP"},
    {"id":"5","name":"vikash","city":"ratlam","collage":"ITEP"},
    {"id":"6","name":"abay","city":"jhabua","collage":"ITEP"},
    {"id":"7","name":"vishal","city":"alirajpur","collage":"ITEP"},
    {"id":"8","name":"anil","city":"bhopla","collage":"ITEP"},
    {"id":"9","name":"sachin","city":"harda","collage":"ITEP"},
    {"id":"10","name":"hitesh","city":"badvani","collage":"ITEP"},
    {"id":"11","name":"daksh","city":"mansor","collage":"ITEP"},


]

app.get('/',(req,res)=>{
    res.status(200).json(data);
})

app.get('/:id',(req,res)=>{
   
        const found = data.find((item) => item.id === req.params.id)
    
    if(found){
        res.status(200).json(found);
    }else{
        res.sendStatus(404);
    }
    
})

app.post("/post",(req,res)=>{
    let datas = data.map(item => item.id);
    let newId = datas.length > 0 ?Math.max.apply(Math,datas)+1:1;
    let NewData = {
        "id" : newId,
        "name":req.body.name,
        "city": req.body.city,
        "collage":req.body.collage,

    }
    data.push(NewData);
    res.status(200).json({
        'message':'successfull created'
    })
})

app.put('/put/:id',(req,res)=>{
    const id = req.params.id;
    const index = data.findIndex(item => item.id === id );
    if(index !== -1){
        data[index] ={
            id:id,
            name:req.body.name || data[index].name,
            city: req.body.city || data[index].city,
            collage : req.body.collage || data[index].collage,

        }
        message : "udate sussefully!"
        res.json(data[index]);
    }else{
        res.status(404).json({message : 'Not found'})

    }
})

app.put('/puts/:name',(req,res)=>{
    let n_name = req.params.name;
   let index = data.findIndex(item => item.name === n_name)
   if(index !== -1){
    data[index] ={
        // id:id,
        // name : req.body.name ,
        // city: req.body.city,
        // collage : req.body.collage,
    
        id:data[index].id,
        name:req.body.name || data[index].name,
        city: req.body.city || data[index].city,
        collage : req.body.collage || data[index].collage,

    }
   
    message : "successfully update"
    res.status(200).json(data[index])
}else{
    res.status(404).json({message:'not found'})
}
})

app.patch('/patch/:id',(req,res)=>{
    let id = req.params.id;
    let index = data.findIndex(dat => dat.id === id );
    if( index !== -1){
        data[index]={
            id: data[index].id,
            name : req.body.name|| data[index].name,
            city: req.body.city || data[index].city,
            collage : req.body.collage || data[index].collage
        }

        res.status(200).json(data[index])
        message : "successfull!"
    }else{
        res.status(404).json({message:"opps not found"})
    }
})

app.delete('/del/:id', (req, res) => {
    let id = req.params.id;  
    let index = data.findIndex(dat => dat.id === id);
    if (index !== -1) {
        data.splice(index, 1); 
        res.status(200).json({
            message: "Data is deleted successfully"
        });
    } else {
        res.status(404).json({
            message: "Data not found, unable to delete"
        });
    }
});


app.listen(3000,(err)=>(err)?console.log("server is not started"):console.log(" server is  started")
)