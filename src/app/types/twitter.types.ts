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
    hashtags: Hashtag[]
}

export interface Hashtag {
    text: string
}