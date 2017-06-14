console.log('Loaded!');
var button= document.getElementById('counter');
var counter=0;
button.onclick = function() {
    
var request =new XMLHttpRequest();
request.onreadystatechange = functio(){
    
    if(request.readystate ===XMLHttpRequest.DONE){
        if(request.status ===200){
            var counter=requet.responseText;
            var span =document.getElementById('count');
span.innerHTML=counter.toString();

        }
    }
};
request.open("GET","https://cloud.imad.hasura.io/counter",true);
  request.send(null);
  
};