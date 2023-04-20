import type { AxiosError, AxiosResponse, AxiosStatic } from "axios";

export type FormConfig = {
    headers?: object;
    recentlySuccessful?: number;
    renderServerError?: boolean;
}

export type UploadProgress = {
    loaded: number;
    total: number;
    bytes: number;
    rate: number;
    percentage: number;
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

    var FormConfig: FormConfig
    var axios: AxiosStatic
}

declare module '@formidablejs/framework' {
    export class View {
        /**
         * Compiled routes.
         */
        routes(): string

        /**
         * Page data.
         */
        dataPage(): string
    }
}
