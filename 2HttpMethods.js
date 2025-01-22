
const express = require('express'); 
const app = express();
const port = process.env.port || 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());

let data = [
    { "name": "Arjun Tripathi", "course": "ITEP", "roll_no": "14", "id": 1},
    { "name": "Rahul Durgapal", "course": "ITEP", "roll_no": "36", "id": 2 },
    { "name": "Aman Yadav", "course": "ITEP", "roll_no": "08", "id": 3}
];

app.get('/', function (req, res) {
    res.status(200).json(data);
});

app.get("/:id", function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

app.get("/:name", function (req, res) {
    let found = data.find(function (item) {
        return item.name === parseInt(req.params.name);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

app.post('/post', function (req, res) {
    let items = data.map(item => item.id);
    let newId = items.length > 0 ? Math.max.apply(Math, items) + 1 : 1;
    let newItem = {
       "id": newId,
        "name": req.body.name,
        "course": req.body.course,
        "roll_no": req.body.roll_no
    }
    data.push(newItem);
    res.status(201).json({
        'message': "successfully created"
    });

    app.delete("/:id", function (req, res) {
        // Parse the ID from the request URL
        console.log(req.params.id)
        const idToDelete = parseInt(req.params.id);
    id
        // Find the index of the item to delete
        const index = data.findIndex(item => item.id === idToDelete);
    
        if (index !== -1) {
            // Remove the item from the array
            data.splice(index, 1);
    
            // Respond with success
            res.status(200).json({
                message: `Item with ID ${idToDelete} successfully deleted`,
            });
        } else {
            // Respond with not found
            res.status(404).json({
                message: `Item with ID ${idToDelete} not found`,
            });
        }
    });
  
});

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status||500).send({
        err
    })
    
})


app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});