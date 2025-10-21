import type { ApiError, User } from 'api';
import { authApiService, httpClient, userApiService } from 'api';

import type { Nullable } from 'types/utils';
import { create } from 'zustand';
import { localStorageService } from 'utils/LocalStorageService';
import { toast } from 'react-toastify';

interface UserState {
  user: Nullable<User>;
  setUser: (user: User) => void;
  clearUser: () => void;
  initUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  initUser: async () => {
    try {
      const { data } = await httpClient<User>(userApiService.fetchUser());
      set({ user: data });
    } catch (error) {
      //TODO: replace this
      toast.error((error as ApiError).response.data.message);
    }
  },

  logout: async () => {
    try {
      await httpClient(authApiService.signOut());
    } catch (error) {
      //TODO: replace this
      toast.error((error as ApiError).response.data.message);
    } finally {
      localStorageService.deleteAccessToken();
      set({ user: null });
    }
  },
}));
