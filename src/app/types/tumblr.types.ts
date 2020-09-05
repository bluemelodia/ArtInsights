/* The user's own data and blogs. */
export interface TumblrResponseData {
    user: TumblrUserInfo
}

export interface TumblrUserInfo {
    blogs: TumblrUserBlog[],
    following: number,
    likes: number, 
    name: string
}

export interface TumblrUserBlog {
    admin?: boolean, 
    avatar?: TumblrImage[],
    description: string,
    name: string, 
    title: string,
    updated: number,
    url: string,
    uuid: string
}

export interface TumblrImage {
    width: number, 
    height: number, 
    url: string
}

/* Followers and following. */
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

export interface TumblrPhotos {
    alt_sizes: TumblrImage[],
    caption: string,
    original_size: TumblrImage
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