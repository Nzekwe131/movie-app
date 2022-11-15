import  React,{useState,useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4,

// width: "50%",
// height: "20%",
backgroundColor: "transparent",
border: "1px solid #282c34",
borderRadius: 10,
color: "white",

};

export default function ContentModal({children,media_type,id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [video, setVideo] = useState();


  const fetchVideo = async () => {
   
    const response = await fetch (`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    const data = await response.json()
  
    setVideo(data.results.key)
  }

 

  useEffect(() => {
    fetchVideo()
 
      // eslint-disable-next-line
  }, [])



  return (
    <div>
    <div>
    <Button onClick={handleOpen}> {children}</Button>
    </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}

      >
        <Fade in={open}>
          <Box sx={style}>

            <Button
                    variant="contained"
                    startIcon={<YouTubeIcon/>}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
           
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}