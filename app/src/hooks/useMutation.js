// Importing useState and the custom hooks for authentication and handling API errors
import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContainer";
import { handleErrors } from "../helpers/api";

const useMutation = () => {
  // Getting the user authentication data from the context API
  const auth = useAuthContext();
  // Initializing the state variables for loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // This function is responsible for making an API call with the given url and options
  const mutate = async (url, options = {}) => {

    console.log(options);
    // Set the loading state to true
    setIsLoading(true);

    // Setting the headers for the request
    const headers = {
      accept: "application/json",
      "content-type": "application/json",
    };

    // Only add the user authentication data to headers if it exists
    if (auth && auth.user) {
      headers.Authorization = `Bearer ${auth.user.token}`;
    }

    try {
      // Making a fetch call with the given url and options, including the headers
      const result = await fetch(url, {
        method: options.method ?? "POST",
        headers: headers,
        body: JSON.stringify(options.data ?? {}),
      });

      // Handling errors in the response using the handleErrors function
      const data = await handleErrors(result);

      // If there's a success callback, call it with the response data, otherwise set loading state to false
      if (options.onSuccess) {
        options.onSuccess(data);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      let errorData;
      try{
        const tempData = await error.json();
        errorData = tempData.error
      } catch (ex) {
        errorData = error.statusText;
      }
      // If there's an error callback, call it with the error, otherwise set the error state and loading state to false
      if (options.onError) {
        options.onError(error);
      } else {
        setIsLoading(false);
        setError(String(errorData));
      }
    }
  };

  // Returning the loading state, error state, and the mutate function to make API calls
  return {
    isLoading,
    error,
    mutate,
  };
};

// Exporting the useMutation hook
export default useMutation;
