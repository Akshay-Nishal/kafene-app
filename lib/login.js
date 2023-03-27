var user = 'qaifi'
var pass = 'qaifi'

var login = document.getElementById("login-button")
login.addEventListener('click',()=>{
    var us = document.getElementById('username').value;
    var ps = document.getElementById('password').value;
    if(us==user && ps==pass){
        window.location.assign("order.html")
        alert("Login Successful")
        localStorage.setItem('login','true')
    }
    else{
        alert("Pleaseenter valid credentials!")
    }
})