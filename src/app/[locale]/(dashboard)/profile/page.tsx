import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return <div>ProfilePage — {session?.user?.username}</div>;
}
