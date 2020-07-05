export enum media {
    DeviantArt = 'DeviantArt',
    Twitter = 'Twitter',
    Tumblr = 'Tumblr'
}

export interface Media {
    iconName: string,
    alt: string
}

export const mediaData = {
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

export const mediaActions = {
    Tags : {
        iconName: 'promotion.png', 
        alt: 'search by tag'
    },
    Follows : {
        iconName: 'follow.png', 
        alt: 'view follower information'
    },
    Engagement : {
        iconName: 'heart.png', 
        alt: 'post engagement'
    }
}