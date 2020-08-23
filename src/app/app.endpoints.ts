import { Media, UserAction, UserMediaAction, MediaAction } from './app.consts';

const baseUrl = 'https://artinsights.ue.r.appspot.com';

const mediaActionMap: { [id: string] : MediaAction } = {
    [Media.DeviantArt]: {
        [UserMediaAction.Auth]: 'auth',
        [UserMediaAction.Followers]: 'watchers', 
        [UserMediaAction.Following]: '', 
        [UserMediaAction.Posts]: '',
        [UserMediaAction.Tags]: '',
        [UserMediaAction.User]: 'user',
    },
    [Media.Tumblr]: {
        [UserMediaAction.Auth]: 'auth',
        [UserMediaAction.Follow]: 'follow',
        [UserMediaAction.Followers]: 'followers', 
        [UserMediaAction.Following]: 'following', 
        [UserMediaAction.Posts]: 'blog',
        [UserMediaAction.Tags]: 'tag',
        [UserMediaAction.User]: 'user',
        [UserMediaAction.Unfollow]: 'unfollow'
    },
    [Media.Twitter]: {
        [UserMediaAction.Followers]: '', 
        [UserMediaAction.Following]: '',  
        [UserMediaAction.Posts]: 'tweets',
        [UserMediaAction.Tags]: 'search'
    }
}

export function urlForAction(userAction: UserAction) {
    return `${baseUrl}/${endpointForAction(userAction)}`;
}

function endpointForAction(userAction: UserAction) {
    let endpoint; 
    switch(userAction) {
        case UserAction.Login:
            endpoint = 'login';
            break;
        case UserAction.Register:
            endpoint = 'register';
            break;
    }
    return endpoint;
}

export function urlForSite(site: Media, userMediaAction: UserMediaAction) {
    return `${baseUrl}/${endpointForSite(site, userMediaAction)}`;
}

function endpointForSite(site: Media, userMediaAction: UserMediaAction) {
    let endpoint;
    let action;

    switch(site) {
        case Media.DeviantArt:
            endpoint = 'art';
            action = mediaActionMap[Media.DeviantArt][userMediaAction];
            break;
        case Media.Twitter:
            endpoint = 'twitter';
            action = mediaActionMap[Media.Twitter][userMediaAction];
            break;
        case Media.Tumblr:
            endpoint = 'tumblr';
            action = mediaActionMap[Media.Tumblr][userMediaAction];
            break;
    }

    return `${endpoint}/${action}`;
}