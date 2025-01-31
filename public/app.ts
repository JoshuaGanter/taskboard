import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TaskCard } from "./components/task-card";
import { Task } from "../api/types/task";

const _components = [
    TaskCard,
];

@customElement("taskboard-app")
export class TaskboardApp extends LitElement {
    static styles: CSSResultGroup = css`
        .task-container {
            display: flex;
            flex-direction: column;
            gap: 1em;
        }
        .column-container {
            display: flex;
            flex-direction: row;
            gap: 1em;
        }
    `;

    @state()
    private tasks: Task[] = [];

    constructor() {
        super();
        this.getData();
    }

    private async getData() {
        const url = new URL("/api/tasks", window.location.href);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json: Task[] = await response.json();
            this.tasks = json;
            this.requestUpdate();
        } catch (error) {
            console.error(error.message);
        }
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
                <div class="column-container">
                <div class="task-container">
                ${
            this.tasks.filter((task) => task.column_id === 0).map((task) =>
                html`<task-card title="${task.title}" description="${task.description}" ${
                    task.completed ? "completed" : ""
                }></task-card>`
            )
        }
            </div>
            <div class="task-container">
                ${
            this.tasks.filter((task) => task.column_id === 1).map((task) =>
                html`<task-card title="${task.title}" description="${task.description}" ${
                    task.completed ? "completed" : ""
                }></task-card>`
            )
        }
            </div>
            <div class="task-container">
                ${
            this.tasks.filter((task) => task.column_id === 2).map((task) =>
                html`<task-card title="${task.title}" description="${task.description}" ${
                    task.completed ? "completed" : ""
                }></task-card>`
            )
        }
            </div>
            <div class="task-container">
                ${
            this.tasks.filter((task) => task.column_id === 3).map((task) =>
                html`<task-card title="${task.title}" description="${task.description}" ${
                    task.completed ? "completed" : ""
                }></task-card>`
            )
        }
            </div>
            </div>
            </main>
        `;
    }
}
