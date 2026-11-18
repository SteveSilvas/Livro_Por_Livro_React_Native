const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  };

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg', 'env'], // Adiciona .svg e .env ao resolver
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          if (name === 'dotenv') {
            // Ignora a importação do módulo dotenv em ambientes de produção
            return {
              config: () => {
                return;
              },
            };
          }
          return name;
        },
      }
    ),
  };

  return config;
})();
