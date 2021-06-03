export interface AuthReq {
    user: string;
    password: string;
    keep_logged_in: boolean;
    type: 'user' | 'admin';
}