import React ,{useEffect,useState}from 'react'
import LoadingImage from '../assets/loading.gif'
import SingleContent from './SingleContent';
import './trending.css'
import CustomPagination from '../pagination/CustomPagination';


const Trending = () => {
   
  const [page, SetPage] = useState(1);
  const [Content, SetContent] = useState([]);
  const [loading, setloading] = useState(false);
  
  
  const fetchData = async () => {
    setloading(true)
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=1b6d953c21713d7f6ac130cf18af8a7d&page=${page}`)
    const data = await response.json()
    
    setloading(false)
    SetContent(data.results)
    // console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [page])



return loading? (<div className='loading-state'>
<img src={LoadingImage} alt='loading-pic'/>
</div>):  (
  <div>
    <span className='pageTitle'>Trending today</span>
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
      media_type={value.media_type}      
        vote_average={value.vote_average}
      />
     </div>  
      </div>
     
     )
     
    })

  }
    </div>
    <CustomPagination
    page = {page}
     setpage = {SetPage}/>
  </div>

)


}

export default Trending





 
  
 
