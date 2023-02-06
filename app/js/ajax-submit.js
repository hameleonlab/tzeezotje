var form_ajax_arr = document.querySelectorAll('form.ajax');
if (form_ajax_arr) {
    form_ajax_arr.forEach(form_ajax => {
        form_ajax.addEventListener("submit", function(e){
            e.preventDefault();
            console.log(this.querySelector('input[name="name"]').value);
            let postObj = {
                name: this.querySelector('input[name="name"]').value, 
                email: this.querySelector('input[name="email"]').value, 
                comment: this.querySelector('textarea[name="comment"]').value,
            }

            let post = JSON.stringify(postObj)
            const url = form_ajax.getAttribute("action");
            let xhr = new XMLHttpRequest()
            xhr.open('POST', url, true)
            xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
            xhr.send(post);
            xhr.onload = function () {
                if(xhr.status === 200) {
                    form_ajax.textContent = 'Request successfully created!';
                } else {
                    form_ajax.textContent = 'Request send error!';
                }
            }
        });
    });
}