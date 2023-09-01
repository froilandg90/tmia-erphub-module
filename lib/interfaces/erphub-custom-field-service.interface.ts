export interface IErpHubCustomFieldService {
  set(
    id: string,
    value: { customFields: { [key: string]: number | string } },
  ): Promise<void>;
}
