module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  preset: 'ts-jest/presets/default-esm' ,
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest', // Handles both .js and .ts files
  },
  testEnvironment: 'jsdom', 
};
