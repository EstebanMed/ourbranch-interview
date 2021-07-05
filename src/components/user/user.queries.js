import { gql } from 'apollo-boost';

export const ALL_USERS_QUERY = gql`
  query {
    allUsers {
      email
      name
      role
    }
  }
`;

export const GET_USER = gql`
  query user($email: ID!) {
    user(email: $email) {
      email
      name
      role
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($email: ID!, $newAttributes: UserAttributesInput!){
      updateUser(email: $email, newAttributes: $newAttributes){
          email,
          name,
          role
      }
    }
  `;

export const RESET_USERS = gql`
  mutation {
    resetUsers
  }
`;

export const DELETE_USERS = gql`
  mutation deleteUsers($emails: [ID]!) {
    deleteUsers(emails: $emails)
  }
`;