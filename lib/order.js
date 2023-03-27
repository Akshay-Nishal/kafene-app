console.log("Script added");
var data = ''

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById('loading').style.display='none';
        document.getElementById('order').style.display='block';
       data =  JSON.parse(xhttp.responseText);
       console.log(data.length);
       for (let i = 0; i < data.length; i++) {
        let x = document.createElement('div')
        x.classList.add(data[i].orderStatus)
        x.classList.add('card')
        x.id='card'
        bc = bgcolor(data[i].orderStatus)
        x.style.backgroundColor=bc;
        x.innerHTML=`
        <div><p><span>ID:&nbsp;</span> ${data[i].id}</p></div>
        <div><p><span>Customer:&nbsp;</span> ${data[i].customerName}</p></div>
        <div><p><span>Date:&nbsp;</span> ${data[i].orderDate} ${data[i].orderTime}</p></div>
        <div><p><span>Amount:&nbsp;</span> ${data[i].amount}</p></div>
        <div><p><span>Status:&nbsp;</span>   ${data[i].orderStatus}</p></div>
        `
        document.getElementById('order-cards').appendChild(x)
       }
    }
};
xhttp.open("GET", "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders", true);
xhttp.send();


function bgcolor(c){
    switch(c){
        case 'New':
            return('#B6e8fa');
        case 'Packed':
            return('#B6fab6');
        case 'Delivered':
            return('#Fda6a6');           
        case 'InTransit':
            return('#Fdf6a6');
    }
}



var x = document.getElementById('order-cards')
var tablelist = x.getElementsByClassName('card')

var checkbox = document.querySelectorAll('.checkbox')
for(var check of checkbox){
    check.addEventListener('click',function(){
        if(this.checked == false){
            console.log(this.value," Unchecked");
            for (let i = 0; i < tablelist.length; i++) {
                if (tablelist[i].classList.contains(this.value)){
                    tablelist[i].style.display='none'
                }
            }
        }
        else{
            console.log(this.value," Checked");
            for (let i = 0; i < tablelist.length; i++) {
                if (tablelist[i].classList.contains(this.value)){
                    tablelist[i].style.display='block'
                }
            }
        }
    })
}


var logout = document.getElementById('logout')
logout.addEventListener('click',()=>{
    localStorage.setItem('login','false')
    window.location.assign("login.html")
})