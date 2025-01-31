import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

@customElement("task-card")
export class TaskCard extends LitElement {
    static styles: CSSResultGroup = css`
        div {
            border-radius: 4px;
            width: 200px;
            background-color: #333;
            box-shadow: 0px 0px 4px #000;
            padding: 1em;
        }

        .completed {
            text-decoration: line-through;
        }
    `;

    @property()
    public title: string;

    @property()
    public description: string;

    @property()
    public completed: boolean;

    protected render(): TemplateResult {
        return html`
            <div>
                <heading>
                    <h3 class="${
            classMap({ completed: this.completed })
        }">${this.title}</h3>
                </heading>
                <p>
                    ${this.description}
                </p>
            </div>
        `;
    }
}
