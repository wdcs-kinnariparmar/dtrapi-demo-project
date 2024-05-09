module.exports = {
    async afterCreate(event) {
        const {result} = event;
        if(result){
            await strapi.entityService.create(
                // @ts-ignore
                "api::user-journey.user-journey",
                {data: {
                    title: `create a ${result.name} leads`
                }}
            );
        }
    },
    async afterUpdate(event) {
        const {result} = event;
        if(result){
            await strapi.entityService.create(
                // @ts-ignore
                "api::user-journey.user-journey",
                {data: {
                    title: `update a ${result.name} leads`
                }}
            );
        }
        
    },
    async afterDelete(event) {
        const {result} = event;
        if(result){
            await strapi.entityService.create(
                // @ts-ignore
                "api::user-journey.user-journey",
                {data: {
                    title: `delete a ${result.name} leads`
                }}
            );
        }
        
    }
}