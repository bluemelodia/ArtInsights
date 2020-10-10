export enum Environment {
    Development = 'development',
    Production = 'production'
}

export const viewTiers = [0, 50, 100, 250, 500, 1000];
export const faveTiers = [0, 25, 50, 100, 250, 500];

/* Comments are the rarest form of engagement, so make the tiers the most lenient. */
export const commentTiers = [0, 5, 10, 25, 50, 100];

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

export const homeActions: NavItem[] = [
    { 
        iconName: 'deviantart', 
        alt: 'deviantArt',
        link: '/home/deviant-art',
        name: 'Deviant Art'
    },
    {
        iconName: 'tumblr',
        alt: 'tumblr',
        link: '/home/tumblr',
        name: 'Tumblr'
    },
    {
        iconName: 'tag', 
        alt: 'search by tag',
        link: '/home/tags',
        name: 'Tag Search'
    },
];

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
        alt: 'social media authentication settings',
        link: '/auth',
        name: 'Social Media Settings'
    },
    {
        iconName: 'logout',
        alt: 'log out',
        link: '/login',
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