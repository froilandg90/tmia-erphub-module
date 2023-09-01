import { ModuleMetadata } from "@nestjs/common";
import { ErpHubModuleOptions } from "./erphub-module-options.interface";

export interface ErpHubModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<ErpHubModuleOptions> | ErpHubModuleOptions;
    inject?: any[];
}
