import { DeviantData } from './deviant.types';
import { TumblrPhotos, TumblrUserBlog } from './tumblr.types';
import { TwitterUser, TwitterEntities } from './twitter.types';
import { DeviationContent, Engagement } from './shared.types';
import { DayOfWeek } from './time.types';

export interface DeviantArtTagResponse {
    estimated_total: number,
    has_more: boolean, 
    next_offset: number,
    results: TaggedDeviation[]
}

export interface TaggedDeviation {
    allows_comments: boolean,
    author: DeviantData,
    category: string,
    content: DeviationContent,
    deviationid: string, 
    is_mature: boolean, 
    preview: DeviationContent,
    published_time: string,
    stats: DeviationStats,
    title: string, 
    thumbs: DeviationContent[]
    url: string
}

export interface TumblrTagResponse {
    blog: TumblrUserBlog,
    blog_name: string,
    body: string,
    caption: string
    date: string,
    format: string,
    id: string,
    link_url: string,
    note_count: number,
    photos: TumblrPhotos[]
    post_url: string,
    tags: string[],
    timestamp: string,
    type: string
}

export interface TwitterTagResponse {
    statuses: TaggedTweet[]
}

export interface TaggedTweet {
    created_at: string, 
    entities: TwitterEntities,
    extended_entities?: TwitterEntities,
    favorite_count: number, 
    id_str: string, 
    in_reply_to_screen_name?: string, 
    in_reply_to_status_id_str?: string,
    in_reply_to_user_id_str?: string,
    possibly_sensitive: boolean,
    retweet_count: number, 
    retweeted_status: TaggedTweet,
    source: string, 
    tags?: string[], // we will move tags into this field
    text: string, 
    user: TwitterUser
}

export interface TagStat {
    count: number,
    engagements: number[],
    totalEngagements: number
}

export interface TagAggregate { [tag: string] : TagStat };

export interface HashTagStat {
    count: number, 
    favorites: number[], 
    totalFavorites: number,
    retweets: number[]
    totalRetweets: number
}

export interface HashTagAggregate { [tag: string] : HashTagStat };

export interface DeviationStats {
    comments: number, 
    favourites: number, 
    views?: number
}

/*
* When you use index types you are just telling typescript 
* what return type you get when a custom type is indexed.
*
* So you just need to tell Typescript that when you index 
* account with a string type, a string type will be returned.
*
* https://stackoverflow.com/questions/56293650/duplicate-string-index-signature-ts2374
*/
export interface DeviationTotalStats { 
    tags: {
        [tag: string] : {
            views: number[],
            favorites: number[],
            comments: number[]
        }
    },
    days: {
        [day: number] : {
            views: number[],
            favorites: number[],
            comments: number[]
        }
    },
    times: {
        [times: number] : {
            views: number[],
            favorites: number[],
            comments: number[],
            day: DayOfWeek[]
        }
    }
}

export interface DeviationAnalytics {
    tags: {
        [tag: string] : {
            views: Engagement,
            favorites: Engagement,
            comments: Engagement
        }
    },
    days: {
        [day: number] : {
            views: Engagement,
            favorites: Engagement,
            comments: Engagement
        }
    },
    times: {
        [times: number] : {
            views: Engagement,
            favorites: Engagement,
            comments: Engagement
        }
    }
}

export interface TwitterStats {
    favorite_count: number, 
    retweet_count: number
}

export interface TwitterEngagement {
    favoriteStats: Engagement,
    retweetStats: Engagement,
    hashtags: {
        [hashtag: string] : Engagement
    }
}

export interface TumblrEngagement {
    stats: Engagement,
    tags: {
        [tag: string] : Engagement
    }
}