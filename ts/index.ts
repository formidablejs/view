import type { AxiosError, AxiosResponse, AxiosStatic } from 'axios'

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
    canAbort?: (abortController: AbortController) => void;
    onAbort?: (error: Error | AxiosError) => void;
    onComplete?: () => void;
    onError?: (error: Error | AxiosError) => void;
    onSuccess?: (response: AxiosResponse) => void;
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
