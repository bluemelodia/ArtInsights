export enum Environment {
    Development = 'development',
    Production = 'production'
}

export enum UserAction {
    Login = 'login',
    Logout = 'logout',
    Register = 'register'
}

export enum Media {
    DeviantArt = 'DeviantArt',
    Twitter = 'Twitter',
    Tumblr = 'Tumblr'
}

export enum UserMediaAction {
    Auth = 'auth',
    Follow = 'follow',
    Followers = 'followers',
    Following = 'following',
    Posts = 'posts',
    Tags = 'tag',
    User = 'user',
    Unfollow = 'unfollow'
}

export enum AlertType {
    Error = 'error',
    Info = 'info',
    Success = 'success',
    Warning = 'warning'
}

export interface Alert {
    type: AlertType, 
    message: string
}

export interface MediaAction {
    auth?: string,
    follow?: string,
    followers: string,
    following: string,
    posts: string, 
    tag: string, 
    user?: string,
    unfollow?: string
}

export interface NavItem {
    iconName: string,
    alt: string,
    link?: string,
    name?: string,
}

export const mediaData: { [id: string] : NavItem } = {
    DeviantArt : { 
        iconName: 'deviantart', 
        alt: 'deviantArt',
        link: '/home/deviant-art',
        name: 'Deviant Art'
    },
    Tumblr: {
        iconName: 'tumblr',
        alt: 'tumblr',
        link: '/home/tumblr',
        name: 'Tumblr'
    }
}

/* Don't really need anything beyond tag search at the moment. May add more if needed. */
export const navActions: NavItem[] = [
    {
        iconName: 'tag', 
        alt: 'search by tag',
        link: '/home/tags',
        name: 'Tag Search'
    },
    {
        iconName: 'auth',
        alt: 'authenticate social medias',
        link: '/auth',
        name: 'Add Social Media'
    },
    {
        iconName: 'logout',
        alt: 'log out',
        link: '/logout',
        name: 'Logout'
    }
    /* Engagement : {
        iconName: 'heart', 
        alt: 'post engagement',
        link: '/posts',
        name: 'Post Analytics'
    } */
];

export const AuthTokenKey = 'auth_token';
export const DeviantArtOAuthKey = 'oauth_deviant-art';
export const TumblrOAuthKey = 'oauth_tumblr';