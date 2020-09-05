import { DeviantData } from './deviant.types';
import { TumblrPhotos, TumblrUserBlog } from './tumblr.types';

export interface TumblrTagResponse {
    blog: TumblrUserBlog,
    blog_name: string,
    body: string,
    caption: string
    date: string,
    format: string,
    id: string,
    note_count: number,
    photos: TumblrPhotos[]
    post_url: string,
    tags: string[],
    timestamp: string,
    type: string
}

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

export interface DeviationContent {
    filesize?: number,
    height: number, 
    src: string, 
    transparency: boolean, 
    width: number
}

export interface DeviationStats {
    comments: number, 
    favourites: number
}

export interface Engagement {
    average: number, 
    high: number,
    low: number,
    median: number
}

export interface TagStat {
    count: number,
    engagements: number[],
    totalEngagements: number
}

export interface TagAggregate { [tag: string] : TagStat };

export interface TumblrEngagement {
    stats: Engagement,
    tags: {
        [tag: string] : Engagement
    }
}