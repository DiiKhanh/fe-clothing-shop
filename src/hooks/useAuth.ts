import { selectIsAuthenticated } from '@/redux/slices/auth';
import { useAppSelector } from './useAppSelector';

export default function useAuth() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated;
}
