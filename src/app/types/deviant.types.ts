export interface WatchResponse {
    statusCode: number,
    responseData: DeviantWatchResponse
}

export interface DeviantWatchResponse {
    error?: string, 
    error_description?: string,
    scope?: string, 
    status?: string
}

export interface DeviantData {
    type: string, 
    usericon: string,
    userid: string, 
    username: string
}

export interface DeviantListData {
    has_more: boolean,
    next_offset: number, 
    results:[DeviantWatcher | DeviantFriend]
}

export interface DeviantWatcher {
    is_watching: boolean,
    lastvisit: string, 
    user: DeviantData
}

export interface DeviantFriend {
    is_watching: boolean,
    watches_you: boolean,
    user: DeviantData
}

