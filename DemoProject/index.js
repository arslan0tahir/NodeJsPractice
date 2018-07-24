const express=require('express');
const Joi=require('joi');

const app=express();
const cources=[
    {id:1, title:"course-1"},
    {id:2, title:"course-2"},
    {id:3, title:"course-3"},
]

//middleware functions
app.use(express.json()) //middleware to parse body of http req to json





app.get("/",(req,res)=>{
    res.send("HelloWorld")
});

app.get("/api/cources",(req,res)=>{
    res.send(cources);
})

app.post("/api/cources",(req,res)=>{
    //list down all json properties that are destined to be used in code and perform input validation
    const title=req.body.title;


    //validation goes here
    // if (title.length<3 || !title){
    //     res.status(400).send("Invalid data")
    //     return;
    // }


    //input validation using joi
    const schema={
        title: Joi.string().min(3).max(255).required(),
    }

    const result=Joi.validate(req.body,schema)
    //console.log(result);

    if(result.error){
        res.status(400).send(result.error)
        return;
    }

    const course={
        id: cources.length+1,
        title: req.body.title,
    }

    cources.push(course);
    console.log(cources);


    //send back created object
    res.send(course);
    
    
    //res.send(cources);
})




///api/posts/:month/:year    is also valid
app.get("/api/cources/:id",(req,res)=>{
    //res.send(req.params.id);
    //res.send(req.params);     //shows all params defined in URL path
    //res.send(req.query);      //shows all query aparameters ?
    const myMatchedCource=cources.find((obj)=>{
        return obj.id=== Number(req.params.id)
    })

    if (myMatchedCource){
        res.send(myMatchedCource)
    }
    else{
        res.status(404).send("the cource with given id was not found");
    }



});

const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})