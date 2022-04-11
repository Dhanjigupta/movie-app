import './App.css';
import {useEffect, useState} from 'react';
function App(){
  
  let [movieinfo,SetMovieinfo] = useState(null);
  let [title,SetTitle] = useState("the avengers");

  useEffect(()=>{

   getMovieData();

  },[])


  function readTitle(value){
    SetTitle(value)
  }

  function getMovieData(){
    const url= `https://omdbapi.com/?t=${title}&apikey=1fbc09fd`;
    fetch(url)
    .then((response)=>response.json())
    .then((movie)=>{
      console.log(movie);
      SetMovieinfo(movie);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className="App">
         <div className="container">
              <div className="padd">
                 <h1>Movie Search</h1>
                 <div className="input-group">
                   <input onChange={(event)=>{readTitle(event.target.value)}} type="text" placeholder="Enter Movie Name" className="search-field" />
                   <button className="btn" onClick={getMovieData}>Get Movie</button> 
                 </div>
                 {
                   movieinfo?.Error===undefined?(
                 
                   <div className="movie">
                     <div className="poster">
                         <img src={movieinfo?.Poster} className="img-poster" alt="" />
                     </div>
                     <div className="details">
                         <div className="padd">
                             <h3>{movieinfo?.Title}</h3>
                             <p><strong>Genre</strong>: {movieinfo?.Genre}</p>
                             <p><strong>Driector</strong>: {movieinfo?.Director}</p>
                             <p><strong>Plot</strong>: {movieinfo?.Plot}</p>
                             <p><strong>Cast</strong>: {movieinfo?.Actors}</p>
                             <p><strong>Box Office</strong>: {movieinfo?.BoxOffice}</p>
                             <p><strong>Language</strong>: {movieinfo?.Language}</p>
                             <p><strong>Release Date</strong>: {movieinfo?.Released}</p>
                             <div className="ratings">
                                {
                                  movieinfo?.Ratings.map((ratings,index) => (
                                    <div key={index}>
                                      <strong>{ratings.Source}</strong>
                                      <h3>{ratings.Value}</h3>
                                    </div>
                                  
                                  ))
                                }
                                
                             </div>
                         </div>
                     </div>
                   </div>
                   ):(
                     <h3>Movie Not Found</h3>
                   )
                 }
              </div>
         </div>
    </div>
  );
}

export default App;
