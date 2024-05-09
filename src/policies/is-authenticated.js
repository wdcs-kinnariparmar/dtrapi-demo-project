module.exports = (policyContext, config, { strapi }) => {
    console.log("policyContext", policyContext);
    if (policyContext.state.user) { // if a session is open
      // go to next policy or reach the controller's action
      return true;
    }
  
    return false;
  };