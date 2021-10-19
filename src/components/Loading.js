import { Grid, Skeleton } from '@mui/material'
import React from 'react'

export default function Loading({ items }) {
    return (
        <Grid container className="row">
            { [...Array(items).keys()].map(item => (
                <Grid key={item} item xs={12} md={4}>
                    <Skeleton className="mt-1" height={300} variant="rectangular"/>
                    <Skeleton className="mt-1" height={10} variant="rectangular"/>
                    <Skeleton className="mt-1" height={10} variant="rectangular"/>
                </Grid>
            )) }
        </Grid>
    )
}
