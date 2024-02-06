export const ADD = (item) => {
    return {
        type: "ADD_CART",
        payload: item
    }
}

// remove iteams
export const Delete = (item) => {
    return {
        type: "RMV_CART",
        payload: item
    }
}

// remove individual iteam

export const REMOVE = (item) => {
    return {
        type: "RMV_ONE",
        payload: item
    }
}