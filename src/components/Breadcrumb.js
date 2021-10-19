import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';


export default function Breadcrumb({ link }) {
    return (
        <Breadcrumbs>
            <Link color="inherit" to="/">
                Home
            </Link>,
            <Typography color="text.primary">
                { link }
            </Typography>,
        </Breadcrumbs>
    )
}
