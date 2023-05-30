const ROUTES = {
    home: "/",
    notFound: "*",
    detail: {
      path: "/house/:id", to: "/house/"
    },

    contact: {
      path: "contact/:houseId", to: "/contact/"
    },

    login: "/login",
    register: "/register",

  };
  
  export default ROUTES;