const handleErrors = (res) => {
   // Check if the response object indicates an error by checking if it is not ok
   if (!res.ok) {
    // If there is an error, reject the Promise with the response object
    return Promise.reject(res);
  }
  // If there is no error, parse the response object as JSON and return the resulting object
  return res.json();
};

// Export the handleErrors function
export { handleErrors };
