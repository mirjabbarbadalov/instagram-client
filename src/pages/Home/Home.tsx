import AllPosts from "../../components/Post/AllPosts";
import PostModal from "../../components/PostModal/PostModal";
import Search from "../../components/Search/Search";
import Suggestions from "../../components/Suggestions/Suggestions";
import UserMenu from "../../components/UserMenu/UserMenu";

export default function Home() {
  return (
    <div className="w-[100vw] ml-[100px]">
      {/* Top Part - Interactions */}
      <div className="flex items-center justify-between min-w-screen">
        <div className="flex items-center justify-center z-0">
          <Search />
          <PostModal />
        </div>
        <div className="flex items-center justify-center">
          <UserMenu />
        </div>
      </div>

      {/* Main Feed - All Posts */}
      <div className="flex ">
        <AllPosts isFriend={false} isProfile={false} />
        <div className="mt-[35px] ml-[250px]">
          <Suggestions />
        </div>
      </div>
    </div>
  );
}
