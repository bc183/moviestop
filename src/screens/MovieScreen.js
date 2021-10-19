import { Container, Grid, Typography, ImageList, ImageListItem } from '@mui/material';
import Image from 'material-ui-image'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_WIDTH_ORIGINAL } from '../constants';
import Loading from '../components/Loading';
import Message from '../components/Message';
import Breadcrumb from '../components/Breadcrumb';

export default function MovieScreen({ match }) {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //currency formatter
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    useEffect(() => {
        setLoading(true);
        const getMovieDetails = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/${match.url}?api_key=${API_KEY}`);
                setMovie(data);
                setLoading(false);
             } catch (error) {
                setError(error.response?.data?.status_message);
                setLoading(false);
            }
        }
        getMovieDetails();
    }, [match.url]);

    return (
        <Container className="mt-3">
            <Breadcrumb link={"Movie Details"} />
            <Typography variant="h4">
                {movie?.title}
            </Typography>
            <Typography variant="h6" className="text-muted">
                {`Rated: ${movie?.adult ? "18+": "All ages"}`}
            </Typography>
            {error && (
                <Message severity="error">
                    {error}
                </Message>
            )}
            { loading && <Loading items={1} /> }
            {!loading && !error && <Grid container spacing={4} className="mt-2">
                <Grid 
                    item
                    xs={12} 
                    md={4}
                >
                    <Image src={IMAGE_WIDTH_ORIGINAL + movie?.poster_path} alt={movie?.title} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Release : {new Date(movie?.release_date).toLocaleDateString("en-us" ,options)}
                            </Typography>
                            <Typography variant="h6">
                                Rating : {movie?.vote_average}/10 from {movie?.vote_count} votes
                            </Typography>
                            <Typography variant="h6">
                                Budget : {formatter.format(movie?.budget)}
                            </Typography>
                            <Typography variant="h6">
                                Revenue : {formatter.format(movie?.revenue)}
                            </Typography>
                            <Typography variant="h6">
                                Runtime : {movie?.runtime} min
                            </Typography>
                            <Typography variant="h6">
                                Status : {movie?.status}
                            </Typography>
                        </Grid>
                        <Typography variant="h6">
                            Production Companies   
                        </Typography>
                        <Grid container spacing={2} className="mt-2">
                            <ImageList cols={5} sx={{ width: 500 }} rowHeight={164}>
                                {movie?.production_companies.map((item, idx) => (
                                    item.logo_path ? (<ImageListItem key={idx}>
                                        <Image
                                            src={IMAGE_WIDTH_ORIGINAL + item.logo_path}
                                            alt={item.name}
                                            loading="lazy"
                                        />
                                    </ImageListItem>) : (
                                        <Typography key={idx} variant="p">
                                            {item.name}  
                                        </Typography>
                                    )
                                ))}
                            </ImageList>
                        </Grid>
                    </Grid>
                    <Grid>

                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4">
                        Overview  
                    </Typography>
                    <Typography variant="p">
                        {movie?.overview}   
                    </Typography>                                
                </Grid>
            </Grid>}
        </Container>
    )
}
