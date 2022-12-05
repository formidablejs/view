import { FormConfig } from "../ts";
import { Form } from "./Form";

/**
 * @param {T} body
 * @param {FormConfig} config
 */
export function useForm<T>(body?: T, config?: FormConfig): T & Form<T>;
