import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client/';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from './../lib/UseForm';

const SINGLE_PRODUCT_QUERY = gql`
   query SINGLE_PRODUCT_QUERY($id: ID!) {
      Product(where: { id: $id }) {
         id
         name
         description
         price
      }
   }
`;

const UPDATE_PRODUCT_MUTATION = gql`
   mutation UPDATE_PRODUCT_MUTATION(
      $id: ID!
      $name: String
      $description: String
      $price: Int
   ) {
      updateProduct(
         id: $id
         data: { name: $name, description: $description, price: $price }
      ) {
         id
         name
         description
         price
      }
   }
`;

export default function UpdateProduct({ id }) {
   const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
      variables: {
         id,
      },
   });

   if (error) {
      <p>{error}</p>;
   }

   const [
      updateProduct,
      { data: updatedData, error: updateError, loading: updateLoading },
   ] = useMutation(UPDATE_PRODUCT_MUTATION);
   const { inputs, handleChange, clearForm, resetForm } = useForm(
      data?.Product,
   );
   if (loading) {
      return <p>Loading...</p>;
   }
   console.log({ data, loading, error });
   return (
      <Form
         onSubmit={async (e) => {
            e.preventDefault();
            const res = await updateProduct({
               variables: {
                  id,

                  name: inputs.name,
                  description: inputs.description,
                  price: inputs.price,
               },
            });
            console.log(res);
            // // Submit the inputfields to the backend:
            // const res = await createItem();
            // clearForm();
            // // Go to that product's page!
            // Router.push({
            //    pathname: `/product/${res.data.createProduct.id}`,
            // });
         }}
      >
         <DisplayError error={error || updateError} />
         <fieldset disabled={updateLoading} aria-busy={updateLoading}>
            <label htmlFor="name">
               Name
               <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={inputs.name}
                  onChange={handleChange}
               />
            </label>
            <label htmlFor="price">
               Price
               <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="price"
                  value={inputs.price}
                  onChange={handleChange}
               />
            </label>
            <label htmlFor="description">
               Description
               <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={inputs.description}
                  onChange={handleChange}
               />
            </label>

            <button type="submit">+ Update Product</button>
         </fieldset>
      </Form>
   );
}
