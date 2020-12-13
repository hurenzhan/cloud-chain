import createImportPlugin from 'vite-plugin-import';
import babel from "vite-babel-plugin";

export default {
  plugins: [
    // createImportPlugin([{
    //   libraryName: 'ant-design-vue',
    //   'style': true, // or 'css'
    // }]),
    babel(),
  ],
}