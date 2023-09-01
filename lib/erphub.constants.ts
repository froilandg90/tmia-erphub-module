/**
 * Injection tokens
 */
export const ERP_API_HOST = Symbol('ERP_API_HOST');
export const ERP_HUB_CONFIG_OPTIONS = Symbol('ERP_HUB_CONFIG_OPTIONS');

// CUSTOM FIELDS
export const ERP_API_CUSTOM_FIELD_PATH_TOKEN = Symbol(
  'ERP_API_CUSTOM_FIELD_PATH_TOKEN',
);
export const ERP_API_CUSTOM_FIELD_PATH_V1_VALUE =
  '/api/v1/order-service/order/add/custom-field';
export const ERP_API_CUSTOM_FIELD_PATH_V2_VALUE =
  '/api/v2/order-service/order/add/custom-field';
export const ERP_API_CUSTOM_FIELD_SERVICE_TOKEN = Symbol(
  'ERP_API_CUSTOM_FIELD_SERVICE_TOKEN',
);

// STATUS
export const ERP_API_STATUS_PATH_V1_TOKEN = Symbol(
  'ERP_API_STATUS_PATH_V1_TOKEN',
);
export const ERP_API_STATUS_PATH_V1_VALUE = 'ccccc';
export const ERP_API_STATUS_SERVICE_TOKEN = Symbol(
  'ERP_API_STATUS_SERVICE_V1_TOKEN',
);
