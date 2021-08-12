const submitRegisterUser = () =>{
    const form = document.forms[0]
    const username = form.querySelector('input[name="username"]').value
    const email = form.querySelector('input[name="email"]').value
    const password = form.querySelector('input[name="password"]').value
    const repeat = form.querySelector('input[name="repeat"]').value

    //validating the form
    if(!username || !email || !password || !repeat){
        console.log('form not complete')
        return
    }else if(username === '' || email === '' || password === '' || repeat === ''){
        console.log('empty field')
        return
    }else if(password !== repeat){
        console.log('passwords do not match')
        return
    }

    const url = 'http://localhost:8000/user/register'
    const body = JSON.stringify({
        username,
        email,
        password
    })

    fetch(url, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body
    })
    .then((result) => {
        result.json().then((res) =>{
            console.log(res)
            if(res.success){
                window.location.href = "http://localhost:8000/"
            }
        })
    }).catch((err) => {
        console.log(err)
    });
}

const submitLoginForm = () =>{
    const form = document.forms[0]
    const username = form.querySelector('input[name="username"]').value
    const password = form.querySelector('input[name="password"]').value
    
    if(!username || !password){
        console.log('form not complete')
        return
    }else if(username === '' || password === ''){
        console.log('form is empty')
        return
    }

    const url = 'http://localhost:8000/user/login'
    const body = JSON.stringify({
        username,
        password
    })
    fetch(url,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body
    }).then((result) => {
        result.json().then((res) =>{
            if(res.error) console.log('user not found')
            if(res.success){
                window.localStorage.setItem('token', 'token')
                console.log('set token ')
                console.log(window.localStorage.getItem('token'))
                window.location.href = "http://localhost:8000/authenticated"
            }
        })
    }).catch((err) => {
        console.log(err)
    })
}

const navigateToRegister = () =>{
    window.location.href = "http://localhost:8000/register"
}

const logout = () =>{
    window.localStorage.removeItem('token')
    window.location.href='http://localhost:8000/'
}


