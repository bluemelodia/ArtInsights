import { DeviantData, DeviantListData } from './deviant.types';
import { TumblrResponseData } from './tumblr.types';
import { DeviantArtTagResponse } from './tag.types';

export interface UserResponse {
    statusCode: number, 
    responseData?: TumblrResponseData | DeviantData | DeviantListData | DeviantArtTagResponse
}