import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { logout } from '../../auth';

import useStyles from '../../MainCss';

export default function MainNav() {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static" color="inherit">
                <Toolbar variant="dense">
                    <Typography variant="h5" className={classes.main_title}>
                        <Link href="/">
                            Desofuscador
                        </Link>
                    </Typography>
                    <div style={{marginLeft: "auto"}}>
                        <IconButton edge="end" color="inherit" onClick={logout}>
                            <ExitToAppIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}