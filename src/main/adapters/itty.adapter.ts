import { EnvironmentVars } from '@/infra/config/environment.var';
import { Controller } from '@/presentation/protocols/controller';
import { Environment } from '@/main/config/environments';
import { Request } from 'itty-router';

const envInstance = Environment.getInstance();

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, env: EnvironmentVars): Promise<Response> => {
    const requestAdapted = {
      ...{ body: request.json || {} },
      ...{ query: request.query || {} },
      ...{ params: request.params || {} },
    };
    envInstance.setEnv(env);
    const httpResponse = await controller.handle(requestAdapted);
    return new Response(httpResponse.body, {
      status: httpResponse.statusCode,
    });
  };
};
