let page = 1;
const key = "fbUoNnxLwE9WA0X1z2Co1FQY9gCBJ91hKLtdKiQr";
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const pageInput = document.getElementById('pageSearch');
const pageBtn = document.getElementById('pageBtn');
const bgImg = document.getElementById('bgImg');
const body = document.getElementsByTagName('body')[0];

const getUrl = (pageNum) => {
    return "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=" + pageNum.toString() + "&api_key=" + key;
}

let clearPhotos = () => {
    while (document.getElementsByTagName('table')[0].firstElementChild) {
        document.getElementsByTagName('table')[0].removeChild(document.getElementsByTagName('table')[0].firstElementChild);
    }
}

let getPhotos = (url) => {
    if (page > 1) {
        prevBtn.style.display = "inline-block";
    } else {
        prevBtn.style.display = "none";
    }


    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(json => {
        
        
        //JSON HANDLING AND DOM MANIPULATION
        while(json.photos.length > 0) {
            let thesePhotos = [];
            for (let i = 0; json.photos.length > 0 && i < 5; i++) {
                thesePhotos.push(json.photos.shift());
            }
            let tr = document.createElement('tr');
            for (let i = 0; i < thesePhotos.length; i++) {
                let td = document.createElement('td');
                let img = document.createElement('img');
                td.appendChild(img);
                img.width = 200;
                img.height = 150;
                img.src = thesePhotos[i].img_src;
                tr.appendChild(td);
            }
            document.getElementsByTagName('table')[0].appendChild(tr);
            document.getElementsByTagName('table')[0].style.display = "table";
        }
    


    })
    .catch(err =>{
        console.error(err);
    });
}

const resetPage = () => {
    document.getElementsByTagName('table')[0].style.display = "none";
    clearPhotos();
    if (page > 34) { page = 34; } else if (page < 1) { page = 1; }
    getPhotos(getUrl(page));
    getPhotos(getUrl(page + 1));
    document.getElementsByTagName('h3')[0].innerText = "Page " + Math.ceil(page/2) + " of 17";
}

resetPage();

nextBtn.addEventListener('click', e => {
    page += 2;
    resetPage();    
})

prevBtn.addEventListener('click', e => {
    if (page > 2) {
        page -= 2;
        resetPage();
    }
})

pageBtn.addEventListener('click', e => {
    if (pageInput.value != "") {
        page = parseInt(pageInput.value) * 2;
        resetPage();
        pageInput.value = "";
    }
    
})

pageInput.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        page = parseInt(e.target.value) * 2;
        resetPage();
        e.target.value = "";
    }
})