


getUser(1,function(user){
    console.log(user);
    getRepositories(user,function(repos){
        console.log(repos)
        getCommits(repos,function(commits){
            console.log(commits);
        })
    });
})








function getUser(id,callback){

    setTimeout(function(){
        console.log("User Loaded- Calling Next Dependency")
        var name="Arslan";
        user={
            id  :id,
            name:name,
        }
        callback(user)
        //return name
    },2000)

}

const getRepositories=function(user,callback){

    setTimeout(function(){
        console.log("Repos Loaded- Calling Next Dependency")
        var reponame=[  {Name:"Repo-1"},
                        {Name:"Repo-2"},
                        {Name:"Repo-3"}];
        
        callback(reponame)
        //return name
    },2000)


}


const getCommits=function(repos,callback){

    setTimeout(function(){
        console.log("Commits Loaded- Calling Next Dependency")
        var commits=[  {Commit_1 :"e2r34erw"},
                        {Commit_2 :"34rewter"},
                        {Commit_3 :"564twrtw"}];
        
        callback(commits)
        //return name
    },2000)


}
