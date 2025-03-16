export type User = {
  email: string;
  name: string;
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
    name: string;
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
    name: string;
  };
};

export type CommentProps = {
  id: string | null;
  description: string | null;
  postId: string | null;
  authorId: string | null;
  createdAt: Date | null;
  author: {
    name: string;
    image: string | null;
  }
};


export type Friend = {
  id: string;
  friendListId: string
  userFriendId: string
  friendData: {
    name: string;
    id: string;
    email: string;
    image: string | null;
  }

}

export type FriendList = {
  id: string;
  userId: string
  friends: Friend[]
}



export type Conversation = {
  id: string;
  userId: string;
  user: User;
  rooms: {
    id: string;
    userId: string;
    chatId: string;
    user: User;
  }[];
  messages: {
    id: string;
    message: string;
    senderId: string;
    created_at: Date;
    roomId: string;
  }[];
};