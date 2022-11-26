let button = document.querySelector("button");
let input = document.querySelector("input#search");
let dispDiv = document.querySelector("div#body");
let header = document.querySelector("header");
let headerDiv = document.querySelector("#headerDiv");
let main = document.querySelector('main')
let mainBody = document.querySelector('#body')
let value;
let loader = document.createElement("div");
loader.classList.add("loader");
button.onclick = function (e) {
    if(input.value == ''){
        value = 'dog'
    }
    else{
        value = input.value.replaceAll(" ", "+");
    }
  if(document.querySelector('#createdDiv'))document.querySelector('#createdDiv').parentElement.removeChild(document.querySelector('#createdDiv'))
  headerDiv.removeChild(button);
  main.appendChild(loader);
  fetch(`/search?name=${value}`)
    .then((r) => r.json())
    .then(divAdder);
};

function divAdder(d) {
  let data = d;
  console.log(data);

  

  for(let i=0;i<data.length;i++){
     let innerDiv = document.createElement('div')
     innerDiv.id = "createdDiv"
     innerDiv.classList.add('createdDiv')
     let name = document.createElement('p')
     name.innerText = 'Name :'+data[i].name
     innerDiv.appendChild(name)
     let found = document.createElement('p')
     found.innerText = 'Found in :'+data[i].locations.join(',')
     innerDiv.appendChild(found)
     mainBody.appendChild(innerDiv)
  }
  
  main.removeChild(loader);
  headerDiv.appendChild(button);
}
