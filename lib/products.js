console.log("Script added");
var data = ''

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById('loading').style.display='none';
        document.getElementById('product').style.display='block';
       // Typical action to be performed when the document is ready:
       data =  JSON.parse(xhttp.responseText);
       console.log(data.length);
       for (let i = 0; i < data.length; i++) {
        let x = document.createElement('div')
        // x.classList.add(data[i].orderStatus)
        x.classList.add('card')
        if (data[i].stock<100) {
            x.classList.add('Low')
            x.style.backgroundColor = '#Fffbbb';
        }
        if(isexpired(data[i].expiryDate)){
            x.classList.add('Expired')
            x.style.backgroundColor = '#Ffbbbb';
        }
        x.id='card'
        // bc = bgcolor(data[i].orderStatus)
        // x.style.backgroundColor=bc;
        x.innerHTML=`
        <div><p><span>ID:&nbsp;</span> ${data[i].id}</p></div>
        <div><p><span>Product Name:&nbsp;</span> ${data[i].medicineName}</p></div>
        <div><p><span>Product Brand:&nbsp;</span> ${data[i].medicineBrand}</p></div>
        <div><p><span>Expiry Date:&nbsp;</span> ${data[i].expiryDate}</p></div>
        <div><p><span>Unit Price:&nbsp;</span>   $${data[i].unitPrice}</p></div>
        <div><p><span>Stock:&nbsp;</span>   ${data[i].stock}</p></div>
        `
        document.getElementById('product-cards').appendChild(x)
       }
    }
};
xhttp.open("GET", "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",true);
xhttp.send();


function isexpired(x){
    const mn = {"Jan":1, "Feb":2, "Mar":3, "Apr":4, "May":5, "Jun":6,"Jul":7, "Aug":8, "Sep":9, "Oct":10, "Nov":11, "Dec":12};
    x=x.split('-')
    x[0] = parseInt(x[0])
    x[1] = mn[x[1]]
    x[2] = parseInt(x[2])
    console.log(x);
    y = []
    y[0] = new Date().getDate()
    y[1] = new Date().getMonth()
    y[2] = new Date().getFullYear()
    console.log(y);

    if((x[2]<y[2]) || (x[1]<y[1] && x[2]==y[2])){
        return 1
    }
    else{
        return(0);
    }
}


// function bgcolor(c){
//     switch(c){
//         case 'New':
//             return('#B6e8fa');
//         case 'Packed':
//             return('#B6fab6');
//         case 'Delivered':
//             return('#Fda6a6');           
//         case 'InTransit':
//             return('#Fdf6a6');
//     }
// }



var x = document.getElementById('product-cards')
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