import { combineReducers } from 'redux';
import {DEFAULT_LIVES} from './Home'

const INITIAL_STATE: User = {
    highScore: 0,
    lives: DEFAULT_LIVES
};

export interface User {
    highScore: number,
    lives: number
}

interface Action {
    type: string,
    payload: any
}

const userReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case 'SET_HIGHSCORE':
            let temp = {...state};
            temp.highScore = action.payload;
            return temp;
        case 'SET_LIVES':
            let temp2 = {...state};
            temp2.lives = action.payload;
            return temp2;
        default:
            return state;
    }
};


export default combineReducers({
    user: userReducer
});