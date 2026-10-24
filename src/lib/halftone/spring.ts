// A damped spring that eases a value towards its target. Stiffness and
// damping are per second, so it behaves the same at any frame rate.
export class Spring {
	value: number;
	target: number;
	velocity = 0;

	constructor(
		value: number,
		readonly stiffness: number,
		readonly damping: number,
	) {
		this.value = value;
		this.target = value;
	}

	step(dt: number) {
		const force =
			this.stiffness * (this.target - this.value) -
			this.damping * this.velocity;
		this.velocity += force * dt;
		this.value += this.velocity * dt;
	}

	get settled() {
		return (
			Math.abs(this.velocity) < 1e-3 &&
			Math.abs(this.target - this.value) < 1e-3
		);
	}
}
