export enum media {
    DeviantArt = 'DeviantArt',
    Twitter = 'Twitter',
    Tumblr = 'Tumblr'
}

export interface Media {
    iconPath: string,
    alt: string
}

export const mediaData = {
    DeviantArt : { 
        iconPath: 'assets/icons/072-deviantart.png', 
        alt: 'deviantArt' 
    },
    Twitter: {
        iconPath: 'assets/icons/016-twitter-1.png', 
        alt: 'twitter' 
    },
    Tumblr: {
        iconPath: 'assets/icons/019-tumblr.png',
        alt: 'tumblr' 
    }
}

export const mediaActions = {
    Tags : {
        iconPath: 'assets/icons/promotion.png', 
        alt: 'search by tag'
    },
    Follows : {
        iconPath: 'assets/icons/follow.png', 
        alt: 'view follower information'
    },
    Engagement : {
        iconPath: 'assets/icons/heart.png', 
        alt: 'post engagement'
    }
}