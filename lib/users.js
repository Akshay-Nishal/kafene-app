console.log("users script added");

var se = document.getElementById('search')
se.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        x = se.value
        if(x.length>=2){
            document.getElementById('user-cards').innerHTML=''
            y=x.toUpperCase()
            console.log("Enter",x,y);
            se.value = ''
            var urls=[]
            for (let i = 0; i < data.length; i++) {
                z = data[i].fullName.toUpperCase()
                if(z.includes(y)){
                    fn = data[i].fullName
                    fn = fn.split(" ")
                    let url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName="
                    url = url+fn[0]
                    urls.push(url);
                }
            }
            for (let i = 0; i < urls.length; i++) {
                test(urls[i])
            }
        }
        else{
            se.value = ''
            window.alert("Please enter at least 2 characters")
            document.getElementById('user-cards').innerHTML = mainhtml
        }
    }
});



function test(url)
{               
var ht = new XMLHttpRequest();
ht.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    newdata =  JSON.parse(ht.responseText);
    console.log(newdata);
    setcard(newdata[0]);
}
}
ht.open("GET",url, true);
ht.send();
}

var data
var mainhtml

document.getElementById('user-cards').innerHTML=''
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById('loading').style.display='none';
        document.getElementById('users').style.display='block';
        data =  JSON.parse(xhttp.responseText);
        console.log(data.length);
        console.log("Data",data[0].id);
        for (let i = 0; i < data.length; i++) {
            setcard(data[i])
        }
        mainhtml = document.getElementById('user-cards').innerHTML
    }
};
xhttp.open("GET", "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users", true);
xhttp.send();


function setcard(card){
    let x = document.createElement('div')
    x.classList.add('user-card')
    x.classList.add(card.gender)
    x.innerHTML=`
    <div class="user-img">
    <img src="${card.profilePic}" alt="">
    </div>
    <div class="user-info">
    <p><span class="info-head">Id: &nbsp;</span>${card.id}</p>
    <p><span class="info-head">Full Name: &nbsp;</span>${card.fullName}</p>
    <p><span class="info-head">DoB: &nbsp;</span>20${card.dob}</p>
    <p><span class="info-head">Gender: &nbsp;</span>${card.gender}</p>
    <p><span class="info-head">Current Location: &nbsp;</span>${card.currentCity}</p>
    </div>
    `
    // console.log(x);
    document.getElementById('user-cards').appendChild(x)
}

var reset = document.getElementById('Reset')
reset.addEventListener('click',()=>{
    se.value=''
    document.getElementById('user-cards').innerHTML = mainhtml
})



var logout = document.getElementById('logout')
logout.addEventListener('click',()=>{
    localStorage.setItem('login','false')
    window.location.assign("login.html")
})



