import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("taskboard-app")
export class TaskboardApp extends LitElement {
    static styles: CSSResultGroup = css``;

    constructor() {
        super();
    }

    protected render(): TemplateResult {
        return html`
            <main>
                <heading>
                    <h1>Hello world!</h1>
                </heading>
                <p>
                    This is the taskboard app.
                </p>
            </main>
        `;
    }
}
