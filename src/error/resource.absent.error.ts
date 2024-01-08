export default class ResourceAbsentError extends Error {
    constructor(message: string) {
        super(message);
    }
}