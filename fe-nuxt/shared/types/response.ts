export interface ValidationErrors {
    [field: string]: string[]
}

export interface ValidationResponseData {
    message: string
    errors: ValidationErrors
}
