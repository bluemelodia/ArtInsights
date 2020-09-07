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
        link: '/deviant-art',
        name: 'Deviant Art'
    },
    Tumblr: {
        iconName: 'tumblr',
        alt: 'tumblr',
        link: '/tumblr',
        name: 'Tumblr'
    }
}

export const navActions: { [id: string] : NavItem } = {
    Tags : {
        iconName: 'tag', 
        alt: 'search by tag',
        link: '/tags',
        name: 'Tag Search'
    },
    Engagement : {
        iconName: 'heart', 
        alt: 'post engagement',
        name: 'Post Analytics'
    }
}

export const AuthTokenKey = 'auth_token';
export const DeviantArtOAuthKey = 'oauth_deviant-art';
export const TumblrOAuthKey = 'oauth_tumblr';