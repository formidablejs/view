export type FormConfig = {
    headers?: Object;
    recentlySuccessful?: Number;
    renderServerError?: Boolean;
}

export type RequestConfig = {
    onSuccess?: CallableFunction;
    onError?: CallableFunction;
    onComplete?: CallableFunction;
}