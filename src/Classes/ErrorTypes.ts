export class PermissionError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "PermissionError";
    this.stack = undefined;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, PermissionError.prototype);
  }
}
