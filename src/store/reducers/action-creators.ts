import {AuthActionCreators} from "./auth/action-creators";
import {EventActionCreators} from "./event/action-ceator";

export const allActionCreators = {
    ...AuthActionCreators,
    ...EventActionCreators
}