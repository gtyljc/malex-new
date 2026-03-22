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
  CountryCode: { input: any; output: any; }
  DateTimeISO: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
  JWT: { input: any; output: any; }
  PhoneNumber: { input: any; output: any; }
  PositiveFloat: { input: any; output: any; }
  PositiveInt: { input: any; output: any; }
  TimeZone: { input: any; output: any; }
  URL: { input: any; output: any; }
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
  __typename?: 'AdminPanelKeyResponse';
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
  __typename?: 'AppointmentResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<AppointmentType>>;
  message: Scalars['String']['output'];
  pagination?: Maybe<PaginationType>;
  success: Scalars['Boolean']['output'];
};

export type AppointmentType = {
  __typename?: 'AppointmentType';
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

export type AuthResponseType = ApiResponseInterface & {
  __typename?: 'AuthResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<Scalars['Boolean']['output']>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export enum BestWayToTouchEnum {
  Phone = 'PHONE',
  Text = 'TEXT',
  Whatsapp = 'WHATSAPP'
}

export type BusyResponseType = ApiResponseInterface & {
  __typename?: 'BusyResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<BusyType>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type BusyType = {
  __typename?: 'BusyType';
  busy: Scalars['Boolean']['output'];
  date: Scalars['DateTimeISO']['output'];
};

export type CreateTokensResponseType = ApiResponseInterface & {
  __typename?: 'CreateTokensResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<TokensType>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type FinalizeUploadImageResponseType = ApiResponseInterface & {
  __typename?: 'FinalizeUploadImageResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<FinalizeUploadImageType>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type FinalizeUploadImageType = {
  __typename?: 'FinalizeUploadImageType';
  id: Scalars['ID']['output'];
  url: Scalars['URL']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLogin: AuthResponseType;
  adminLogout: AuthResponseType;
  createWork: WorkResponseType;
  deleteManyWorks: WorkResponseType;
  deleteWork: WorkResponseType;
  finalizeImageUpload: FinalizeUploadImageResponseType;
  registerAppointment: AppointmentResponseType;
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


export type MutationRegisterAppointmentArgs = {
  data: AppointmentCreateInput;
};


export type MutationStartImageUploadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAppointmentArgs = {
  data: AppointmentUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateManyAppointmentsArgs = {
  data: AppointmentUpdateInput;
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
  __typename?: 'PageInfoType';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type PaginationInput = {
  page: Scalars['PositiveInt']['input'];
  perPage: Scalars['PositiveInt']['input'];
};

export type PaginationType = {
  __typename?: 'PaginationType';
  pageInfo: PageInfoType;
  total: Scalars['Int']['output'];
};

export type PublicConfigResponseType = ApiResponseInterface & {
  __typename?: 'PublicConfigResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<PublicConfigType>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type PublicConfigType = {
  __typename?: 'PublicConfigType';
  c_country: Scalars['CountryCode']['output'];
  closing_at: Scalars['DateTimeISO']['output'];
  min_duration: Scalars['PositiveFloat']['output'];
  opening_at: Scalars['DateTimeISO']['output'];
  phone_number: Scalars['PhoneNumber']['output'];
  support_email: Scalars['EmailAddress']['output'];
  timezone: Scalars['TimeZone']['output'];
};

export type PublicWorkResponseType = ApiResponseInterface & {
  __typename?: 'PublicWorkResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<PublicWorkType>>;
  message: Scalars['String']['output'];
  pagination?: Maybe<PaginationType>;
  success: Scalars['Boolean']['output'];
};

export type PublicWorkType = {
  __typename?: 'PublicWorkType';
  category: WorkCategoryEnum;
  img_url: Scalars['URL']['output'];
  timestamp: Scalars['DateTimeISO']['output'];
};

export type Query = {
  __typename?: 'Query';
  adminPanelKey: AdminPanelKeyResponse;
  appointment: AppointmentResponseType;
  appointments: AppointmentResponseType;
  busyInRange: BusyResponseType;
  checkAdmin: AuthResponseType;
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

export enum ResourceEnum {
  Admin = 'admin',
  Appointment = 'appointment',
  SiteConfig = 'siteConfig',
  Work = 'work'
}

export enum RoleEnum {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  Superadmin = 'SUPERADMIN',
  Superuser = 'SUPERUSER',
  User = 'USER'
}

export type SiteConfigResponseType = ApiResponseInterface & {
  __typename?: 'SiteConfigResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<SiteConfigType>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type SiteConfigType = {
  __typename?: 'SiteConfigType';
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
  __typename?: 'StartUploadImageResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<StartUploadImageType>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type StartUploadImageType = {
  __typename?: 'StartUploadImageType';
  id: Scalars['ID']['output'];
  url: Scalars['URL']['output'];
};

export enum TimeUnitEnum {
  Appointment = 'APPOINTMENT',
  Day = 'DAY'
}

export type TokensType = {
  __typename?: 'TokensType';
  at?: Maybe<Scalars['JWT']['output']>;
  rt?: Maybe<Scalars['JWT']['output']>;
};

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
  __typename?: 'WorkResponseType';
  code: Scalars['Int']['output'];
  data: Array<Maybe<WorkType>>;
  message: Scalars['String']['output'];
  pagination?: Maybe<PaginationType>;
  success: Scalars['Boolean']['output'];
};

export type WorkType = {
  __typename?: 'WorkType';
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
