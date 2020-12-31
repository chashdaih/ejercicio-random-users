import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../app/models";
import { AppThunk, RootState } from "../../app/store";


interface UsersListState {
    users?: User[],
    filteredUsers?: User[],
    gender: string,
    nationality: string,
    startAge: number,
    endAge: number,
    panelOpen: boolean,
}

const initialState: UsersListState = {
    panelOpen: false,
    gender: 'all',
    nationality: 'all',
    startAge: 0,
    endAge: 100,
};

export const usersListSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.filteredUsers = action.payload;
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users?.filter(user => user.id !== action.payload);
        },
        // filtros
        setGender: (state, action: PayloadAction<string>) => { state.gender = action.payload },
        setNationality: (state, action: PayloadAction<string>) => { state.nationality = action.payload },
        setStartAge: (state, action: PayloadAction<number>) => { state.startAge = action.payload },
        setEndAge: (state, action: PayloadAction<number>) => { state.endAge = action.payload },
        filterUsers: (state) => {
            state.filteredUsers = state.users?.filter(user => {
                if (state.gender !== 'all' && state.gender !== user.gender) return false;
                if (state.nationality !== 'all' && state.nationality !== user.nat) return false;
                if (state.startAge > user.dob.age) return false;
                if (state.endAge < user.dob.age) return false;
                return true;
            })
        },
        togglePanelState: (state) => {
            state.panelOpen = !state.panelOpen;
        }
    }
});

export const { setUsers, deleteUser, setGender, setNationality, setStartAge, setEndAge, filterUsers, togglePanelState } = usersListSlice.actions;

export const getUsers = (): AppThunk => dispatch => {
    fetch('https://randomuser.me/api/?page=1&results=50&seed=semilla&exc=id,login')
    .then(res => res.json())
    .then(res => {
        // El API regresa muchos id's null
        // como solución, el id será la posición inicial en array (empezando desde 1)
        for (let i = 0; i < res.results.length; i++) {
            res.results[i].id = i + 1; 
        }
        dispatch(setUsers(res.results));
    })
    .catch(error => console.error('fetch error', error))
}

export const selectUsers = (state: RootState) => state.users.filteredUsers;
export const selectGender = (state: RootState) => state.users.gender;
export const selectNationality = (state: RootState) => state.users.nationality;
export const selectStartAge = (state: RootState) => state.users.startAge;
export const selectEndAge = (state: RootState) => state.users.endAge;

export const selectPanelState = (state: RootState) => state.users.panelOpen;

export default usersListSlice.reducer;