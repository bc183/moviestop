import { Container, Grid, Pagination } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Message from '../components/Message';
import MoviesList from '../components/MoviesList';
import Breadcrumb from '../components/Breadcrumb';

export default function LikedMoviesScreen() {

    //pagination variable
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    const [paginatedMovies, setPaginatedMovies] = useState([]);

    const itemsPerPage = 18;

    const moviesList = useSelector(state => state.moviesList)

    const { likedMovies } = moviesList;

    useEffect(() => {
        setLoading(true);
        if (likedMovies.length > 0) {
            const startIndex = itemsPerPage * (page - 1);
            const endIndex = startIndex + itemsPerPage;
            const movies = likedMovies.slice(startIndex, endIndex);
            setPaginatedMovies(movies); 
            setLoading(false);
        } else {
            setPaginatedMovies([]);
        }
        setLoading(false);
    }, [moviesList, likedMovies, page])

    let totalPages = 0;

    if (Math.floor((likedMovies?.length) / itemsPerPage) === 0) {
        totalPages = 1;
    } else {
        let remainder = (likedMovies.length) % itemsPerPage;
        totalPages += Math.floor((likedMovies?.length) / itemsPerPage);
        if (remainder > 0) {
            totalPages++;
        }
    }


    //change page number
    const changePage = (event, value) => {
        setPage(value);
    }

    return (
        <Container className="mt-3">
            <Breadcrumb link={"Liked Movies"} />
            <Grid container>
                <Grid item xs={12} md={7}>
                    <h3>The movies you like on Movies Stop</h3>
                </Grid>
                {likedMovies?.length > 0 && <Grid item xs={12} md={5}>
                    <Pagination count={totalPages} page={page} onChange={changePage}/>                
                </Grid>}
            </Grid>
            { likedMovies.length === 0 && (
                    <Message severity="info">
                        There are no liked movies for now.
                    </Message>
                ) }
            { loading && <Loading items={3} />}
            { !loading && <MoviesList movies={paginatedMovies} />}
            {likedMovies?.length > 0 && <Grid className="col-12 col-md-5 offset-md-7">
                <Pagination className="mt-5" count={totalPages} page={page} onChange={changePage}/>
            </Grid>}
        </Container>
    )
}
