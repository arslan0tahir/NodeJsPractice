//temp setting of  env var for testing
process.env.DEBUG="app:startup";


const express=require('express');
const morgan=require('morgan');
const config=require('config');
const Joi=require('joi');
const appDebug=require('debug')('app:startup');
const dbDebug=require('debug')('app:db');


const app=express();
const cources=[
    {id:1, title:"course-1"},
    {id:2, title:"course-2"},
    {id:3, title:"course-3"},
]

//set env variable DEBUG

console.log(`# Node Configuration Package: ${config.get('name')}`);
appDebug(`# Node configuration Mail.host:  ${config.get('mail.host')}`);
appDebug(`# Node configuration Mail ENV Password:  ${config.get('mail.password')}`);


//*************middleware functions*****************

app.use(express.json()) //middleware to parse body of http req to json
if (app.get('env')=="development"){
    console.log(`Server Mode: ${app.get('env')}`)
    app.use(morgan('tiny'));// third party middleware

}
//************************************************** */


app.get("/",(req,res)=>{
    res.send("HelloWorld")
});

app.get("/api/cources",(req,res)=>{
    res.send(cources);
})

app.post("/api/cources",(req,res)=>{
    

    const {error}=validateCourceInput(req)

    if(error){
        res.status(400).send(error)
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


app.put('/api/cources/:id',(req,res)=>{
    const {error}=validateCourceInput(req);
    if(error){
        res.status(400).send(error)
        return;
    }

    const updatedResult=cources.find((obj)=>{
        if (obj.id==req.params.id){
            obj.title=req.body.title;
            return obj;
        }
    });
    if(updatedResult){
        res.send(updatedResult);
    }
    
    res.status(404).send("Item not found")

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




app.delete('/api/cources/:id',(req,res)=>{
    

    const toBeDeletedObj=cources.find((obj,index)=>{
        if (obj.id==req.params.id){
            
            myIndex=index;
            return obj;
        }
    });

    if(toBeDeletedObj){
        cources.splice(myIndex,1);
        //delete toBeDeletedObj;
        res.send(toBeDeletedObj);
        return
    }
    
    res.status(404).send("Item not found")

})




//input validation
const validateCourceInput=function(req){
    
    //input validation using joi
    const schema={
        title: Joi.string().min(3).max(255).required(),
    }
    const result=Joi.validate(req.body,schema)

    console.log(result);
    return result;
        


}


//webserver
const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})