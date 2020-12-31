import React from 'react'
import { Card, CardContent, CardHeader, Collapse, createStyles, FormControl, IconButton, InputLabel, makeStyles, MenuItem, Select, Slider, Theme, Typography } from '@material-ui/core';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nationalities } from '../../app/constants';
import { filterUsers, selectEndAge, selectGender, selectNationality, selectPanelState, selectStartAge, setEndAge, setGender, setNationality, setStartAge, togglePanelState } from './usersListSlice';
import { ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardContent: {
            textAlign: 'center',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            width: '80%',
        },
    }),
);

export function FiltersCard() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const panelOpen = useSelector(selectPanelState);
    const gender = useSelector(selectGender);
    const nationality = useSelector(selectNationality);
    const startAge = useSelector(selectStartAge);
    const endAge = useSelector(selectEndAge);
    
    function NationalityMenuItems() {
        return nationalities.map(nat => <MenuItem key={nat.value} value={nat.value} >{nat.name}</MenuItem>)
    }
    const handleExpandClick = () => {
        dispatch(togglePanelState())
    };
    const handleGenderChange = (event: ChangeEvent<{value: unknown}>) => {
        dispatch(setGender(event.target.value as string));
        dispatch(filterUsers());
    };
    const handleNationalityChange = (event: ChangeEvent<{value: unknown}>) => {
        console.log(event.target.value)
        dispatch(setNationality(event.target.value as string));
        dispatch(filterUsers());
    };
    const handleAgeRangeChange = (event: any, newValue: number | number[]) => {
        const valueArray = newValue as number[];
        console.log(valueArray)
        dispatch(setStartAge(valueArray[0]));
        dispatch(setEndAge(valueArray[1]));
    };
    const marks = [
        { value: 0, label: '0', },
        { value: 50, label: '50', },
        { value: 100, label: '100', },
    ];


    return (
        <Card style={{marginTop: '20px'}}>
            <CardHeader
                subheader="Filtros"
                action={
                    <IconButton onClick={handleExpandClick} aria-label="filtros">
                        <ExpandMore aria-expanded={panelOpen} aria-label="Ver filtros" />
                    </IconButton>
                }
            />
            <Collapse in={panelOpen}>
                <CardContent className={classes.cardContent}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="gender-label">Genero</InputLabel>
                        <Select
                        labelId="gender-label"
                        id="gender-select"
                        value={gender}
                        onChange={handleGenderChange}
                        >
                            <MenuItem value="all" >Todos</MenuItem>
                            <MenuItem value="female">Mujer</MenuItem>
                            <MenuItem value="male">Hombre</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="nationality-label">Nacionalidad</InputLabel>
                        <Select
                        labelId="nationality-label"
                        id="nationality-select"
                        value={nationality}
                        onChange={handleNationalityChange}
                        >
                            {NationalityMenuItems()}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                    <Typography id="range-slider" gutterBottom>
                        Rango de edad
                    </Typography>
                    <Slider
                        value={[startAge, endAge]}
                        onChange={handleAgeRangeChange}
                        onChangeCommitted={() => dispatch(filterUsers())}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        marks={marks}
                    />
                    </FormControl>
                </CardContent>
            </Collapse>
        </Card>
    )
}