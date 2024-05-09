module.exports = (config, { strapi }) => {

  let urlStr = "";
  const getUserData = async(id) => {
    return new Promise(async (resolve, reject) => {
      let users = await strapi.db.query("plugin::users-permissions.user").findOne({
        where: {id: id},
        populate: ['organization', 'related_users']
      });
      console.log("users++++ getUserData", users);
      if(users && users?.related_users && users.related_users.length > 0){
        await users?.related_users.map(async user => {
          urlStr += `&filters[created_users][id][$in]=${users.id}`
          await getUserData(user.id)                                    
          resolve(urlStr)
        })
      }else{
        resolve(urlStr)
        return urlStr;
      }
    })
  }

  return async (ctx, next) => {
    const {user, auth} = ctx.state;
    let orgName = "";
    let urlParam = "";
    console.log("auth.strategy.name", auth.strategy.name);
    if(auth.strategy.name === 'users-permissions' && ctx.request && ctx.request.header && ctx.request.header.authorization){
        let users = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: {id: user.id},
            populate: ['organization', 'related_users']
        })
        console.log("users", users);
        orgName = users.organization?.organization_name;
        urlParam = `&filters[created_users][id][$in]=${users.id}`;
        urlStr = "";
        const userRelate = await Promise.all([getUserData(users.id)]);
        console.log("userRelate", userRelate);
        urlParam += userRelate[0];

    }else{
      if(auth.credentials !== null){
        let user = await strapi.db.query('admin::api-token').findOne({
          where: {id: auth.credentials.id}
        })
        console.log("user",user);
        orgName = user.name.replace("api-", "")
      }
    }

    // if(ctx.request.method === 'GET' && (orgName !== "" || orgName !== undefined)){
    //   const ptrn = ctx.request.url.indexOf("?") === -1 ? "?" : "&";

    //   ctx.request.url = `${ctx.request.url}${ptrn}filters[organization][organization_name][$in]=${orgName}`;
    //   console.log("ctx.request.url", ctx.request.url);

    // }
    // if(ctx.request.method === 'POST'){
    //   console.log("ctx.state")
    //   if(typeof ctx.state.user !== 'undefined'){
    //     ctx.request.body.data.created_users === ctx.state.user.id;

    //     console.log("ctx.request.body", ctx.request.body);
    //   }

    // }
    await next()
  };
};
