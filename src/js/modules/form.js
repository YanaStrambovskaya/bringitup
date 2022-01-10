export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.message = {
            loading: 'Loading....',
            success: 'Success!',
            failure: 'Failure(',
            spinner: 'assets/img/spinner.gif',
            ok: 'assets/img/ok.png',
            fail: 'assets/img/fail.png'
        },
        this.path = 'assets/question.php'
    }

    async postData (url, data) {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                form.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(form);

                this.postData(this.path, formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = this.message.success;
                })
                .catch(() => {
                    statusMessage.textContent = this.message.failure;
                })
                .finally(() => {
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 3000);
                });
            })
        })
    };
}