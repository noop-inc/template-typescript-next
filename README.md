This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Navigate to the Environment dashboard in Noop Workshop and toggle the `Active` switch.

Clicking the endpoint link from the Environment dashboard will load the app in your browser.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Static Variation

To create an deployment of a Static build, first set the `output` configuration to `'export'` in the `next.config.mjs` file.

Then, uncomment the static component in the `.noop/blueprint.yaml` file:

```yaml
  - name: NextStatic
    type: static
    image: node:20-alpine
    build:
      steps:
        - copy: [package.json, package-lock.json]
        - run: npm ci
        - copy: [next.config.mjs, tsconfig.json]
        - copy: public/
        - copy: src/
        - run: npm run build
        - directory: .next/
routes:
  - target:
      component: NextStatic # NOTE: updated name here

```

Finally comment out or remove the Service config:

```yaml
  # - name: NextSite
  #   type: service
  #   image: node:20-alpine
  #   port: 3000
  #   build:
  #     # 👇 intentional/selective ordering of 'copy' and 'run' steps
  #     # will make it possible to take advantage of cached build
  #     # layers in Noop Workshop (TLDR - speedier subsequent builds!)
  #     steps:
  #       - directory: /app
  #       # first copy over dependency files and install...
  #       - copy: [package.json, package-lock.json]
  #       - run: npm ci
  #       # ...then copy over project files before generating build assets.
  #       - copy: [next.config.mjs, tsconfig.json]
  #       - copy: public/
  #       - copy: src/
  #       - run: npm run build
  #       - run: ls .next
  #       # A multi-stage build reduces the overall size of the resulting build.
  #       # A smaller build can result in speedier deployments on Noop Cloud.
  #       - image: node:20-alpine
  #         stage: runner
  #       # Following Dockerfile used as reference for assets to copy over into
  #       # `runner` stage when Next.js's `standalone` output mode is enabled:
  #       # https://github.com/vercel/next.js/blob/c0562529dbfcafab252e08bf49d702d4c652aaa1/examples/with-docker/Dockerfile
  #       - directory: /app
  #       - copy: /app/public
  #         destination: ./public
  #         from: main
  #       - run: mkdir .next
  #       - copy: /app/.next/standalone
  #         destination: ./
  #         from: main
  #       - copy: /app/.next/static
  #         destination: ./.next/static
  #         from: main
  #   runtime:
  #     command: node server.js
  #     variables:
  #       NODE_ENV: "production"
  #       HOSTNAME: "0.0.0.0"
  #       PORT: "3000"
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Noop

The same exact config that works for local development also works in Noop Cloud. To deploy on Noop, simply connect your repository and choose a deployment trigger.
