"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, AuthContextType } from "@/types/auth.types";
import { useGetMe } from "@/hooks/queries/useGetMe";
import { authApi } from "@/lib/api/auth.api";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const { data, isLoading, isError } = useGetMe();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (data?.success && data?.data) {
            setUser(data.data);
        } else if (isError) {
            setUser(null);
        }
    }, [data, isError]);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            // Call backend logout to clear cookie
            await authApi.logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            // Clear local state and cache
            setUser(null);
            queryClient.clear();
            window.location.href = "/login";
        }
    };

    const updateUser = (userData: User) => {
        setUser(userData);
    };

    const value: AuthContextType = {
        user,
        token: null, // Not needed anymore as token is in cookie
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
