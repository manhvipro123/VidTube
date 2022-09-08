export interface AuthState{
    isAuthenticated: boolean;
    idToken: string;
    error: string;
    _id: string;
    registrationTokensList: Object
}