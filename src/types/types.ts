export interface PostData {
  imageUrl: string;
  _id(_id: string): unknown;
  id: string;
  title: string;
  postPhoto: string;
  likes: string[];
  comments: Comment[];
  user: {
    username: string;
    _id: string;
    profilePhoto: string;
  };
}

export interface Post {
  imageUrl: string | undefined;
  _id: string;
  postUrl: string;
  title: string;
  likes: [];
  comments: [];
  id: string;
}

export interface User {
  id: string;
  _id: string;
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

export interface Comment {
  comment: string;
  user: {
    username: string;
  };
}
