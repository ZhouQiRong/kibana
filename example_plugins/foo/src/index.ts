import { KibanaPluginConfig } from '@kbn/types';
import { k$, first, toPromise } from '@kbn/observable';
import { BarPluginType } from 'example-plugin-bar';
import { FooConfig } from './foo_config';

export const plugin: KibanaPluginConfig<BarPluginType> = {
  configPath: ['__newPlatform', 'foo'],
  dependencies: ['bar'],
  async plugin(kibana, dependencies) {
    const { bar } = dependencies;

    const log = kibana.logger.get();

    log.info('foo starting');

    log.info(`got value: ${bar.myValue}`);

    const config = await k$(kibana.config.create(FooConfig))(
      first(),
      toPromise()
    );

    log.info(
      `got value from 'foo.encryptionKey' config: ${config.encryptionKey}`
    );
  },
};