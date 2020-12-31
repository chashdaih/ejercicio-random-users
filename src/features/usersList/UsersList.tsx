import React, { useState } from 'react';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";
import {Delete} from '@material-ui/icons';

import styles from './UsersList.module.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, filterUsers, selectUsers } from './usersListSlice';
import { User } from '../../app/models';
import { FiltersCard } from './FiltersCard';


export function UsersList() {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const users = useSelector(selectUsers);
    const dispatch = useDispatch();

    const history = useHistory();


    function navigateToDetail(id: number) {
        history.push('/detail/' + id)
    }

    function ListItems() {
        const usersListArray = users?.length ? users!.map(user => 
        <ListItem key={user.id} button onClick={() => navigateToDetail(user.id)}>
            <ListItemAvatar>
            <Avatar alt={user.name.first} src={user.picture.thumbnail} />
            </ListItemAvatar>
            <ListItemText
            primary={user.name.first + " " + user.name.last}
            secondary={user.email}
            />
            <ListItemSecondaryAction>
            <IconButton onClick={() => handleOpen(user)} edge="end" aria-label="delete">
                <Delete />
            </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
        ) : 
        <ListItem>No se encontraron registros</ListItem>;
        return usersListArray
    } 

    function handleOpen (user: User) {
        setSelectedUser(user);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        dispatch(deleteUser(selectedUser!.id));
        dispatch(filterUsers())
        setOpen(false);
    }
    
    if (users) {
        return (
            <>
            <FiltersCard />
            <List className={styles.mainList}>
                {ListItems()}
            </List>
            {/* delete dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Borrar usuario</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`¿Está seguro que quiere eliminar al usuario ${selectedUser?.name.first} ${selectedUser?.name.last}?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
            </>
        )
    } else {
        return (
            <div className={styles.loadingContainer}>
                <CircularProgress/>
            </div>
        );
    }
}