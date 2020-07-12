import { media, userAction, MediaAction } from './app.consts';

const baseUrl = 'https://artinsights.ue.r.appspot.com';

const mediaActionMap: { [id: string] : MediaAction } = {
    [media.DeviantArt]: {
        [userAction.Followers]: '', 
        [userAction.Following]: '', 
        [userAction.Posts]: '',
        [userAction.Tags]: ''
    },
    [media.Tumblr]: {
        [userAction.Auth]: 'auth',
        [userAction.Follow]: 'follow',
        [userAction.Followers]: 'followers', 
        [userAction.Following]: 'following', 
        [userAction.Posts]: 'blog',
        [userAction.Tags]: 'tag',
        [userAction.Unfollow]: 'unfollow'
    },
    [media.Twitter]: {
        [userAction.Followers]: '', 
        [userAction.Following]: '',  
        [userAction.Posts]: 'tweets',
        [userAction.Tags]: 'search'
    }
}

function endpointForSite(site: media, userAction: userAction) {
    let endpoint;
    let action;

    switch(site) {
        case media.DeviantArt:
            endpoint = 'art';
            action = mediaActionMap[media.DeviantArt][userAction];
            break;
        case media.Twitter:
            endpoint = 'twitter';
            action = mediaActionMap[media.Twitter][userAction];
            break;
        case media.Tumblr:
            endpoint = 'tumblr';
            action = mediaActionMap[media.Tumblr][userAction];
            break;
    }

    return `${endpoint}/${action}`;
}

export function urlForSite(site: media, userAction: userAction) {
    return `${baseUrl}/${endpointForSite(site, userAction)}`;
}