# ChatGPT Express RESTFUL API

A brief description of what this project does and who it's for

## Error that are appear

> **1. Due to the changing of SDK module, the offical documentation is also unchangeable**

```http
  import { Configuration, OpenAIApi } from "openai";
```

> - Above code is not legit anymore

#### Change to this

```http
  import OpenAI from "openai";
```

> **2. Abort controller is not defined**

```http
    AbortController = AbortControllerPolyfill;
                  ^

ReferenceError: AbortController is not defined
    at file:///C:/Users/nabil/github/servicesync/chatgpt_servicesync/node_modules/openai/_shims/agent.node.mjs:10:19
    at ModuleJob.run (internal/modules/esm/module_job.js:146:23)
    at async Loader.import (internal/modules/esm/loader.js:165:24)
    at async Object.loadESM (internal/process/esm_loader.js:68:5)
```

> - Error like this appear

#### Solve this problem with this

Upgrade nvm and use the version up to 14.16.0. Currently i am using the latest LTS version which is 18.17.1

```http
  import OpenAI from "openai";
```

Then, upgrade the npm package

```http
  npm install -g openai-chatgpt@latest
```
