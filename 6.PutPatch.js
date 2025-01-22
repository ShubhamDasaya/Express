const express = require('express');
const app = express();

app.use(express.json());

// In-memory "database"
let items = [

    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' }

    // {"id":"1","name":"Shubham","city":"Dhar", "collage":"ITEP" },
    // {"id":"2","name":"karan", "city":"Indor","collage":"ITEP"},
    // {"id":"3","name":"rohan","city":"devas","collage":"ITEP"},
    //   {"id":"4","name":"deepak","city":"ujjain","collage":"ITEP"},
    //   {"id":"5","name":"vikash","city":"tlam","collage":"ITEP"},
    //   {"id":"6","name":"abay","city":"jhabua","collage":"ITEP"},
    //   {"id":"7","name":"vishal","city":"alirajpur","collage":"ITEP"},
    //   {"id":"8","name":"anil","city":"bhopla","collage":"ITEP"},
    //   {"id":"9","name":"sachin","city":"harda","collage":"ITEP"},
    //   {"id":"10","name":"hitesh","city":"badvani","collage":"ITEP"},
    //   {"id":"11","name":"daksh","city":"mansor","collage":"ITEP"},
];

// **PUT: Replace an entire resource**

app.get('/',(req,res)=>{
    res.status(200).json(items)
})

app.post("/post",(req,res)=>{
    let item = items.map(data => data.id);
    let newId = item.length > 0? Math.max.apply(Math,item)+1 : 1; 
    let newItem = {
        "id" : newId,
        "name" : req.body.name,
        "description" : req.body.description
    };
    items.push(newItem);
    res.status(201).json({
        "message":'successfully Created'
    })
    
    
})


app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = items.findIndex(item => item.id === id);

    if (index !== -1) {
        // Replace the entire item
        items[index] = {
            id: id, // Ensure the ID remains the same
            name: req.body.name || '', // Default empty if missing
            description: req.body.description || '' // Default empty if missing
        };
        res.json(items[index]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// **PATCH: Partially update a resource**
app.patch('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);

    if (item) {
        // Update only the provided fields
        if (req.body.name !== undefined) item.name = req.body.name;
        if (req.body.description !== undefined) item.description = req.body.description;

        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
