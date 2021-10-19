import { Alert } from '@mui/material'
import React from 'react'

export default function Message({ children, severity }) {
    return (
        <Alert severity={severity}>
            { children }
        </Alert>
    )
}
