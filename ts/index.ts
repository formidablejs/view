import type { AxiosError, AxiosResponse } from "axios";

export type FormConfig = {
    headers?: object;
    recentlySuccessful?: number;
    renderServerError?: boolean;
}

export type RequestHandle = {
    onSuccess?: (response: AxiosResponse) => void;
    onError?: (error: AxiosError) => void;
    onComplete?: () => void;
}

declare global {
    interface Window {
        FormConfig: FormConfig
    }
}

declare module '@formidablejs/framework' {
    export class View {
        /**
         * Compiled routes.
         */
        routes(): string
    }
}