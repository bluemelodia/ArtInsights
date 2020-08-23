export interface DeviantData {
    type: string, 
    usericon: string,
    userid: string, 
    username: string
}

export interface DeviantWatchers {
    has_more: boolean,
    next_offset: number, 
    results:[DeviantWatcher]
}

export interface DeviantWatcher {
    is_watching: boolean,
    lastvisit: string, 
    user: DeviantData
}

