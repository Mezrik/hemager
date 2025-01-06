import { defineConfig } from 'orval';

export default defineConfig({
  fencing: {
    output: {
      mode: 'tags-split',
      workspace: 'src/generated/server',
      target: './endpoints',
      schemas: './models',
      client: 'fetch',
      baseUrl: 'http://localhost:3000/api', // TODO: change this to server url from ENV?
      mock: true,
      fileExtension: '.gen.ts',
    },
    input: {
      target: '../internal/interface/server/spec.yaml',
    },
  },
});
