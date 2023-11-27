export interface SingUpData {
  name: string;
  password: string;
  email: string;
  username: string;
}

export interface SingInData {
  username?: string;
  email?: string;
  password: string;
}

export interface PostData {
  content: string;
  parentId?: string;
  images?: File[];
}

export interface Post {
  id: string;
  content: string;
  parentId?: string;
  images?: string[];
  createdAt: Date;
  authorId: string;
  author: Author;
  reactions: Reaction[];
  comments: Post[];
}

export interface Reaction {
  id: string;
  type: string;
  createdAt: Date;
  userId: string;
  postId: string;
  updatedAt: Date;
  deletedAt?: Date;
}
export interface Author {
  id: string;
  userId?: string;
  name?: string;
  username: string;
  profilePicture?: string;
  private: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  name?: string;
  username: string;
  profilePicture?: string;
  private: boolean;
  createdAt: Date;
  followers: Author[];
  following: Author[];
  posts: Post[];
}

export interface MessageDTO {
  userId?: string;
  id?: string;
  content: string;
  createdAt: Date;
  chatId: string;
  senderId: string;
  sender?: Author;
  me?: boolean;
}

export interface ChatDTO {
  id: string;
  users: Author[];
  messages: MessageDTO[];
}

export interface Chatroom {
  id: string;
  users: Author[];
  lastMessage: Message;
}

export interface Message {
  content: string;
  createdAt: Date;
  chatroomId: string;
  senderId: string;
}
