export default {
  dev: {
    '/api': {
      target: '',
      changeOrigin: true,
      pathRewrite: {
        '/api': '',
      },
    },
  },
  test: {},
};
