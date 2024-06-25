import Loading from "@/app/loading";
import ProfileComponent from "@/components/Profile";
import React, { Suspense } from "react";

const Profile = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ProfileComponent />
      </Suspense>
    </div>
  );
};

export default Profile;
