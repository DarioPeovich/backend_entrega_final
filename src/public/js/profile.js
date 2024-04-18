// console.log(`Bearer ${localStorage.getItem("token")}`);

fetch("/api/sessions/current", {
    method:"GET",
    headers:{
        "authorization": `Bearer ${localStorage.getItem("token")}`
    }
})
.then(response=>{
    if(response.status===401){
        window.location.replace('/login')
    }else{
        return response.json();
    }
})
.then(json =>{
    const paragraph = document.getElementById("result");
    paragraph.innerHTML = `<br>
    Usuario: ${json.payload.fullName}<br>
    Email: ${json.payload.email}<br>
    Edad: ${json.payload.age}<br>
    Rol: ${json.payload.role}`;
})

