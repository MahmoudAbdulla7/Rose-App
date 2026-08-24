import { redirect } from 'next/navigation';

// Admins only get the dashboard; any other path bounces to the dashboard root.
export default function AdminDefault(): never {
  redirect('/');
}
