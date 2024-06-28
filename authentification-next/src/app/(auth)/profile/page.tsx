import Loading from "@/app/loading";
import ProfileComponent from "@/components/auth/Profile";
import React, { Suspense } from "react";

const Profile = () => {
  return (
    <div>
      {/* call for the loading page incase the fetch takes time */}
      <Suspense fallback={<Loading />}> 
        <ProfileComponent />
      </Suspense>
    </div>
  );
};

export default Profile;
