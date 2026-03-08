
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
export type BWT = "WHATSAPP" | "PHONE" | "TEXT";
export type WorkCategory = "PLUMBING" | "ASSEMBLING" | "MOUNTING";