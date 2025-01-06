import { SetMetadata } from '@nestjs/common';

//It sets the metadata for route while compilation time only
export const RequiredPermission = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);
