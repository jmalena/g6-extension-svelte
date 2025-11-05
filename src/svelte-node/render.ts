import { type SvelteComponent, mount, unmount } from "svelte";

/**
 * Render Svelte component
 *
 * @param component Svelte component
 * @param target DOM container
 * @param props Optional props
 */
export function renderSvelte(
  component: typeof SvelteComponent,
  target: Element,
  props?: Record<string, any>,
): SvelteComponent {
  return mount(component, { target, props });
}

/**
 * Unmount Svelte component
 *
 * @param instance SvelteComponent instance
 */
export function unmountSvelte(instance: SvelteComponent) {
  unmount(instance);
}
