export interface TumblrUserResponse {
    statusCode: number, 
    responseData?: TumblrResponseData
}

export interface TumblrResponseData {
    user: TumblrUserInfo
}

export interface TumblrUserInfo {
    blogs: [TumblrUserBlog],
    following: number,
    likes: number, 
    name: string
}

export interface TumblrUserBlog {
    admin: boolean, 
    avatar: [AvatarImage],
    description: string,
    name: string, 
    title: string,
    updated: number,
    url: string,
    uuid: string
}

export interface AvatarImage {
    width: number, 
    height: number, 
    url: string
}
