import { DeviantData, DeviantListData } from './deviant.types';
import { TumblrResponseData } from './tumblr.types';
import { DeviantArtTagResponse, TumblrTagResponse } from './tag.types';

export interface UserResponse {
    statusCode: number, 
    responseData?: TumblrResponseData | DeviantData | DeviantListData | DeviantArtTagResponse | TumblrTagResponse[]
}