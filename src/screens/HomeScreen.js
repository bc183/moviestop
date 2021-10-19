import { Container, Grid, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Loading from '../components/Loading';
import Message from '../components/Message';
import MoviesList from '../components/MoviesList';
import { getPopularMoviesList } from '../redux/actions/moviesAction';

export default function HomeScreen() {

    //pagination variable
    const [page, setPage] = useState(1)

    const dispatch = useDispatch()

    const moviesList = useSelector(state => state.moviesList)

    const { popularMovies, moviesLoading, error } = moviesList;

    //change page number
    const changePage = (event, value) => {
        setPage(value);
    }

    //fetch movies
    useEffect(() => {
        dispatch(getPopularMoviesList(page));
    }, [dispatch, page])

    return (
        <Container className="mt-3">
            <Grid container>
                <Grid item xs={12} md={7}>
                    <h3>Popular movies on Movies Stop</h3>
                </Grid>
                
                <Grid item xs={12} md={5}>
                    {!error && <Pagination count={popularMovies?.total_pages} page={page} onChange={changePage}/>}                
                </Grid>
            </Grid>
            {error && (
                <Message severity={"error"}>
                    {error}
                </Message>
            )}
            { moviesLoading &&  <Loading items={3}/> }
            {!moviesLoading && !error && <MoviesList movies={popularMovies.results} />}
                <Grid className="col-12 col-md-5 offset-md-7">
                    {!error && <Pagination className="mt-5" count={popularMovies?.total_pages} page={page} onChange={changePage}/>}               
                </Grid>
        </Container>
    )
}
