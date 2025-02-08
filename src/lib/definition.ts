

export type User = {
    email: string;
    name: string | null;
    id: string;
    password: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type Post = {
    postId?: string;
    description?:  string;
    images?:  string
    createdAt?:  Date
    updatedAt?:  Date
    userId?:  string
    comment?:  string
    likes?:  string
}

export type CommentProps = {
    postId: string;
};