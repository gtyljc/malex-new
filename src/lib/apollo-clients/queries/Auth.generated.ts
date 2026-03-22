import * as Types from '../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AdminPanelKeyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AdminPanelKeyQuery = { adminPanelKey: { __typename: 'AdminPanelKeyResponse', code: number, success: boolean, message: string, data: Array<string | null> } };

export type CheckAdminQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CheckAdminQuery = { checkAdmin: { __typename: 'AuthResponseType', code: number, success: boolean, message: string, data: Array<boolean | null> } };

export type AdminLoginMutationVariables = Types.Exact<{
  username: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;


export type AdminLoginMutation = { adminLogin: { __typename: 'AuthResponseType', code: number, success: boolean, message: string, data: Array<boolean | null> } };

export type AdminLogoutMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type AdminLogoutMutation = { adminLogout: { __typename: 'AuthResponseType', code: number, success: boolean, message: string, data: Array<boolean | null> } };


export const AdminPanelKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminPanelKey"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminPanelKey"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<AdminPanelKeyQuery, AdminPanelKeyQueryVariables>;
export const CheckAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<CheckAdminQuery, CheckAdminQueryVariables>;
export const AdminLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<AdminLoginMutation, AdminLoginMutationVariables>;
export const AdminLogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminLogout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminLogout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<AdminLogoutMutation, AdminLogoutMutationVariables>;