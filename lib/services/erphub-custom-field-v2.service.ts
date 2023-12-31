import { Inject, Injectable } from '@nestjs/common';
import { IErpHubCustomFieldService } from '../interfaces';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ErpHubCustomFieldV2Service implements IErpHubCustomFieldService {
  constructor(
    private readonly httpService: HttpService,
    private readonly erpHost: string,
    private readonly customFieldPath: string,
  ) {}

  async set(
    id: string,
    value: { customFields: { [key: string]: number | string } },
  ) {
    const customFields: { [key: string]: number | string } = value.customFields;
    const data = [];
    for (const path of Object.keys(customFields)) {
      data.push({
        op: 'add',
        path,
        value: {
          id: customFields[path],
        },
      });
    }
    const body = {
      id,
      doAsync: false,
      isErpId: false,
      data,
    };

    const url = `${this.erpHost}${this.customFieldPath}`;
    try {
      // this.logger.log(
      //     `[ERP HUB MODULE] ID: ${id} REQUEST TO: PATCH ${baseURL}${endpoint} BODY: ${JSON.stringify(
      //         body,
      //     )}`,
      // );
      const responseObserver = this.httpService.patch(url, body);
      const response = await firstValueFrom(responseObserver);
      // this.logger.log(
      //     `[ERP HUB MODULE] ID: ${id} RESPONSE FROM: PATCH ${baseURL}${endpoint} RESPONSE: ${JSON.stringify(response.status)} ${JSON.stringify(
      //         response.data,
      //     )}`,
      // );
    } catch (e: any) {
      throw new Error(
        `[ERP HUB MODULE] ID: ${id} RESPONSE FROM: PATCH ${url} Exception Msg: ${e.message}`,
      );
    }
  }
}
