export interface User {
    following: boolean,
    name: string, 
    updated: number,
    url: string
}

export interface Blog {
    name: string, 
    title: string,
    updated: number,
    url: string 
}

export interface BlogResponse {
    statusCode: number,
    responseData: Followers | Following
}

export interface Followers {
    total_users: number,
    users: User[],
}

export interface Following {
    total_users: number,
    blogs: Blog[],
}