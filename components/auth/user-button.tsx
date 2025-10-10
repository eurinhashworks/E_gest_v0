import { UserButton } from "@clerk/nextjs";

export const UserProfileButton = () => {
  return <UserButton afterSignOutUrl="/" />;
};