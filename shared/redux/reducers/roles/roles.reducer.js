import {
    ADD_ROLE,
    GET_ROLES,
    UPDATE_ROLE,
} from "@/shared/redux/actions/roles/roles.actions";

const initialState = {
    roles: [],
};

export default function rolesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ROLES:
            return { ...state, roles: action.payload };
        case ADD_ROLE:
            return [...state, action.payload];
        case UPDATE_ROLE:
            return { ...state, role: action.payload };
        default:
            return state;
    }
}