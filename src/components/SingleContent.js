
import { img_300, unavailable } from "../config";
import "./SingleContent.css";
import { Badge } from "@material-ui/core";
import ContentModal from "../ContentModal/ContentModal";



  const SingleContent = ({
        id,
        poster,
        title,
        date,
        media_type,
        vote_average,
      }) => {
        return (

        <ContentModal media_type={media_type} id={id} className='media'>
        <div  className='media'>
        <Badge
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
            <img
              className="poster"
              src={poster ? `${img_300}${poster}` : unavailable}
              alt={title}
            />
            <b className="title">{title}</b>
            <span className="subTitle">
              {media_type === "tv" ? "TV Series" : "Movie"}
              <span className="subTitle">{date}</span>
            </span>
        </div>

        </ContentModal>
          
        
        );
      }

      export default SingleContent