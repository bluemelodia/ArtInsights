import { DeviantData } from './deviant.types';
import { DeviationContent } from './shared.types';
import { DeviationStats } from './tag.types';

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
    tags?: Array<string | DeviantTag>,
    title: string,
    url?: string
}

export interface DeviationSubmission {
    category: string,
    creation_time: string
}

export interface DeviantTag {
    tag_name: string;
}