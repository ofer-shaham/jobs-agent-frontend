import { UserProfileWithOneUserQuery } from '@/lib/types/api.types';
import { OmitKey } from '@/lib/types/types';
import { useSession } from 'next-auth/react';

import userProfile from './useUserProfile';

/**
 * @returns The data about the current login user
 */
export default function useAuth() {
  const { data, status } = useSession({
    required: true
  });
  const { userProfileData, isLoading, userHistoryQueries } = userProfile(data?.user.id || '');
  return {
    isAuthenticated: status === 'authenticated',
    ...data,
    userProfileData,
    isLoading,
    userHistoryQueries
  };
}

export type ReturnTypeUseAuth = ReturnType<typeof useAuth>;
export type ReturnTypeUseAuthProfileExist = OmitKey<ReturnTypeUseAuth, 'userProfileData'> & {
  userProfileData: UserProfileWithOneUserQuery;
};
