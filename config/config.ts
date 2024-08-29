import { defineConfig } from '@umijs/max';
import defaultSettings, { APP_NAME, APP_TITLE } from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  base: `/${APP_NAME}/`,
  publicPath: `/${APP_NAME}/`,
  outputPath: `dist/${APP_NAME}`,
  hash: true,
  // targets: { ie: 11 },
  routes,
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    'root-entry-name': 'variable',
  },
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  fastRefresh: true,
  //============== 以下都是max的插件配置 ===============
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  title: APP_TITLE,
  layout: {
    locale: true,
    ...defaultSettings,
  },
  links: [
    // 页签图标配置
    {
      rel: 'icon',
      href: '//static.avatr.com/pc-website/favicon.ico',
      type: 'image/x-icon',
    },
  ],
  npmClient: 'pnpm',
  /**
   * @name moment2dayjs 插件
   * @description 将项目中的 moment 替换为 dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  /**
   * @name <head> 中额外的 script
   * @description 配置 <head> 中额外的 script
   */
  headScripts: [
    // 解决首次加载时白屏的问题
    { src: '/scripts/loading.js', async: true },
  ],
  //================ pro 插件配置 =================
  define: {
    APP_NAME,
    APP_TITLE,
  },
});
