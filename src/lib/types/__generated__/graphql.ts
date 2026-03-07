export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  CountryCode: { input: unknown; output: unknown; }
  DateTimeISO: { input: unknown; output: unknown; }
  EmailAddress: { input: unknown; output: unknown; }
  JSONObject: { input: unknown; output: unknown; }
  JWT: { input: unknown; output: unknown; }
  PhoneNumber: { input: unknown; output: unknown; }
  PositiveFloat: { input: unknown; output: unknown; }
  PositiveInt: { input: unknown; output: unknown; }
  TimeZone: { input: unknown; output: unknown; }
  URL: { input: unknown; output: unknown; }
};

export type ApiResponseInterface = {
  /**
   * All mutation and query responses must inherit this interface
   * and include data field with a type of modified or readed entity ( always represents an array )
   */
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type AdminPanelKeyResponse = ApiResponseInterface & {
  __typename: 'AdminPanelKeyResponse';
  code: Scalars['Int']['output'];
  data: Array<Maybe<Scalars['String']['output']>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type AppointmentCreateInput = {
  address: Scalars['String']['input'];
  bwt: BestWayToTouchEnum;
  date: Scalars['DateTimeISO']['input'];
  job_desc: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone_number: Scalars['PhoneNumber']['input'];
  surname: Scalars['String']['input'];
};

export type AppointmentResponseType = ApiResponseInterface & {
  __typename: 'AppointmentResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<AppointmentType>>;
  message: Scalars['String']['output'];
  pagination: Maybe<PaginationType>;
  success: Scalars['Boolean']['output'];
};

export type AppointmentType = {
  __typename: 'AppointmentType';
  address: Scalars['String']['output'];
  bwt: BestWayToTouchEnum;
  completed: Scalars['Boolean']['output'];
  date: Scalars['DateTimeISO']['output'];
  duration: Scalars['PositiveFloat']['output'];
  id: Scalars['ID']['output'];
  job_desc: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone_number: Scalars['PhoneNumber']['output'];
  surname: Scalars['String']['output'];
};

export type AppointmentUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  bwt?: InputMaybe<BestWayToTouchEnum>;
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['DateTimeISO']['input']>;
  duration?: InputMaybe<Scalars['PositiveFloat']['input']>;
  job_desc?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['PhoneNumber']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
};

export enum BestWayToTouchEnum {
  Phone = 'PHONE',
  Text = 'TEXT',
  Whatsapp = 'WHATSAPP'
}

export type BusyResponseType = ApiResponseInterface & {
  __typename: 'BusyResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<BusyType>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type BusyType = {
  __typename: 'BusyType';
  busy: Scalars['Boolean']['output'];
  date: Scalars['DateTimeISO']['output'];
};

export type FinalizeUploadImageResponseType = ApiResponseInterface & {
  __typename: 'FinalizeUploadImageResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<FinalizeUploadImageType>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type FinalizeUploadImageType = {
  __typename: 'FinalizeUploadImageType';
  id: Scalars['ID']['output'];
  url: Scalars['URL']['output'];
};

export type JwtResponseType = ApiResponseInterface & {
  __typename: 'JWTResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<JwtType>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type JwtType = {
  __typename: 'JWTType';
  at: Scalars['JWT']['output'];
  rt: Scalars['JWT']['output'];
};

export type Mutation = {
  __typename: 'Mutation';
  adminLogin: JwtResponseType;
  adminLogout: JwtResponseType;
  createAT: JwtResponseType;
  createAppointment: AppointmentResponseType;
  createWork: WorkResponseType;
  deleteManyWorks: WorkResponseType;
  deleteWork: WorkResponseType;
  finalizeImageUpload: FinalizeUploadImageResponseType;
  startImageUpload: StartUploadImageResponseType;
  updateAppointment: AppointmentResponseType;
  updateManyAppointments: AppointmentResponseType;
  updateManyWorks: WorkResponseType;
  updateSiteConfig: SiteConfigResponseType;
  updateWork: WorkResponseType;
};


export type MutationAdminLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCreateAppointmentArgs = {
  data: AppointmentCreateInput;
};


export type MutationCreateWorkArgs = {
  data?: InputMaybe<WorkCreateInput>;
};


export type MutationDeleteManyWorksArgs = {
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationDeleteWorkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationFinalizeImageUploadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationStartImageUploadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAppointmentArgs = {
  data?: InputMaybe<AppointmentUpdateInput>;
  id: Scalars['ID']['input'];
};


export type MutationUpdateManyAppointmentsArgs = {
  data?: InputMaybe<AppointmentUpdateInput>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationUpdateManyWorksArgs = {
  data?: InputMaybe<WorkUpdateInput>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
};


export type MutationUpdateSiteConfigArgs = {
  data?: InputMaybe<SiteConfigUpdateInput>;
  id: Scalars['ID']['input'];
};


export type MutationUpdateWorkArgs = {
  data?: InputMaybe<WorkUpdateInput>;
  id: Scalars['ID']['input'];
};

export enum OrderEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfoType = {
  __typename: 'PageInfoType';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type PaginationInput = {
  page: Scalars['PositiveInt']['input'];
  perPage: Scalars['PositiveInt']['input'];
};

export type PaginationType = {
  __typename: 'PaginationType';
  pageInfo: PageInfoType;
  total: Scalars['Int']['output'];
};

export type PublicConfigResponseType = ApiResponseInterface & {
  __typename: 'PublicConfigResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<PublicConfigType>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type PublicConfigType = {
  __typename: 'PublicConfigType';
  c_country: Scalars['CountryCode']['output'];
  closing_at: Scalars['DateTimeISO']['output'];
  min_duration: Scalars['PositiveFloat']['output'];
  opening_at: Scalars['DateTimeISO']['output'];
  phone_number: Scalars['PhoneNumber']['output'];
  support_email: Scalars['EmailAddress']['output'];
  timezone: Scalars['TimeZone']['output'];
};

export type PublicWorkResponseType = ApiResponseInterface & {
  __typename: 'PublicWorkResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<PublicWorkType>>;
  message: Scalars['String']['output'];
  pagination: Maybe<PaginationType>;
  success: Scalars['Boolean']['output'];
};

export type PublicWorkType = {
  __typename: 'PublicWorkType';
  category: WorkCategoryEnum;
  img_url: Scalars['URL']['output'];
  timestamp: Scalars['DateTimeISO']['output'];
};

export type Query = {
  __typename: 'Query';
  adminPanelKey: Maybe<AdminPanelKeyResponse>;
  appointment: AppointmentResponseType;
  appointments: AppointmentResponseType;
  busyInRange: BusyResponseType;
  getWorks: PublicWorkResponseType;
  newWorks: PublicWorkResponseType;
  publicConfig: PublicConfigResponseType;
  siteConfig: SiteConfigResponseType;
  work: WorkResponseType;
  works: WorkResponseType;
};


export type QueryAppointmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAppointmentsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryBusyInRangeArgs = {
  date: Scalars['DateTimeISO']['input'];
  unit: TimeUnitEnum;
};


export type QueryGetWorksArgs = {
  filter: Scalars['JSONObject']['input'];
  pagination: PaginationInput;
  sort?: InputMaybe<SortInput>;
};


export type QueryNewWorksArgs = {
  num?: InputMaybe<Scalars['PositiveInt']['input']>;
};


export type QuerySiteConfigArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWorksArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};

export enum RoleEnum {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  Superadmin = 'SUPERADMIN',
  Superuser = 'SUPERUSER',
  User = 'USER'
}

export type SiteConfigResponseType = ApiResponseInterface & {
  __typename: 'SiteConfigResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<SiteConfigType>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type SiteConfigType = {
  __typename: 'SiteConfigType';
  c_country: Scalars['CountryCode']['output'];
  closing_at: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  min_duration: Scalars['PositiveFloat']['output'];
  opening_at: Scalars['DateTimeISO']['output'];
  phone_number: Scalars['PhoneNumber']['output'];
  support_email: Scalars['EmailAddress']['output'];
  timezone: Scalars['TimeZone']['output'];
};

export type SiteConfigUpdateInput = {
  c_country?: InputMaybe<Scalars['CountryCode']['input']>;
  closing_at?: InputMaybe<Scalars['DateTimeISO']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  min_duration?: InputMaybe<Scalars['PositiveFloat']['input']>;
  opening_at?: InputMaybe<Scalars['DateTimeISO']['input']>;
  phone_number?: InputMaybe<Scalars['PhoneNumber']['input']>;
  support_email?: InputMaybe<Scalars['EmailAddress']['input']>;
  timezone?: InputMaybe<Scalars['TimeZone']['input']>;
};

export type SortInput = {
  field: Scalars['String']['input'];
  order: OrderEnum;
};

export type StartUploadImageResponseType = ApiResponseInterface & {
  __typename: 'StartUploadImageResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<StartUploadImageType>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type StartUploadImageType = {
  __typename: 'StartUploadImageType';
  id: Scalars['ID']['output'];
  url: Scalars['URL']['output'];
};

export enum TimeUnitEnum {
  Appointment = 'APPOINTMENT',
  Day = 'DAY'
}

export enum WorkCategoryEnum {
  Assembling = 'ASSEMBLING',
  Mounting = 'MOUNTING',
  Plumbing = 'PLUMBING'
}

export type WorkCreateInput = {
  category: WorkCategoryEnum;
  img_id: Scalars['ID']['input'];
  img_url: Scalars['URL']['input'];
  timestamp: Scalars['DateTimeISO']['input'];
};

export type WorkResponseType = ApiResponseInterface & {
  __typename: 'WorkResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<WorkType>>;
  message: Scalars['String']['output'];
  pagination: Maybe<PaginationType>;
  success: Scalars['Boolean']['output'];
};

export type WorkType = {
  __typename: 'WorkType';
  category: WorkCategoryEnum;
  id: Scalars['ID']['output'];
  img_id: Scalars['ID']['output'];
  img_url: Scalars['URL']['output'];
  timestamp: Scalars['DateTimeISO']['output'];
};

export type WorkUpdateInput = {
  category?: InputMaybe<WorkCategoryEnum>;
  img_id?: InputMaybe<Scalars['ID']['input']>;
  img_url?: InputMaybe<Scalars['URL']['input']>;
  timestamp?: InputMaybe<Scalars['DateTimeISO']['input']>;
};

export type BusyInRangeQueryVariables = Exact<{
  date: Scalars['DateTimeISO']['input'];
  unit: TimeUnitEnum;
}>;


export type BusyInRangeQuery = { busyInRange: { __typename: 'BusyResponseType', code: number, success: boolean, message: string, data: Array<{ __typename: 'BusyType', date: unknown, busy: boolean } | null> } };

export type CreateAppointmentMutationVariables = Exact<{
  data: AppointmentCreateInput;
}>;


export type CreateAppointmentMutation = { createAppointment: { __typename: 'AppointmentResponseType', code: number, success: boolean, message: string } };

export type PublicConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicConfigQuery = { publicConfig: { __typename: 'PublicConfigResponseType', code: number, success: boolean, message: string, data: Array<{ __typename: 'PublicConfigType', opening_at: unknown, closing_at: unknown, support_email: unknown, phone_number: unknown, min_duration: unknown, timezone: unknown, c_country: unknown } | null> } };

export type GetWorksQueryVariables = Exact<{
  filter: Scalars['JSONObject']['input'];
  pagination: PaginationInput;
  sort?: InputMaybe<SortInput>;
}>;


export type GetWorksQuery = { getWorks: { __typename: 'PublicWorkResponseType', code: number, success: boolean, message: string, data: Array<{ __typename: 'PublicWorkType', img_url: unknown, category: WorkCategoryEnum, timestamp: unknown } | null> } };

export type NewWorksQueryVariables = Exact<{
  num?: InputMaybe<Scalars['PositiveInt']['input']>;
}>;


export type NewWorksQuery = { newWorks: { __typename: 'PublicWorkResponseType', code: number, success: boolean, message: string, data: Array<{ __typename: 'PublicWorkType', img_url: unknown, category: WorkCategoryEnum, timestamp: unknown } | null> } };

export type AdminLoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AdminLoginMutation = { adminLogin: { __typename: 'JWTResponseType', code: number, success: boolean, message: string, data: Array<{ __typename: 'JWTType', at: unknown, rt: unknown } | null> } };

export type CreateAtMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateAtMutation = { createAT: { __typename: 'JWTResponseType', code: number, success: boolean, message: string, data: Array<{ __typename: 'JWTType', at: unknown, rt: unknown } | null> } };

export type AdminLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type AdminLogoutMutation = { adminLogout: { __typename: 'JWTResponseType', code: number, success: boolean, message: string, data: Array<{ __typename: 'JWTType', at: unknown, rt: unknown } | null> } };
