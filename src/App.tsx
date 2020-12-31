import React, { useEffect, useState } from 'react';

import { Switch, Route, Link, useLocation } from "react-router-dom";
import { AppBar, CircularProgress, Container, IconButton, makeStyles, Snackbar, Toolbar, Typography } from '@material-ui/core';
import { CloudDownload, ArrowBack, Close} from '@material-ui/icons'
import { UsersList } from './features/usersList/UsersList';
import { UserDetail } from './features/userDetail/UserDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, selectUsers } from './features/usersList/usersListSlice';
import { downloadCSV } from './app/helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mainContainer: {
    paddingBottom: '20px',
  },
}));

function App() {
  
  const classes = useStyles();
  const location = useLocation();
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  
  useEffect(() => {
      if (!users) {
          dispatch(getUsers());
      }
  }, [users, dispatch])
  
  // descarga
  const [progress, setProgress] = useState(0);
  const [fileDone, setFileDone] = useState(true);
  const handleDownload = () => {
    console.log('set interval', progress, fileDone)
    setFileDone(false)
    setOpen(true)
    const downloadInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >=100) {
          clearInterval(downloadInterval);
          setFileDone(true)
          setOpen(false)
          if (users) {
            downloadCSV(users)
          }
          return 0;
        } else {
          return prev + 10;
        }
      });
    }, 200);
  }
  // snackbar
  const [open, setOpen] = React.useState(false);
  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };


  let backButton, barTitle, downloadButton;
  if (location.pathname === '/') {
    backButton = null;
    barTitle = "Lista de usuarios";
    if (fileDone) {
      downloadButton = <IconButton onClick={handleDownload} aria-label="download CSV">
      <CloudDownload htmlColor="white" />
    </IconButton>;
    } else {
      downloadButton = <CircularProgress color="secondary" variant="determinate" value={progress} />
    }
  } else {
    backButton = <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
    <Link to="/"><ArrowBack style={{color:'white'}} /></Link>
    </IconButton>;
    barTitle = "Detalle";
    downloadButton = null
  }

  return (

    <div style={{backgroundColor: '#eeeeee', minHeight: '100vh'}} className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {backButton}
          <Typography variant="h6" className={classes.title}>{barTitle}</Typography>
          {downloadButton}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.mainContainer} >
        <Switch>
          <Route path="/detail/:id">
            <UserDetail />
          </Route>
          <Route path="/">
            <UsersList />
          </Route>
        </Switch>
      </Container>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Procesando descarga..."
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>

  );
}

export default App;
