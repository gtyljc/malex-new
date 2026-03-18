import { ApiResponseInterface, PaginationType } from "./__generated__/graphql";

export * from "./__generated__/graphql";

export type APIResponse = {
    data: any[]
    pagination?: PaginationType
} & ApiResponseInterface