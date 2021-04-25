# Revue API Client

## Getting Started

    yarn add twitter-revue-client

## Setting Up

```ts
import RevueClient from "twitter-revue-client";

const revueClient = new RevueClient({ token: process.env.REVUE_API_TOKEN });
```

## Methods

See [./src/client.ts](./src/client.ts) for all available methods.

Also see [Revue API docs](https://www.getrevue.co/api).

```ts
await revueClient.getAllIssues();

await revue.addSubscriber({
  email: "abc@123.com",
  first_name: "Abe",
  last_name: "Crinkle",
  double_opt_in: false,
});
```

## Hiring

Uplift is hiring! Work on fun projects with us! [Apply](https://www.uplift.ltd/careers/)
