import react, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Img from './images/contemplative-reptile.jpg';
import { createTheme } from '@mui/material/styles';


export default function MiniBlog(props) {

//   const theme = createTheme({
//   typography: {
//     // In Chinese and Japanese the characters are usually larger,
//     // so a smaller fontsize may be appropriate.
//     fontSize: 20,
//   },
// });

const [likes,setLikes] = useState({
  likeCount: 0
})

const handleClick = () =>{
  setLikes(likes+1)
}

  return (
    <Card sx = {{width: "100%"}} className="card" fontSize="inherit">
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={props.name}
        // subheader={props.date}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.img}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h4" color="text-dark" style={{textTransform: 'capitalize'}}>
          {props.title}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="p" color="text.secondary">
          {props.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites" onClick={handleClick}>
          <FavoriteIcon />
        </IconButton> */}
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
