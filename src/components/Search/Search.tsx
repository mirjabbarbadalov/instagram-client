export default function Search() {
  return (
    <div>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search"
        className="cursor-pointer outline-none mt-3 mb-7 py-2 w-[400px] text-center border border-gray-300 rounded-2xl focus:placeholder-gray-200 focus:border-black"
      />
    </div>
  );
}
