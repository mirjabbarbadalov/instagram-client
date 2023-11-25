import AllPosts from "../../components/Post/AllPosts";
import PostModal from "../../components/PostModal/PostModal";

export default function Home() {
  return (
    <div className="flex">
      <AllPosts />
      <PostModal />
    </div>
  );
}
