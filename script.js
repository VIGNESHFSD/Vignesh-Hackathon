

var div=document.createElement("div");
div.className="container mt-3";
document.body.append(div);


var input=document.createElement("input");
input.setAttribute("type","text");
input.setAttribute('placeholder', 'Enter keyword to search')
input.className="form-control";
input.addEventListener('keyup', search);
div.append(input);


var br1=document.createElement("br");
div.append(br1);

var ul=document.createElement("ul");
ul.className="list-group";
ul.setAttribute("id","myList");
div.append(ul);

document.body.append(div);
search();



async function search(){
  try {
  ul.innerHTML = '';

  var res=await fetch("https://api.openbrewerydb.org/breweries?by_name=");
  var res1=await res.json();
  
  var keyword = input.value;
 for(var i=0;i<res1.length;i++){
   try {
    if(keyword.length == 0 || res1[i].name.toLowerCase().includes(keyword.toLowerCase()) 
            ||  (res1[i].phone != null && res1[i].phone.includes(keyword))){
      var li = document.createElement('li');
      li.className =  "list-item";      
      var div=document.createElement("div");
      div.className="content"
      li.append(div);
      ul.append(li);
      var label=document.createElement("label");
          label.innerHTML= 'Name   : ' + res1[i].name;
          label.className="contentname";
          div.append(label);
          div.append(document.createElement("br"));
      var label1=document.createElement("label");
          label1.innerHTML='Type   : ' + res1[i].brewery_type;
          div.append(label1);
          div.append(document.createElement("br"));
      var label2=document.createElement("label");
        if(res1[i].website_url != null){
            label2.innerHTML= 'url : ';
            var a = document.createElement('a');
            a.href = res1[i].website_url;
            a.innerHTML = res1[i].website_url;
            label2.append(a);
        }else{
            label2.innerHTML= 'url : -';
        }
          div.append(label2);
          div.append(document.createElement("br"));
      var label3=document.createElement("label");
          if(res1[i].phone != null){
            label3.innerHTML= 'Phone : ' + res1[i].phone;
          }else{
            label3.innerHTML= 'Phone : -';
          }
          div.append(label3);
          div.append(document.createElement("br"));
    }
   } catch (error) {
     console.log(res1[i]);
   }
  }
}catch(error){
  console.log(error);
} 
  }
