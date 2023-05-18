type UserProfileProps = {
  name: string;
  imageUrl: string;
  bio: string;
};

const UserProfile: React.FC<UserProfileProps> = ({ name, imageUrl, bio }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-4 p-4">
      <img
        className="h-24 w-24 rounded-full mx-auto"
        src={imageUrl}
        alt={name}
      />
      <div className="text-lg font-bold">{name}</div>
      <div className="text-sm text-gray-500">{bio}</div>
    </div>
  );
};

export default UserProfile;
