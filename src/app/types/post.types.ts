import { DeviantData } from './deviant.types';
import { DeviationContent } from './shared.types';

export interface DeviantArtPostResponse {
    metadata: Deviation[],
    deviations: Deviation[]
}

export interface Deviation {
    author: DeviantData,
    category?: string,
    category_path?: string,
    content?: DeviationContent,
    description: string, 
    deviationid: string, 
    published_time?: string,
    stats: DeviationStats,
    submission: DeviationSubmission,
    tags: DeviantTags[],
    title: string,
    url?: string
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