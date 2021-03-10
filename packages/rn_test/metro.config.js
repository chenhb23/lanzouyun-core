/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');

console.log("path.resolve(__dirname, '..')", path.resolve(__dirname, '..'));

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    // babelTransformerPath: require.resolve(
    //   'react-native-typescript-transformer',
    // ),
    // getProjectRoots() {
    //   return [
    //     path.resolve(__dirname),
    //     path.resolve(__dirname, 'packages/App'),
    //   ];
    // },
    // extraNodeModules: {
    //   react: path.resolve(__dirname, 'node_modules/react'),
    //   'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    // },
    // getSourceExts() {
    //   return ['ts', 'tsx', 'js', 'jsx'];
    // }
  },
  // watchFolders: [path.resolve(__dirname, '..')],
};
