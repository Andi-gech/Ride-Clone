import { combineReducers } from "redux";
import CorrdinateReducer from "./CorrdinateReducer";

const reducer = combineReducers({
    corrdinate: CorrdinateReducer
});

export default reducer