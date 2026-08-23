import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

import { authOptions } from '@/auth';
import ProfileSkeleton from '@/features/layout/skeletons/profile.skeleton';

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}

async function ProfileContent() {
  const session = await getServerSession(authOptions);

  return <div>ProfilePage — {session?.user?.username}</div>;
}
