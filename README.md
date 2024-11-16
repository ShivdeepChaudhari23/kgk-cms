This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Install the repository.

2. Setup environment variables in .env file at the root level as follows:
```NEXT_PUBLIC_API_URL="http://localhost:{BACKEND_SERVER_PORT_NUMBER}/content"```

3. Install dependencies:
```npm install```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Creating New Plugin
```
export interface Plugin {
  id: string;
  name: string;
  install: (editor: any) => void;
}
```

- Register the custom blot using Quill.register(CustomBlot);

- In the install function, add logic to append plugin action button in toolbar of the editor.

- Add the callback for handling the click action on the toolbar button of plugin.

- Run the project again.

- Refer to a sample embedded video plugin in `VideoEmbedPlugin.ts` to create a new plugin with following schema.
  
