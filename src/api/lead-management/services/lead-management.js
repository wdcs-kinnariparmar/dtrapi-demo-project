'use strict';

/**
 * lead-management service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lead-management.lead-management');
