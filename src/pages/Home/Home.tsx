import AllPosts from "../../components/Post/AllPosts";
import PostModal from "../../components/PostModal/PostModal";
import Search from "../../components/Search/Search";
import Suggestions from "../../components/Suggestions/Suggestions";
import UserMenu from "../../components/UserMenu/UserMenu";

export default function Home() {
  return (
    <div className="w-[100vw]">
      {/* Top Part - Interactions */}
      <div className="flex items-center justify-between min-w-screen">
        <div className="flex items-center justify-center">
          <Search />
          <PostModal />
        </div>
        <div className="flex items-center justify-center">
          <UserMenu />
        </div>
      </div>

      {/* Main Feed - All Posts */}
      <div className="flex">
        <AllPosts />
        <div className="mt-[25px] ml-[100px]">
          <Suggestions />
        </div>
      </div>
    </div>
  );
}
