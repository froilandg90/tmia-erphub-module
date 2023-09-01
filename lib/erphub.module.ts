import { DynamicModule, Module } from '@nestjs/common';
import { ErpHubModuleAsyncOptions, ErpHubModuleOptions} from './interfaces';
import { ErpHubCoreModule } from "./erphub-core.module";
@Module({})
export class ErpHubModule {
  static forRoot(options: ErpHubModuleOptions): DynamicModule {
    return {
      module: ErpHubModule,
      imports: [ErpHubCoreModule.forRoot(options)],
    };
  }

  static forRootAsync(options: ErpHubModuleAsyncOptions): DynamicModule {
    return {
      module: ErpHubModule,
      imports: [ErpHubCoreModule.forRootAsync(options)],
    };
  }
}
