import { Grid } from '@mui/material'
import React from 'react'
import Movie from './Movie'

export default function MoviesList({ movies }) {
    return (
        <Grid container rowSpacing={1}>
            { movies?.map((movie, idx) => (
                <Grid key={idx} item xs={12} md={4} >
                    <Movie movie={movie} />
                </Grid>
            )) }
        </Grid>
    )
}
