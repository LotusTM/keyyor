module.exports = ({ env }) => {
  const isTest = env('test')

  return {
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ],
    presets: [
      '@babel/preset-flow',
      // @todo Note that for service worker we probably want to use different targets
      //       to avoid pushing in not needed polyfills
      [
        '@babel/preset-env',
        isTest
          ? { targets: { node: 'current' } }
          : {
            // Preserve ES6 modules format, needed for tree shaking
            modules: false,
            // @todo We want to use `usage` in future, but for now it breaks `Promise.finally` in Firefox
            useBuiltIns: 'entry',
            corejs: 3
          }
      ],
      '@vue/babel-preset-jsx'
    ]
  }
}
