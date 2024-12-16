// src/utils/tokenUtils.ts
export const isTokenExpired = (token: string | null | undefined): boolean => {
    if (!token) return true;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.exp * 1000 < Date.now();
};