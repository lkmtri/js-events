module.exports = {
  input: 'lib/index.js',
  output: [
    {
      file: 'dist/eventEmitter.js',
      format: 'cjs',
    },
    {
      file: 'dist/eventEmitter.esm.js',
      format: 'esm',
    },
  ],
};
