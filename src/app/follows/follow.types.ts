export interface Deviant {
    user: DeviantUserInfo,
    is_watching: boolean, 
    watches_you: boolean
}

export interface DeviantUserInfo {
    userid: string,
    username: string,
    usericon: string,
    type: string
}

export interface TumblrUser {
    following: boolean,
    name: string, 
    updated: number,
    url: string
}

export interface TumblrBlog {
    name: string, 
    title: string,
    updated: number,
    url: string 
}

export interface TumblrBlogResponse {
    statusCode: number,
    responseData: TumblrFollowers | TumblrFollowing
}

export interface TumblrFollowers {
    total_users: number,
    users: TumblrUser[],
}

export interface TumblrFollowing {
    total_users: number,
    blogs: TumblrBlog[],
}