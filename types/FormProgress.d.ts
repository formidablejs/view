export class FormProgress {
    /** Color code or color name. */
    color?: string
    minimum?: number
    template?: string
    easing?: string
    speed?: number
    trickle?: boolean
    trickleSpeed?: number
    showSpinner?: boolean
    parent?: string
    positionUsing?: string
    barSelector?: string
    observeUrl?: boolean
    mount(): void
    addMissingCss(): void
    showProgressOnUrlChanges(): void
    render(): FormProgress
}
