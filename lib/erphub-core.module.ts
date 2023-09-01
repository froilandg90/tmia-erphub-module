import { DynamicModule, Global, Module, Scope } from '@nestjs/common';
import {
  EApiVersion,
  ErpHubModuleAsyncOptions,
  ErpHubModuleOptions,
} from './interfaces';
import {
  ERP_API_CUSTOM_FIELD_PATH_TOKEN,
  ERP_API_CUSTOM_FIELD_PATH_V1_VALUE,
  ERP_API_CUSTOM_FIELD_PATH_V2_VALUE,
  ERP_API_CUSTOM_FIELD_SERVICE_TOKEN,
  ERP_API_HOST,
  ERP_HUB_CONFIG_OPTIONS,
} from './erphub.constants';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ErpHubCustomFieldV2Service } from './services';
import { ErpHubCustomFieldV1Service } from './services/erphub-custom-field-v1.service';

@Global()
@Module({})
export class ErpHubCoreModule {
  static forRoot(options: ErpHubModuleOptions): DynamicModule {
    return {
      module: ErpHubCoreModule,
      imports: [HttpModule],
      providers: [
        {
          provide: ERP_API_CUSTOM_FIELD_SERVICE_TOKEN,
          scope: Scope.REQUEST,
          useFactory: async (
            erpHost: string,
            customFieldPath: string,
            httpService: HttpService,
          ) => {
            if (options.version === EApiVersion.V100) {
              return new ErpHubCustomFieldV1Service(
                httpService,
                erpHost,
                customFieldPath,
              );
            } else if (options.version === EApiVersion.V200) {
              return new ErpHubCustomFieldV2Service(
                httpService,
                erpHost,
                customFieldPath,
              );
            } else {
              // DEFAULT
              return new ErpHubCustomFieldV2Service(
                httpService,
                erpHost,
                customFieldPath,
              );
            }
          },
          inject: [ERP_API_HOST, ERP_API_CUSTOM_FIELD_PATH_TOKEN, HttpService],
        },
        {
          provide: ERP_API_HOST,
          useValue: options.host,
        },
        {
          provide: ERP_API_CUSTOM_FIELD_PATH_TOKEN,
          useFactory: async () => {
            if (options.version === EApiVersion.V100) {
              return ERP_API_CUSTOM_FIELD_PATH_V1_VALUE;
            } else if (options.version === EApiVersion.V200) {
              return ERP_API_CUSTOM_FIELD_PATH_V2_VALUE;
            } else {
            }
          },
        },
      ],
      exports: [ERP_API_CUSTOM_FIELD_SERVICE_TOKEN],
    };
  }

  static forRootAsync(options: ErpHubModuleAsyncOptions): DynamicModule {
    return {
      module: ErpHubCoreModule,
      imports: [HttpModule],
      providers: [
        {
          provide: ERP_HUB_CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        {
          provide: ERP_API_CUSTOM_FIELD_SERVICE_TOKEN,
          useFactory: async (
            erpHubModuleOptions: ErpHubModuleOptions,
            customFieldPath: string,
            httpService: HttpService,
          ) => {
            if (erpHubModuleOptions.version === EApiVersion.V100) {
              return new ErpHubCustomFieldV1Service(
                httpService,
                erpHubModuleOptions.host,
                customFieldPath,
              );
            } else if (erpHubModuleOptions.version === EApiVersion.V200) {
              return new ErpHubCustomFieldV2Service(
                httpService,
                erpHubModuleOptions.host,
                customFieldPath,
              );
            } else {
              // DEFAULT
              return new ErpHubCustomFieldV2Service(
                httpService,
                erpHubModuleOptions.host,
                customFieldPath,
              );
            }
          },
          inject: [
            ERP_HUB_CONFIG_OPTIONS,
            ERP_API_CUSTOM_FIELD_PATH_TOKEN,
            HttpService,
          ],
        },
        {
          provide: ERP_API_HOST,
          useFactory: async (erpHubModuleOptions: ErpHubModuleOptions) => {
            return erpHubModuleOptions.host;
          },
          inject: [ERP_HUB_CONFIG_OPTIONS],
        },
        {
          provide: ERP_API_CUSTOM_FIELD_PATH_TOKEN,
          useFactory: async (erpHubModuleOptions: ErpHubModuleOptions) => {
            if (erpHubModuleOptions.version === EApiVersion.V100) {
              return ERP_API_CUSTOM_FIELD_PATH_V1_VALUE;
            } else if (erpHubModuleOptions.version === EApiVersion.V200) {
              return ERP_API_CUSTOM_FIELD_PATH_V2_VALUE;
            } else {
              // DEFAULT
              return ERP_API_CUSTOM_FIELD_PATH_V2_VALUE;
            }
          },
          inject: [ERP_HUB_CONFIG_OPTIONS],
        },
      ],
      exports: [ERP_API_CUSTOM_FIELD_SERVICE_TOKEN],
    };
  }
}
