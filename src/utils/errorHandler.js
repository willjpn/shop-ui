export class ErrorMessage {
    constructor(error) {
        this.message = `${error.response.status}: ${error.response.data}`
    }
}
