import { Media, UserAction } from '../../app.consts';

export interface AuthPostResponse {
    statusCode: number,
    mediaType: Media
}

export interface AuthRedirectResponse {
    redirect: string,
    mediaType: Media
}

export interface LoginPostResponse {
    statusCode: number,
    responseData?: string
    errorMsg?: string,
    userAction?: UserAction
}

export enum AuthStatus {
    Unattempted = 'Unattempted',
    Failed = 'Failed',
    Success = 'Success'
}

export interface AuthStatusItem {
    iconName: string,
    alt: string
}

export const authMediaData: { [id: string] : AuthStatusItem } = {
    Unattempted : { 
        iconName: 'add', 
        alt: 'authorization unattempted' 
    },
    Success : {
        iconName: 'success', 
        alt: 'authorization success' 
    },
    Failed : {
        iconName: 'failure',
        alt: 'authorization failed' 
    }
}
