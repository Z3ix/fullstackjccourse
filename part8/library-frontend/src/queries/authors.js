import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
    query {
        allAuthors{
            name
            born
            bookCount
            id
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor (
        $name: String!
        $born: Int!
    ) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
            id
            bookCount
        }    
    }
`