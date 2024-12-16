export const  destination = (data) => {
    return {
        type: "destination",
        payload: data
    }
}
export const  source = (data) => {
    return {
        type: "source",
        payload: data
    }
}