import { useInfiniteQuery } from '@tanstack/react-query';
import { getNotificationAction } from '../lib/actions/get-notifications.action';

interface UseNotificationsOptions {
  enabled?: boolean;
}

export function useNotifications({ enabled = true }: UseNotificationsOptions = {}) {
  return useInfiniteQuery({
    queryKey: ['notifications'],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      getNotificationAction({
        page: pageParam,
        limit: 4,
      }),

    enabled,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.metadata;

      return page < totalPages ? page + 1 : undefined;
    },

    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchInterval: 60_000,
  });
}
