import type { Schema, Attribute } from '@strapi/strapi';

export interface DynamicFieldsDynamicField extends Schema.Component {
  collectionName: 'components_dynamic_fields_dynamic_fields';
  info: {
    displayName: 'DynamicField';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    type: Attribute.Enumeration<
      ['text', 'email', 'number', 'boolean', 'select', 'password']
    >;
    options: Attribute.JSON;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'dynamic-fields.dynamic-field': DynamicFieldsDynamicField;
    }
  }
}
