import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContainer";
import { handleErrors } from "../helpers/api";

const useFetch = (path) => {
  // Declare state variables to hold the fetched data and any errors
  const [data, setData] = useState();
  const [error, setError] = useState();

  // Get the currently logged-in user from the authentication context
  const { user, logout, setGlobalError } = useAuthContext();

  // Define a function to fetch the data from the server
  const fetchData = useCallback(() => {
    // Create a variable to keep track of whether the component is still mounted
    let isCurrent = true;
    // Make a fetch request to the API endpoint with the appropriate Authorization header
    fetch(`${process.env.REACT_APP_API_URL}${path}`, {
      headers: { 
        Authorization: `Bearer ${user.token}`,
      },
    })
      // Handle any errors that may occur in the response
      .then(handleErrors)
      // If there are no errors, set the data state variable
      .then((data) => isCurrent && setData(data))
      // If there is an error, set the error state variable
      .catch(async (error) => {
        console.log(error)
        try{
          
        const errormessage = await error.json()
        .then(response => response.error ?? String(error))
        .then(response => {if(response === "Token expired")
        {
          setGlobalError("Token expired");
          logout();
        }
        
        } )

        isCurrent && setError(errormessage)
        }
        catch(ex) {
          console.log(ex)
        }
      });

    // Return a cleanup function that sets isCurrent to false when the component is unmounted
    return () => (isCurrent = false);
  }, [path, logout, setGlobalError, user.token]);
 
  // Call the fetchData function when the component mounts or when path or userId change
  useEffect(() => {
    return fetchData();
  }, [fetchData]);

  // Define a function to manually refresh the data
  const invalidate = () => {
    fetchData();
  };

  // Determine whether the data is still loading
  const isLoading = !error && !data;

  // Return an object with the data, error, isLoading, and invalidate function
  return {
    isLoading,
    data,
    error,
    invalidate,
  };
};

// Export the useFetch hook
export default useFetch;

