import { DeviantData } from './deviant.types';

export interface DeviantArtTagResponse {
    estimated_total: number,
    has_more: boolean, 
    next_offset: number,
    results: [ TaggedDeviation ]
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
    thumbs: [ DeviationContent ]
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