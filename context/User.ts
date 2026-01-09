import { LoginFormValues } from "@/app/page";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthStore = {
  user: LoginFormValues | null;
  isLoggedIn: boolean;
  loginData: (userData: LoginFormValues) => void;
  logout: () => void;
  updateName: (newName: string) => void;
};

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      loginData: (userData) =>
        set({
          user: userData,
          isLoggedIn: true,
        }),

      logout: () =>
        set(() => {
          return { user: null, isLoggedIn: false };
        }),

      updateName: (newName) =>
        set((state) => ({
          user: state.user ? { ...state.user, fullName: newName } : null,
        })),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),

      storage:
        typeof window === "undefined"
          ? undefined
          : createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
