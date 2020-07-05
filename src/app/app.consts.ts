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
        iconName: '072-deviantart.png', 
        alt: 'deviantArt' 
    },
    Twitter: {
        iconName: '016-twitter-1.png', 
        alt: 'twitter' 
    },
    Tumblr: {
        iconName: '019-tumblr.png',
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