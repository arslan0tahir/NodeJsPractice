//temp setting of  env var for testing
process.env.DEBUG="app:startup";
process.env.APP_PASSWORD="password123";


const express=require('express');
const morgan=require('morgan');
const config=require('config');
const appDebug=require('debug')('app:startup');
const dbDebug=require('debug')('app:db');
const cources=require('./routes/cources')
const logger=require('./middlewares/logger');
const app=express();


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

app.use(logger);

app.use('/api/cources',cources);
//************************************************** */


app.get("/",(req,res)=>{
    res.send("HelloWorld")
});

//webserver
const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})