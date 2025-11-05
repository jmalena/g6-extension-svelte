import type { SvelteComponent } from "svelte";
import type { DisplayObjectConfig } from "@antv/g";
import { type BaseNodeStyleProps, HTML } from "@antv/g6";
import { renderSvelte, unmountSvelte } from "/~/svelte-node/render";

export interface SvelteNodeStyleProps extends BaseNodeStyleProps {
  component: [typeof SvelteComponent, Record<string, unknown>];
}

export class SvelteNode extends HTML {
  private svelteInstance?: SvelteComponent;
  private currentComponent?: typeof SvelteComponent;
  private currentProps?: Record<string, unknown>;

  constructor(options: DisplayObjectConfig<SvelteNodeStyleProps>) {
    super(options as any);
  }

  public connectedCallback() {
    super.connectedCallback();
    this.mountOrUpdateSvelte();
  }

  public update(attributes?: Partial<SvelteNodeStyleProps>) {
    super.update(attributes);
    this.mountOrUpdateSvelte();
  }

  private mountOrUpdateSvelte() {
    const {
      component: [Component, props],
    } = this.attributes as unknown as SvelteNodeStyleProps;

    if (this.svelteInstance && this.currentComponent === Component) {
      // Update component
      for (const [key, value] of Object.entries(props)) {
        this.currentProps![key] = value;
      }
    } else {
      if (this.svelteInstance) {
        // Unmount component
        unmountSvelte(this.svelteInstance);
      }

      if (Component) {
        // Mount component
        this.svelteInstance = renderSvelte(
          Component,
          this.getDomElement(),
          props,
        );
        this.currentComponent = Component;
        this.currentProps = props;
      }
    }
  }

  public destroy(): void {
    if (this.svelteInstance) {
      unmountSvelte(this.svelteInstance);
      this.svelteInstance = undefined;
      this.currentComponent = undefined;
      this.currentProps = undefined;
    }

    super.destroy();
  }
}
