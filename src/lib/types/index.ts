
export type Role = "ADMIN" | "USER" | "GUEST" | "SUPERUSER" | "SUPERADMIN";

export type APIResponse<DataType> = {
    message: string,
    code: number,
    success: boolean,
    data: [ DataType ]
}

export type Resource = (
    "appointment" |
    "work" |
    "siteConfig" |
    "admin" |
    "refreshToken"
)