import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [photos, setPhotos] = useState([])
  const [currentpage, setCurrentpage] = useState(1)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (fetching) {
      console.log("fetching")
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=20&_page=${currentpage}`)
        .then(response => {
          setPhotos([...photos,  ...response.data])
          setCurrentpage(prevState => prevState + 1)
        })
        .finally(() => setFetching(false));
    }
  }, [fetching])

  useEffect(() =>{
    document.addEventListener('scroll', scrollHandler)
    return function() {
      document.removeEventListener('scroll', scrollHandler )
    }
  }, [])

  const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true)
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {photos.map(photo => 
            <div className='col-12' key={photo.id}>
              <div className="card mb-4">
                <div className="card-body gap-2 d-flex">
                  <img src={photo.thumbnailUrl} alt="" />
                  <div> 
                    <h4>{photo.id}. {photo.title}</h4>
                  </div>
                </div>
              </div>
            </div>  
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
