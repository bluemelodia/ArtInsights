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
    link?: string
}

export const mediaData: { [id: string] : NavItem } = {
    DeviantArt : { 
        iconName: 'deviantart.png', 
        alt: 'deviantArt' 
    },
    Twitter: {
        iconName: 'twitter.png', 
        alt: 'twitter' 
    },
    Tumblr: {
        iconName: 'tumblr.png',
        alt: 'tumblr',
        link: '/tumblr'
    }
}

export const navActions: { [id: string] : NavItem } = {
    Tags : {
        iconName: 'promotion.png', 
        alt: 'search by tag'
    },
    Follows : {
        iconName: 'follow.png', 
        alt: 'view follower information',
        link: '/following'
    },
    Engagement : {
        iconName: 'heart.png', 
        alt: 'post engagement'
    }
}

export const AuthTokenKey = 'auth_token';
export const DeviantArtOAuthKey = 'oauth_deviant-art';
export const TumblrOAuthKey = 'oauth_tumblr';