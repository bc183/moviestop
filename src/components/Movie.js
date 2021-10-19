import React from 'react';
import { Link } from 'react-router-dom';
import { 
        Card, 
        CardHeader, 
        IconButton, 
        CardMedia, 
        CardContent, 
        Typography,
    } from '@mui/material';
import { useDispatch } from 'react-redux'
import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';
import { IMAGE_WIDTH_400 } from '../constants';
import { toggleLikeForMovies } from '../redux/actions/moviesAction';

export default function Movie({ movie, history }) {

    const dispatch = useDispatch();

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const handleLike = (movie) => {
        dispatch(toggleLikeForMovies(movie))
    }

    return (
        <Card sx={{ maxWidth: 345, height: 500 }}>
            <CardHeader
                title={movie.title}
                subheader={`Rated: ${movie.adult ? "18+": "All ages"}`}
                style={{ height: 100 }}
                action={
                    <IconButton aria-label="add to favorites" onClick={() => handleLike(movie)}>
                        {movie.isLiked ? <FavoriteOutlined sx={{ color: 'red' }} />: <FavoriteBorderOutlined />}
                    </IconButton>
                }
            />
            <Link to={`/movie/${movie.id}`}>
                <CardMedia
                    component="img"
                    height="194"
                    style={{ cursor: 'pointer' }}
                    image={IMAGE_WIDTH_400 + movie.poster_path}
                    alt={movie.title}
                />
            </Link>
            
            <CardContent>
                <Typography variant="body2" color="text.secondary" style={{ height: 100 }}>
                    {movie.overview?.length > 200 ? movie.overview.substring(0, 200) + "..." : movie.overview}
                </Typography>
                <div className="mt-1">
                    <Typography className="d-block">Release : {new Date(movie.release_date).toLocaleDateString("en-us" ,options)}</Typography>
                    <Typography className="d-block">Rating : {movie.vote_average}/10 from {movie.vote_count} votes</Typography>                    
                </div>
            </CardContent>
        </Card>
    )
}
