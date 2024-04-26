This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Navigate to the Environment dashboard in Noop Workshop and toggle the `Active` switch.

Clicking the endpoint link from the Environment dashboard will load the app in your browser.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Static Variation

To create an deployment of a Static build, first uncomment the following line in the `next.config.mjs`


```js
...
output: 'export'
...
```

Then, uncomment the static component in the `.noop/blueprint.yaml` file:

```yaml
  - name: NextStatic
    type: static
    image: node:20-alpine
    build:
      steps:
        - copy: [package.json, yarn.lock]
        - run: yarn install --immutable
        - copy: [next.config.mjs, tsconfig.json]
        - copy: public/
        - copy: src/
        - run: yarn build
        - directory: build/
routes:
  - target:
      component: NextStatic # NOTE: updated name here

```

Finally comment out or remove the Service config:

```yaml
...
  # - name: NextSite
  #   type: service
  #   image: node:20-alpine
  #   port: 3000
  #   build:
  #     # 👇 intentional/selective ordering of 'copy' and 'run' steps
  #     # will make it possible to take advantage of cached build
  #     # layers in Noop Workshop (TLDR - speedier subsequent builds!)
  #     steps:
  #       # first copy over dependency files and install...
  #       - copy: [package.json, yarn.lock]
  #       - run: yarn install --immutable
  #       # ...then copy over project files before generating build assets
  #       - copy: [next.config.mjs, tsconfig.json]
  #       - copy: public/
  #       - copy: src/
  #       - run: yarn build
  #   runtime:
  #     command: yarn start
...
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Noop

The same exact config that works for local development also works in Noop Cloud. To deploy on Noop, simply connect your repository and choose a deployment trigger.
