export enum media {
    DeviantArt = 'DeviantArt',
    Twitter = 'Twitter',
    Tumblr = 'Tumblr'
}

export enum userAction {
    Auth = 'auth',
    Follow = 'follow',
    Followers = 'followers',
    Following = 'following',
    Posts = 'posts',
    Tags = 'tag',
    Unfollow = 'unfollow'
}

export interface MediaAction {
    auth?: string,
    follow?: string,
    followers: string,
    following: string,
    posts: string, 
    tag: string, 
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
        alt: 'tumblr' 
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
