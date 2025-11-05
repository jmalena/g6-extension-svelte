# g6-extension-svelte

This extension allows you to define G6 nodes using Svelte 5 components.

# Installation

```bash
npm install g6-extension-svelte
```

# Usage

Register the extension as a G6 node type:

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { SvelteNode } from 'g6-extension-svelte';

register(ExtensionCategory.NODE, 'svelte', SvelteNode);
```

# Example

Create a Svelte component for a custom node, e.g. `CustomNode.svelte`:

```svelte
<script lang="ts">
  export let label: string;
  export let disabled = false;
  export let hidden = false;
</script>

{#if !hidden}
  <div class="custom-node" data-disabled={disabled}>
    {label}
  </div>
{/if}

<style>
  .custom-node {
    display: inline-block;
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: white;
    color: #333;
    font-size: 14px;
  }

  .custom-node[data-disabled="true"] {
    opacity: 0.5;
  }
</style>
```

Render `CustomNode.svelte` as a G6 node:

```typescript
import { type NodeData, Graph } from '@antv/g6';
import CustomNode from './CustomNode.svelte';

const graph = new Graph({
  // ... other options
  node: {
    type: 'svelte',
    style: {
      component: (nodeData: NodeData) => {
	    const props = $state({
		  label: nodeData.label,
		  disabled: false,
		  hidden: false,
		});

	    return [CustomNode, props];
	  },
    },
  },
});
```
