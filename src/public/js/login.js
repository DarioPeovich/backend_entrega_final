const form = document.getElementById('loginForm');
const purchase = document.getElementById('purchase');
form.addEventListener("submit", e =>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};

    data.forEach((value,key)=>obj[key]=value);

    fetch('/api/sessions/login',{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(result=>{
        if(result.status===200){
            window.location.replace('/products')
        }else{
            console.log(result);
        }
    })

})


//No se usa 23/02/24
purchase.addEventListener("onclick", (ev)=>{

    fetch('/api/carts/6582dc51c143c892901788f4/purchase',{
        method:"POST"
        // body:JSON.stringify(obj),
        // headers:{
        //     "Content-Type":"application/json"
        // }
    }).then(result=>{
        if(result.status===200){
            window.location.replace('/products')
        }else{
            console.log(result);
        }
    })

    // if(ev.key === "Enter"){
    //     const inputMessage = chatInput.value;
    //     if(inputMessage.trim().length > 0){
    //         socket.emit("chat-message", {username, message: inputMessage});
    //         chatInput.value = "";
    //     }
    // }
})