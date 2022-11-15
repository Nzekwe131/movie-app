import React ,{useEffect,useState}from 'react'
import LoadingImage from '../assets/loading.gif'
import SingleContent from './SingleContent';
import './trending.css'
import CustomPagination from '../pagination/CustomPagination';
import  Genres from '../genres/Genres'
import useGenre from '../Hooks/UseGenre'


const Tv = () => {
   
  const [page, SetPage] = useState(1);
  const [Content, SetContent] = useState([]);
  const [loading, setloading] = useState(false);
  const [numOfPages, setNumOfPages] = useState()
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreforURL = useGenre(selectedGenres)
  
  
  const fetchData = async () => {
    // setloading(true)
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=1b6d953c21713d7f6ac130cf18af8a7d&page&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
    const data = await response.json()
    
    // setloading(false)
    SetContent(data.results)
    setNumOfPages(data.total_pages);
    // console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [page,genreforURL])




  return loading? (<div className='loading-state'>
  <img src={LoadingImage} alt='loading-pic'/>
  </div>): (
  <div>
    <span className='pageTitle'>Tv series</span>
    <Genres  
       type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={SetPage}

    />
    <div className='trending'>
  {
    Content && Content.map((value)=>{
     return (
      <div>

      <div> 
     <SingleContent 
     key={value.id}
     id={value.id}
    poster={value.poster_path}
    title={value.title || value.name}
    date={value.release_date || value.first_air_date}
      media_type='tv'      
        vote_average={value.vote_average}
      />
     </div>
     
      </div>
     
     )
     
    })

  }
    </div>
    {numOfPages > 1 && (
      <CustomPagination
    page = {page}
    numOfPages={numOfPages}
     setpage = {SetPage}/>
      )}
  </div>

)


}

export default Tv





 
  