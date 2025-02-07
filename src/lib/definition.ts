

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
    postId: string,
    description: string,
    createdAt: Date | null,
    updatedAt: Date | null,
    userId: string
}