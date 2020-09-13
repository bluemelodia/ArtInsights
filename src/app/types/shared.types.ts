import { DeviantData, DeviantListData } from './deviant.types';
import { TumblrResponseData } from './tumblr.types';
import { DeviantArtTagResponse, TumblrTagResponse } from './tag.types';
import { DeviantArtPostResponse } from './post.types';

export interface UserResponse {
    statusCode: number, 
    responseData?: TumblrResponseData | DeviantData | DeviantListData | 
        DeviantArtTagResponse | TumblrTagResponse[] | DeviantArtPostResponse
}

export interface DeviationContent {
    filesize?: number,
    height: number, 
    src: string, 
    transparency: boolean, 
    width: number
}

export interface Engagement {
    average: number, 
    high: number,
    low: number,
    median: number
}
