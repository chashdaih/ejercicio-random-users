import { Avatar, Card, CardContent, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "../../app/models";
import { selectUsers } from "../usersList/usersListSlice";

import { Phone, Mail, Home, Portrait } from '@material-ui/icons'

import { useParams } from "react-router-dom";
import { nationalities } from "../../app/constants";

import styles from '../usersList/UsersList.module.css';

interface RouteParams {
    id: string;
}

const useStyles = makeStyles((theme) => ({
    myCardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  }));

export function UserDetail() {
    const { id } = useParams<RouteParams>();
    const classes = useStyles();
    const [user, setUser] = useState<User>();
    const users = useSelector(selectUsers);

    useEffect(() => {
        if (users) {
            const existingUser = users?.find(user => user.id === parseInt(id));
            setUser(existingUser)
        }
    }, [id, users]);

    if (user) {
        return (
            <Card style={{marginTop: '20px'}}>
                <CardContent className={classes.myCardContent}>
                    <Avatar alt={user.name.first} src={user.picture.large} className={classes.large} />
                    <Typography variant="h3" style={{textAlign: 'center'}}>{ user.name.first + " " + user.name.last }</Typography>
                    <Typography variant="h4" color="textSecondary">{ nationalities.find(nat => nat.value === user.nat)?.name }</Typography>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Portrait />
                            </ListItemAvatar>
                            <ListItemText primary={user.dob.age + " años"} secondary="Edad" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Phone />
                            </ListItemAvatar>
                            <ListItemText primary={user.phone} secondary="Teléfono" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Mail />
                            </ListItemAvatar>
                            <ListItemText primary={user.email} secondary="Correo electrónico" />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Home />
                            </ListItemAvatar>
                            <ListItemText primary={user.location.street.number + " " + user.location.street.name + ", " + user.location.city} secondary="Dirección" />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        )
    } else {
        return (
            <div className={styles.loadingContainer}>
                <CircularProgress />
            </div>
        );
    }
}