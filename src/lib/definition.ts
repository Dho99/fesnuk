export type User = {
  email: string;
  name: string | null;
  id: string;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Post = {
  id: string;
  user: {
    image: string | null;
    name: string | null;
  };
  description: string | null;
  images: {
    id: string;
    postId: string;
    thumbnail: string;
  }[];
  comments: {
    id: string;
    createdAt: Date;
    postId: string;
    description: string;
    authorId: string;
  }[];
  likes: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export type Like = {
  postId: string;
  userId: string;
  user: {
    image: string | null;
    name: string | null;
  };
};

export type CommentProps = {
  id: string | null;
  description: string | null;
  postId: string | null;
  authorId: string | null;
  createdAt: Date | null;
  author: {
    name: string | null;
  }
};
