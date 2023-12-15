import { UrlStateConfig, UrlState } from './UrlState'

export function useUrlState<T = unknown>(params: T, config: UrlStateConfig<T>): T & UrlState<T>
