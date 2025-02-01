

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