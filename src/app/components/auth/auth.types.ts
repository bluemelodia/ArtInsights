import { Media } from '../../app.consts';

export interface AuthPostResponse {
    statusCode: number,
    mediaType: Media
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
        iconName: 'add.png', 
        alt: 'authorization unattempted' 
    },
    Success : {
        iconName: 'success.png', 
        alt: 'authorization success' 
    },
    Failed : {
        iconName: 'failure.png',
        alt: 'authorization failed' 
    }
}
