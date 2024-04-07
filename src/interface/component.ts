export abstract class Component {
    protected id: string;
    protected resolve!: (value: unknown) => void;
    public onRendered;

    constructor(id: string) {
        this.id = id;
        this.onRendered = new Promise((resolve) => {
            this.resolve = resolve;
        });
    }

    public abstract render(): void;

    protected abstract getContainer(): Element;
}