let uid= document.getElementById('uid')
async function fetchUser(username) {
let response = await fetch(`https://api.github.com/users/${username}`) ;   
let result =await response.json()
document.getElementById("profile").innerHTML =`<div class="info">
        <div class="img">
            <img src=${result.avatar_url} alt=""></div>
        <div class="bio">
            <p class="username">${result.name}</p>
            <p class="desig">${result.bio}</p>
        </div>
    </div>
    <div class="followInfo">
        <div class="following">
            <div class="social">
                <p>Followers</p>
                <p>${result.followers}</p>
            </div>
            <div class="social">
                <p>Following </p>
                <p>${result.following}</p>
            </div>
            <div class="social">
                <p>Repository</p>
                <p>${result.public_repos}</p>
            </div>
            </div>
          <a href=${result.html_url} target='_blank' class="visit" > 
        
         <div >Visit profile</div>
         </a>
    </div>


</div>`
  
console.log(result);
}

document.getElementById('btn').addEventListener('click',()=>{
    document.getElementById("profile").innerHTML =`<span class="loader"></span>`
  let prof =uid.value;
  fetchUser(prof);
})
