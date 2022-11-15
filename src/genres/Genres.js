import React,{useEffect,useState} from 'react'
import { Chip } from "@material-ui/core";
import LoadingImage from '../assets/loading.gif'


const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage
}) => {


    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
      };
    
      const handleRemove = (genre) => {
        setSelectedGenres(
          selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
      };
    
      const [loading, setloading] = useState(false);
    

  const fetchGenre = async () => {
     setloading(true)
    const response = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=1b6d953c21713d7f6ac130cf18af8a7d&language=en-US`)

    const data = await response.json()
    setloading(false)
    setGenres(data.genres)
  }

  useEffect(() => {
    fetchGenre()
    return () => {
        setGenres([]); // unmounting
      };
       // eslint-disable-next-line
  }, [])

  
  return loading? (<div className='loading-state'>
  <img src={LoadingImage} alt='loading-pic'/>
  </div>): (

    <div style={{ padding: "6px 0" }}>
         {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}

   {Array.isArray(genres) ? (genres).map((genres)=>{
    return (
        <>
            <Chip
        style={{ margin: 2 }}
          label={genres.name}
          key={genres.id}
          clickable
          size="small"
          onClick={() => handleAdd(genres)}
             />
        </>
    )
   }) : null}
    </div>
  )
}

export default Genres
