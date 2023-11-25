import AllPosts from "../../components/Post/AllPosts";
import PostModal from "../../components/PostModal/PostModal";
import Search from "../../components/Search/Search";
import UserMenu from "../../components/UserMenu/UserMenu";

export default function Home() {
  return (
    <div className="w-[100vw]">
      {/* Top Part - Interactions */}
      <div className="flex items-center justify-between w-[100%] border-b">
        <div className="flex items-center justify-center">
          <Search />
          <PostModal />
        </div>
        <div className="flex items-center justify-center">
          <UserMenu />
        </div>
      </div>

      {/* Main Feed - All Posts */}
      <AllPosts />
    </div>
  );
}
