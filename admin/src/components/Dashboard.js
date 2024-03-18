import * as React from 'react';
import {useSelector} from 'react-redux';
import { Typography } from '@material-ui/core';

export default function Dashboard() {
    const profile = useSelector((state) => state.profileReducer.profile);
    return <Typography>Dashboard - {profile.user.name}</Typography>
}