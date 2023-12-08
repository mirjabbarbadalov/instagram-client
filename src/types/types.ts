export interface PostData {
  imageUrl: string;
  _id(_id: string): unknown;
  id: number;
  title: string;
  postUrl: string;
  likes: string[];
}

export interface Post {
  _id: string;
}

export interface User {
  _id: string;
  username?: string;
  password?: string;
  email?: string;
  fullname?: string;
  googleId?: string;
  posts: Post[];
  profilePhoto?: string;
  followers: User[];
  following: User[];
}

export interface State {
  user: {
    users: User[];
    loading: string;
    error: string;
  };
}
