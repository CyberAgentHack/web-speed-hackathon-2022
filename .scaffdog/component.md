---
name: "component"
root: "src/client"
output:
  - "foundation/components/**/*"
  - "**/internal"
ignore:
  - "**/{A..Z}*"
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

/**
 * @typedef Props
 */

/** @type {React.VFC<Props>} */
export const {{ name }} = () => {
  return <div>{{ name }}</div>;
};
```
