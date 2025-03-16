// jest.config.js
module.exports = {
  testEnvironment: 'jsdom', // Use jsdom for React testing
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to transform JS/JSX files
  },
  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs',
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
},
  transformIgnorePatterns: [
    // Allow Jest to transform `axios` (or other ES modules)
    '/node_modules/(?!axios)',
    "node_modules/(?!(@mui|@babel)/)"
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/index.js",
    "<rootDir>/src/Pages/Dashboard/*"
  ],
};