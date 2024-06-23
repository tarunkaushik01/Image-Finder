const accessKey = "76hxNhVI1Yi3nENpXYEOt5EDnI7aPrNTgUCRF10Vqlo";
const userInput = document.querySelector('#input');
const searchResults = document.querySelector('#button');
const showMore = document.querySelector('#button1');
const images = document.getElementById('images');
let inputData;
let page =1;

const arr = ['tree','forest','dark forest','dark sky','mountains','grassland'];
async function searchImages(inputValue){
    inputData = inputValue;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const respone = await fetch(url);
    const data = await respone.json(); 

    const results = data.results;

    // if(page === 1){
    //     searchResults.innerHTML = "";
    // }

    results.map((result) =>{
        const imageWrapper = document.createElement('div');
        imageWrapper.id = "img";
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        images.appendChild(imageWrapper);

    });

    page++;
    if(page>1){
        showMore.style.display = 'block';
    }
}
searchResults.addEventListener('click', function(e){
    e.preventDefault();
    images.innerHTML = "";
    if(userInput.value == ''){
        const para = document.createElement('p');
        para.innerHTML ='Please search for something';
        images.appendChild(para);
        images.style.textAlign='center';
    }
   else{
    page =1;
    searchImages(userInput.value);
   }
});
showMore.addEventListener('click', function (){

       if(userInput.value ==''){
        searchImages(arr[Math.floor(Math.random()*6)]);
       }else{
        searchImages(userInput.value);
       }
    
});

window.addEventListener('load',function(){
    for(let i=0;i<=2;i++){
        searchImages(arr[Math.floor(Math.random()*6)]);
    }
    showMore.style.display = 'none';
});

userInput.addEventListener('keydown',function(e){
    if(e.key == 'Enter'){
        images.innerHTML ="";
        if(userInput.value == ""){
            images.innerHTML = "please enter some value";
        }
        searchImages(userInput.value);
    }
});
