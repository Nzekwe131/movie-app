import  React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider,Button } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import SingleContent from './SingleContent';
import './trending.css'
import SearchIcon from '@mui/icons-material/Search';


export default function Search() {
  const [type, setType] = React.useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setType(newValue);
    setPage(1);
  };


  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {

    const response = await fetch (`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
      process.env.REACT_APP_API_KEY
    }&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
    const data = await response.json()
    
    setContent(data.results)
    setNumOfPages(data.total_pages);
   
  }

  useEffect(() => {
    fetchSearch()
    window.scroll(0,0)
  }, [page,type])



  return (
    <div>
  <ThemeProvider  theme={darkTheme}>
  <div style={{display:'flex',margin:'25px 15px '}}>
  <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />

<Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
    <SearchIcon />
          </Button>
  </div>

        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs 
      value={type} 
      onChange={handleChange} 
      indicatorColor='primary'
      textColor = 'primary'
      centered >
        <Tab label="Movies" style={{width:'50%'}} />
        <Tab label="TV-series" style={{width:'50%'}}/>
      </Tabs>
    </Box>
</ThemeProvider>
 <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      
    </div>

  );
}