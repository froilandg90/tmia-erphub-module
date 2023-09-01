export enum EApiVersion {
  V100,
  V200,
}

export interface ErpHubModuleOptions {
  /*
   * Define the hostname for the ERP HUB service.
   */
  host: string;

  /*
   * Specify the ERP HUB version we want to use.
   */
  version: EApiVersion;
}
