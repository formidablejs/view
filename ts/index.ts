import type { AxiosResponse } from "axios";

export type FormConfig = {
    headers?: object;
    recentlySuccessful?: number;
    renderServerError?: boolean;
}

export type RequestConfig = {
    onSuccess?: (response: AxiosResponse) => void;
    onError?: (response: AxiosResponse) => void;
    onComplete?: () => void;
}
