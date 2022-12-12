let id; 
 
let search = document.getElementById("search"); 
let container = document.querySelector("#container"); 
let errorDiv = document.querySelector("#errorDiv"); 
let movieData = document.querySelector("#movieData"); 
 
async function  getData(search){ 
     
    try{ 
        let res = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=8733e40a`); 
        // let res = await fetch(`https://www.omdbapi.com/?i=tt6194530&apikey=8733e40a`); 
        let data = await res.json(); 
        // console.log(data.Search); 
        displayMovieData(data.Search); 
         
    }catch(err){ 
        errorFun(); 
    } 
} 
 
// getData("thor"); 
 
 
function findMovies(){ 
    let searchTerm = search.value.toLowerCase(); 
    // console.log(searchTerm); 
    container.innerHTML=null; 
    getData(searchTerm); 
     
} 
 
// View selected movie details 
async function selectMovie(ele,i){ 
    let eleId = ele.imdbID; 
    console.log(eleId); 
 
    try{ 
        let res1 = await fetch(`https://www.omdbapi.com/?i=${eleId}&apikey=8733e40a`); 
        let data1 = await res1.json(); 
        console.log(data1); 
        movieDetails(data1); 
    } 
    catch(err){ 
        console.log(err); 
    } 
     
 
} 
 
 
function displayMovieData(movies){ 
 
    // container.innerHTML = null; 
    errorDiv.innerHTML=null; 
    movieData.innerHTML=null; 
     
    if(movies.length > 0){ 
        movieData.style.visibility = "visible"; 
    } 
     
    movies.forEach(function(ele, i) { 
        let a = document.createElement('a'); 
        let div = document.createElement('div'); 
        let img = document.createElement('img'); 
        img.src = ele.Poster; 
        let title = document.createElement('p'); 
        title.innerText = ele.Title; 
 
        div.append(img,title); 
        a.append(div); 
        a.addEventListener("click", function(){ 
                    selectMovie(ele,i); 
                }); 
        movieData.append(a); 
    }); 
     
     
} 
 
 
function movieDetails(ele){ 
         
        container.innerHTML=null; 
 
        let div = document.createElement('div'); 
        div.setAttribute("id", "moviedetail"); 
        let img = document.createElement('img'); 
        img.src = ele.Poster; 
        let div1 = document.createElement('div'); 
        let title = document.createElement('h2'); 
        title.innerText =`${ele.Title} (${ele.Language})`; 
        let ul1 = document.createElement('ul'); 
        let imdb = document.createElement('li'); 
        imdb.innerText = `IMDb ${ele.imdbRating}`;
        let duration = document.createElement('li'); 
        duration.innerText = ele.Runtime; 
        let year = document.createElement('li'); 
        year.innerText = `Year : ${ele.Year}`; 
 
        let plot = document.createElement('p'); 
        plot.innerText = ele.Plot; 
 
        let ul2 = document.createElement('ul'); 
        let director = document.createElement('li'); 
        director.innerText = `Director: ${ele.Director}`; 
        let straring = document.createElement('li'); 
        straring.innerText = `Starring: ${ele.Actors}`; 
        let genre = document.createElement('li'); 
        genre.innerText = `Genre: ${ele.Genre}`; 
 
        ul1.append(imdb,duration,year); 
        ul2.append(director,straring,genre); 
        div1.append(title,ul1,plot,ul2); 
        div.append(img,div1); 
 
        container.append(div); 
 
} 
 
function errorFun(){ 
    let errimg = document.createElement('img'); 
    errimg.src = "https://media3.giphy.com/media/PIBuZutkhuKqV09TEf/200.webp?cid=ecf05e47ufb267o8crnk0kpg19fmotx3793zengtkz3wabpp&rid=200.webp&ct=g"; 
    container.innerHTML=null; 
    container.append(errimg); 
} 
 
 
function debounce(func, delay){ 
 
    if(id){ 
        clearTimeout(id); 
    } 
 
    id = setTimeout(function(){ 
        func(); //calling findMovie() 
    },delay); 
 
}
