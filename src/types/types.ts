export interface PostData {
  imageUrl: string;
  _id(_id: string): unknown;
  id: number;
  title: string;
  postUrl: string;
  likes: string[];
  comments: string[];
}

export interface Post {
  imageUrl: string | undefined;
  _id: string;
}

export interface User {
  id: string;
  username?: string;
  email?: string;
  fullName: string;
  profilePhoto?: string;
  password?: string;
  posts: Post[];
  followers: [];
  following: [];
}

export interface State {
  user: {
    users: User[];
    loading: string;
    error: string;
  };
}
