const ROUTES = {
    home: "/",
    notFound: "*",
    detail: {
      path: "/detail/:houseId", to: "/detail/"
    },

    contact: {
      path: "contact/:houseId", to: "/contact/"
    },

    login: "/login",
    register: "/register",

  };
  
  export default ROUTES;