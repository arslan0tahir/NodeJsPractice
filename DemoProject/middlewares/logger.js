const logger=function (req,res,next){
    console.log("LOGGER%%%%%%%%%%%%% middleware");
    next();
}

module.exports=logger;