
export default function Message(owner, message){

    return `<div class="line my-2">
                <div class="user-message d-flex justify-content-start">
                    <div class="bg-white p-2 rounded-2 mw-100">
                        <div class="sender text-danger mw-100">${owner}</div>
                        <div class="content mw-100">${message}</div>
                    </div>
                </div>
            </div>`
}