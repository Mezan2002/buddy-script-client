import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import api from './api';

// --- Auth Hooks ---
export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await api.get('/auth/me');
      return data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

// --- Post Hooks ---
export const useInfinitePosts = (limit = 10) => {
  return useInfiniteQuery({
    queryKey: ['posts', 'infinite', limit],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get(`/posts?page=${pageParam}&limit=${limit}`);
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.currentPage + 1 : undefined,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post('/posts', formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId) => {
      const { data } = await api.put(`/posts/${postId}/like`);
      return { postId, likes: data };
    },
    onMutate: async (postId) => {
      // Cancel refetching
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(['posts']);
      const currentUser = queryClient.getQueryData(['me']);
      const myId = currentUser?._id;

      // Optimistically update the cache
      if (myId) {
        queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData) => {
          if (!oldData) return oldData;
          
          // Handle paginated or single list format
          const updatePosts = (posts) => posts && posts.map(post => {
            if (post._id !== postId) return post;
            
            const isCurrentlyLiked = post.likes.some(like => 
              (typeof like === 'object' ? like._id : like) === myId
            );

            return { 
              ...post, 
              likes: isCurrentlyLiked 
                ? post.likes.filter(like => (typeof like === 'object' ? like._id : like) !== myId)
                : [...post.likes, { _id: myId, firstName: currentUser.firstName, lastName: currentUser.lastName, avatar: currentUser.avatar }] 
            };
          });

          // Infinite queries have a pages property
          if (oldData.pages) {
            return {
              ...oldData,
              pages: oldData.pages.map(page => ({
                ...page,
                posts: updatePosts(page.posts)
              }))
            };
          }

          if (oldData.posts) {
            return { ...oldData, posts: updatePosts(oldData.posts) };
          }
          return updatePosts(oldData);
        });
      }

      return { previousPosts };
    },
    onError: (err, postId, context) => {
      queryClient.setQueriesData({ queryKey: ['posts'] }, context.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, postData }) => {
      const { data } = await api.put(`/posts/${postId}`, postData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId) => {
      const { data } = await api.delete(`/posts/${postId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

// --- Comment Hooks ---
export const useComments = (postId) => {
  return useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const { data } = await api.get(`/comments/${postId}`);
      return data;
    },
    enabled: !!postId,
  });
};

export const useAddComment = (postId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (commentData) => {
      const { data } = await api.post(`/comments/${postId}`, commentData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      queryClient.invalidateQueries({ queryKey: ['posts'] }); // To update comment count
    },
  });
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ commentId, postId }) => {
      const { data } = await api.put(`/comments/${commentId}/like`);
      return { data, postId };
    },
    onMutate: async ({ commentId, postId }) => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });
      const previousComments = queryClient.getQueryData(['comments', postId]);
      const currentUser = queryClient.getQueryData(['me']);
      const myId = currentUser?._id;

      if (myId) {
        queryClient.setQueryData(['comments', postId], (oldData) => {
          if (!oldData) return [];
          return oldData.map(comment => {
            if (comment._id !== commentId) return comment;
            const isCurrentlyLiked = comment.likes.some(like => 
              (typeof like === 'object' ? like._id : like) === myId
            );
            return {
              ...comment,
              likes: isCurrentlyLiked
                ? comment.likes.filter(like => (typeof like === 'object' ? like._id : like) !== myId)
                : [...comment.likes, { _id: myId, firstName: currentUser.firstName, lastName: currentUser.lastName, avatar: currentUser.avatar }]
            };
          });
        });
      }
      return { previousComments, postId };
    },
    onError: (err, newLike, context) => {
      queryClient.setQueryData(['comments', context.postId], context.previousComments);
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
    },
  });
};
