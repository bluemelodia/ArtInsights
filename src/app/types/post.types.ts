import { DeviantData } from './deviant.types';

export interface DeviantArtPostResponse {
    metadata: Deviation[];
}

export interface Deviation {
    author: DeviantData,
    description: string, 
    deviationid: string, 
    stats: DeviationStats,
    submission: DeviationSubmission,
    tags: DeviantTags[],
    title: string
}

export interface DeviationStats {
    comments: number, 
    favourites: number, 
    views: number
}
export interface DeviationSubmission {
    category: string,
    creation_time: string
}

export interface DeviantTags {
    tag_name: string;
}