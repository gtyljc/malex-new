import * as Types from '../../types/__generated__/graphql';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PaginationFieldsFragment = { __typename: 'PaginationType', total: number, pageInfo: { __typename: 'PageInfoType', hasNextPage: boolean, hasPreviousPage: boolean } };

export const PaginationFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PaginationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]} as unknown as DocumentNode<PaginationFieldsFragment, unknown>;