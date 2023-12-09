export interface PostData {
  imageUrl: string;
  _id(_id: string): unknown;
  id: number;
  title: string;
  postUrl: string;
  likes: string[];
}

export interface Post {
  imageUrl: string | undefined;
  _id: string;
}

export interface User {
  _id: string;
  username?: string;
  email?: string;
  fullname?: string;
  profilePhoto?: string;
  password?: string;
  posts: Post[];
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
