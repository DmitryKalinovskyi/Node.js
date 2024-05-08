
export default function MyMessage(message, title = "You"){
    return `<div class="line my-2">
        <div class="my-message">
            <div class="d-flex justify-content-end mw-100">
                <div class="bg-white p-2 rounded-2 mw-100 overflow-hidden">
                    <div class="sender text-danger mw-100">${title}</div>
                    <div class="content mw-100">${message}</div>
                </div>
            </div>
        </div>
    </div>`
}