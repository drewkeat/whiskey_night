"use client";
import Typography from "@mui/material/Typography";
import { useSession } from "@/contexts/SessionContext";
interface UserBadgeProps {
  sx?: {};
}

export default function UserBadge({ sx }: UserBadgeProps) {
  const session = useSession();
  const user = session?.user;
  console.log(session);
  return (
    <>
      <Typography variant="h3" sx={sx}>
        Welcome{" "}
        {user &&
          `${user.user_metadata.firstName} ${user.user_metadata.lastName}`}
      </Typography>
    </>
  );
}
