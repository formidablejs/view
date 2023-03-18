import { FormConfig } from "../ts";
import { Form } from "./Form";

/**
 * @param {T} body
 * @param {FormConfig} config
 */
export function useForm<T = unknown>(body?: T, config?: FormConfig): T & Form<T>;
