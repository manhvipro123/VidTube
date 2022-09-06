import { VideoState } from "../states/video.state";
import * as VideoActions from "../actions/video.action";
import { createReducer, on } from "@ngrx/store";
import { Video } from "../models/video.model";

const inititalState: VideoState = {
    isLoading: false,
    videoList: [],
    error: "",
    idToken: "",
    videoLoad: <Video>{},
    _id: "",
    filePath: "",
    isSuccess: false
}

export const videoReducer = createReducer(
    inititalState,

    /////////////////////////////////////////////////////////////////////////////
    on(VideoActions.getAllVideos, (state, action) => {
        let newState = {
            ...state,
            videoList: [],
            isLoading: true,
            idToken: action.idToken,
        }
        // console.log(newState.idToken);
        console.log(action.type)
        return newState;
    }),
    on(VideoActions.getAllVideosSuccess, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            videoList: action.videoList
        }
        console.log(action.type,newState.videoList);
        return newState
    }),
    on(VideoActions.getAllVideosFailure, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            error: action.error
        }
        console.log(action.error);
        return newState
    }),

    //////////////////////////////////////////////////////////////
    on(VideoActions.loadVideo, (state, action) => {
        let newState = {

            ...state,
            isLoading: true,
            _id: action._id
        }
        console.log(action.type);
        return newState
    }),
    on(VideoActions.loadVideoSuccess, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            videoLoad: action.video
        }
        console.log(action.type,action.video);
        return newState;
    }),
    on(VideoActions.loadVideoFailure, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            error: action.error
        }
        console.log(newState.error);
        return newState;
    }),

    //////////////////////////////////////////////////////////////////
    on(VideoActions.getEntireVideos, (state, action) => {
        let newState = {
            ...state,
            isLoading: true,
            _id: action._id
        }
        console.log(action.type);
        return newState
    }),
    on(VideoActions.getEntireVideosSuccess, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            videoList: action.videoList
        }
        console.log(action.type,newState.videoList);
        return newState
    }),
    on(VideoActions.getEntireVideosFailure, (state, action) => {
        let newState = {

            ...state,
            isLoading: false,
            error: action.error
        }
        console.log(newState.error);
        return newState
    }),

    //////////////////////////////////////////////////////////////////
    on(VideoActions.createVideoInfo, (state, action) => {
        let newState = {
            ...state,
            isLoading: true,
            idToken: action.idToken,
            videoLoad: action.video
        }
        console.log(action.type);
        return newState
    }),
    on(VideoActions.createVideoInfoSuccess, (state, action) => {
        let newState = {
            ...state,
            idToken: "",
            isLoading: false,
            isSuccess: true
        }
        console.log(action.type, action.videoInfo);
        return newState
    }),
    on(VideoActions.createVideoInfoFailure, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            error: action.error
        }
        console.log(newState.error);
        return newState
    }),

    //////////////////////////////////////////////////////////////////
    on(VideoActions.uploadVideo, (state, action) => {
        let newState = {
            ...state,
            isLoading: true,
            idToken: action.idToken,
        }
        console.log(action.type);
        return newState
    }),
    on(VideoActions.uploadVideoSuccess, (state, action) => {
        let newState = {
            ...state,
            idToken: "",
            isLoading: false,
            filePath: action.filePath
        }
        console.log(action.type, action.filePath);
        return newState
    }),
    on(VideoActions.uploadVideoFailure, (state, action) => {
        let newState = {
            ...state,
            idToken: "",
            isLoading: false,
            error: action.error
        }
        console.log(newState.error);
        return newState
    }),


    /////////////////////////////////////////////////////////////
    on(VideoActions.countViewsVideo, (state, action) => {
        let newState = {
            ...state,
            isLoading: true,
            _id: action._id
        }
        return newState;
    }),
    on(VideoActions.countViewsVideoSuccess, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
        }
        console.log(new Date().toLocaleTimeString(), action.views);
        return newState;
    }),
    on(VideoActions.countViewsVideoFailure, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            error: action.error,
        }
        console.log(action.error);
        return newState;
    }),

    ///////////////////////////////////////////////////////////////////////
    on(VideoActions.likeVideo, (state, action) => {
        let newState = {
            ...state,
            isLoading: true,
            _id: action._id,
            idToken: action.idToken
        }
        console.log(action.type);
        return newState;
    }),
    on(VideoActions.likeVideoSuccess, (state, action) => {
        let newState = {
            ...state,
            _id: "",
            idToken: "",
            isLoading: false,
        }
        console.log(action.type);
        return newState;
    }),

    on(VideoActions.likeVideoFailure, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            error: action.error,
            _id: "",
            idToken: "",
        }
        console.log(action.type);
        return newState;
    }),

    ///////////////////////////////////////////////////////////////////////
    on(VideoActions.unlikeVideo, (state, action) => {
        let newState = {
            ...state,
            isLoading: true,
            _id: action._id,
            idToken: action.idToken
        }
        console.log(action.type);
        return newState;
    }),
    on(VideoActions.unlikeVideoSuccess, (state, action) => {
        let newState = {
            ...state,
            _id: "",
            idToken: "",
            isLoading: false,
        }
        console.log(action.type);
        return newState;
    }),
    on(VideoActions.unlikeVideoFailure, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            error: action.error,
            _id: "",
            idToken: "",
        }
        console.log(action.type);
        return newState;
    }),

    ///////////////////////////////////////////////////////////////////////
    on(VideoActions.dislikeVideo, (state, action) => {
        let newState = {
            ...state,
            isLoading: true,
            _id: action._id,
            idToken: action.idToken
        }
        console.log(action.type);
        return newState;
    }),
    on(VideoActions.dislikeVideoSuccess, (state, action) => {
        let newState = {
            ...state,
            _id: "",
            idToken: "",
            isLoading: false,
        }
        console.log(action.type);
        return newState;
    }),

    on(VideoActions.dislikeVideoFailure, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            error: action.error,
            _id: "",
            idToken: "",
        }
        console.log(action.type);
        return newState;
    }),

    ///////////////////////////////////////////////////////////////////////
    on(VideoActions.undislikeVideo, (state, action) => {
        let newState = {
            ...state,
            isLoading: true,
            _id: action._id,
            idToken: action.idToken
        }
        console.log(action.type);
        return newState;
    }),
    on(VideoActions.undislikeVideoSuccess, (state, action) => {
        let newState = {
            ...state,
            _id: "",
            idToken: "",
            isLoading: false,
        }
        console.log(action.type);
        return newState;
    }),
    on(VideoActions.undislikeVideoFailure, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            error: action.error,
            _id: "",
            idToken: "",
        }
        console.log(action.type);
        return newState;
    }),


)