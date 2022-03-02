document.getElementById("resetpassword").addEventListener("submit",
    function fetchreset(event) {
        event.preventDefault()
        let password = document.forms["reset"]["password"].value;
        let confirm_password = document.forms["reset"]["confirm_password"].value;

        let url = "userffdffdfdfdfdfdfdfdf/kuhjhjhj"
        let data = { password: password, confirm_password: confirm_password }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
      
                document.getElementById("msg").innerText = data["message"]

            })
            .catch(error => console.log('error:', error));

    })
