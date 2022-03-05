---
name: "page"
root: "src/client/foundation/pages"
output: "**/*"
ignore:
  - "**/{A..Z}*"
  - "**/{A..Z}**/*"
questions:
  name: "コンポーネント名を入力してください"
---

# Variables

- name: `{{ inputs.name | pascal }}`

# `{{ name }}/index.js`

```javascript
export * from "./{{ name }}";
```

# `{{ name }}/{{ name }}.jsx`

```javascript
import React from "react";

/** @type {React.VFC} */
export const {{ name }} = () => {
  return <div>{{ name }}</div>;
};
```
