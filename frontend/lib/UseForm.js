import React, { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
   const [inputs, setInputs] = useState(initial);
   const initialValues = Object.values(initial).join('');

   useEffect(() => {
      setInputs(inputs);
   }, [initialValues]);
   const handleChange = (e) => {
      let { value, type, name } = e.target;
      if (type === 'number') {
         value = parseInt(value);
      }

      if (type === 'file') {
         [value] = e.target.files;
      }
      setInputs({
         ...inputs,
         [name]: value,
      });
   };
   function resetForm(e) {
      e.preventDefault();
      setInputs(initial);
   }
   function clearForm(e) {
      const blankState = Object.fromEntries(
         Object.entries(inputs).map(([key, value]) => [key, '']),
      );
      setInputs(blankState);
   }
   return {
      clearForm,
      resetForm,
      inputs,
      handleChange,
   };
}
