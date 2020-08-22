import { DeviantData } from './deviant.types';
import { TumblrResponseData } from './tumblr.types';

export interface UserResponse {
    statusCode: number, 
    responseData?: TumblrResponseData | DeviantData
}