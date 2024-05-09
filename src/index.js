'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  // register(/*{ strapi }*/) {},

  register({ strapi }) {
    let routes = [];
    for(const [_, api] of Object.entries(strapi.api)){
      for(const [_, route] of Object.entries(api.routes)){
        routes.push(route.routes);
      }
    }
    
    routes.forEach((route) => {
      route.map((rout) => {
        if(rout.config !== undefined){
          if(typeof rout.config.middlewares === 'undefined'){
            rout.config.middlewares = ["global::my-middleware"]
          }else{
            rout.config.middlewares = ["global::my-middleware"]
          }
        }
      })
    })

    // console.log("routes: ", routes);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],
      async afterCreate(event) {
        // @ts-ignore
        const { result } = event;
        if (result) {

          if (result.subscriberType === "FreeUser") {
            const startDate = new Date(); // Current time
            const endDate = new Date(startDate.getTime() + 10 * 60000); // 10 minutes after startDate (for testing)

            // Change "api::subscription.subscription" to your actual subscription model name
            await strapi.entityService.create(
              // @ts-ignore
              "api::subscription.subscription", // Replace with your model name
              {
                data: {
                  startDate,
                  endDate,
                  status: "active",
                  userId: result.id,
                },
              }
            );
          }
        }
      },
    });
  },
};
