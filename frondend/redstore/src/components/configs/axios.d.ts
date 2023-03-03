import 'axios';

declare module 'axios' {   
    export interface AxiosRequestConfig {
        ignoreSpinner?: boolean;   
    } 
}