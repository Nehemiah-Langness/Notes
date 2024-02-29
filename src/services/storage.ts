

export class Storage<T> {
	constructor(private KEY: string) { }

	protected get() {
		try {
			const data = localStorage.getItem(this.KEY);
			if (!data) {
				return null;
			}

			return JSON.parse(data) as T;
		}
		catch (error) {
			console.error(error);
			return null;
		}
	}

	protected set(data: T) {
		localStorage.setItem(this.KEY, JSON.stringify(data));
	}
}

