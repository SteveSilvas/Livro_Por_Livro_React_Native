const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
    resolver: {
      sourceExts: [...sourceExts, 'env'], // Adiciona a extensão .env ao resolver de arquivos
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
    },
  };
})();
