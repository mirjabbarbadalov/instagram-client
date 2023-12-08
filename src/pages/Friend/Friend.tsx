interface UserDetails {
  username: string;
}

export default function Friend({ userDetails }: { userDetails: UserDetails }) {
  return (
    <div className="flex flex-col">
      <h1>{userDetails.username}</h1>
    </div>
  );
}
