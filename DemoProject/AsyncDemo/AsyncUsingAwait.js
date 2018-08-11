//simples exmple of promise
const p=new Promise(function(resolve,reject){
    resolve(1);
});

p.then(result=>{
    console.log("Result is :",result)
});


// getUser(1,function(user){
//     console.log(user);
//     getRepositories(user,function(repos){
//         console.log(repos)
//         getCommits(repos,function(commits){
//             console.log(commits);
//         })
//     });
// })

async function displayCommits(){

    try{//try catch block is used to cath the rejected promises
        const user=await getUser(1);
        const repos=await getRepositories(user);
        const commits=await getCommits(repos);
        console.log(commits);
    }
    catch(e){
        console.log(e);
    }

    

}
displayCommits()








function getUser(id){

    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            console.log("User Loaded- Calling Next Dependency")
            var name="Arslan";
            user={
                id  :id,
                name:name,
            }
            resolve(user)
            //callback(user)
            //return name
        },2000)
    })
    

}

const getRepositories=function(user){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            console.log("Repos Loaded- Calling Next Dependency")
            var reponame=[  {Name:"Repo-1"},
                            {Name:"Repo-2"},
                            {Name:"Repo-3"}];
            
            // resolve(reponame)
            reject(new Error("Repos Not Found"));
        },2000)
    });
    


}


const getCommits=function(repos){
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            console.log("Commits Loaded- Calling Next Dependency")
            var commits=[  {Commit_1 :"e2r34erw"},
                            {Commit_2 :"34rewter"},
                            {Commit_3 :"564twrtw"}];
            
            resolve(commits);
            //return name
        },2000)
    })
    


}
