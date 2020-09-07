export interface TwitterUser {
    created_at: string, 
    description: string, 
    followers_count: number,
    friends_count: number, 
    id_str: string, 
    name: string, 
    profile_image_url_https: string, 
    screen_name: string,
    url: string
}

export interface TwitterEntities {
    hashtags: HashTag[],
    media: TwitterMedia[]
}

export interface HashTag {
    text: string
}

export interface TwitterMedia {
    display_url: string, 
    media_url_https: string,
    type: string
}