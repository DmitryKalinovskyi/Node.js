
export default function ServerMessage(message){

    return `
    <div class="line my-2">
                <div class="server-message">
                    <div class="d-flex justify-content-center text-body-secondary mw-100">
                        ${message}
                    </div>
                </div>
            </div>
            `
}