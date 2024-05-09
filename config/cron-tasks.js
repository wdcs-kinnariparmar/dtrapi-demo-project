module.exports = {
  /**
   * Cron job with timezone example.
   * Every Monday at 1am for Asia/Dhaka timezone.
   * List of valid timezones: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
   */

  myJob: {
    /* Add your own logic here */
    task: async ({ strapi }) => {
      const subscriptions = await strapi.entityService.findMany(
        // @ts-ignore
        "api::subscription.subscription"
      );

      subscriptions.map(async (subscription) => {
        const { id, status, endDate } = subscription;
        if (endDate && status === "active" && new Date(endDate) < new Date()) {
          //Inactive subscription after the time expires

          const updateTask = await strapi.entityService.update(
            // @ts-ignore
            "api::subscription.subscription",
            id,
            { data: { ...subscription, status: "inactive" } }
          );
          console.log("updateTask", updateTask);

          //block user after the subscription expires

          // const updateUser = await strapi.entityService.update(
          //   // @ts-ignore
          //   "plugin::users-permissions.user",
          //   id,
          //   { data: { blocked: true } }
          // );
          // console.log("updateUser",updateUser);
        }
      });
    },
    //   options: {
    //     rule: "0 0 1 * * 1",
    //     tz: "Asia/Dhaka",
    //   },

    // only run once after 10 seconds
    // options: new Date(Date.now() + 10000),

    // only run once after 30 minutes
    options: {
      rule: "30 * * * * ",
    },

    // options: {
    //   rule: "* * * * * *",
    //   // start 10 seconds from now
    //   start: new Date(Date.now() + 10000),
    //   // end 20 seconds from now
    //   end: new Date(Date.now() + 20000),
    // },
  },

  /**
   * Simple example.
   * Everyday at 11:15 AM.
   */

  "15 11 * * *": ({ strapi }) => {
    console.log("Everyday at 11:15 AM this cron will work");
    // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
  },
};
