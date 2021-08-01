import gql from 'graphql-tag';
import { useMutation } from '@apollo/client/';
import { ALL_PRODUCTS_QUERY } from './Products';

const DELETE_PRODUCT_MUTATION = gql`
   mutation DELETE_PRODUCT_MUTATION($id: ID!) {
      deleteProduct(id: $id) {
         id
         name
      }
   }
`;
function update(cache, payload) {
   console.log(payload);
   cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
   const [deleteProduct, { data, loading, error }] = useMutation(
      DELETE_PRODUCT_MUTATION,
      {
         variables: { id },
         update,
         refetchQueries:[{query:ALL_PRODUCTS_QUERY}]
      },
   );
   return (
      <button
         disabled={loading}
         type="button"
         onClick={() => {
            if (confirm('Are you sure for delete product')) {
               deleteProduct().catch((err) => alert(err.message));
            }
         }}
      >
         {children}
      </button>
   );
}
