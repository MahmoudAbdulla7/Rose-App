import { useInfiniteQuery } from '@tanstack/react-query';
import { getNotificationAction } from '../actions/get-notifications.action';

export function useNotifications() {
  return useInfiniteQuery({
    queryKey: ['notifications'],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      getNotificationAction({
        page: pageParam,
        limit: 6,
      }),

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
