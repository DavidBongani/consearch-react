import * as ActionTypes from './ActionTypes';

export const Lessons = (state = { isLoading: true,
    errMess: null,
    lessons:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LESSONS:
            return {...state, isLoading: false, errMess: null, lessons: action.payload};

        case ActionTypes.LESSONS_LOADING:
            return {...state, isLoading: true, errMess: null, lessons: []}

        case ActionTypes.LESSONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};