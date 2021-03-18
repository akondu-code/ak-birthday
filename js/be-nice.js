const commentContainer = document.getElementById("commentContainer")
const commentAdd = document.getElementById("commentAdd")

const getData = async () => {
    const res = await fetch('https://www.chrischijioke.com/api/benice', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    const data = await res.json()
    if (commentContainer){
        data.posts.forEach(it => {
            commentContainer.innerHTML += `<div class="card">
            <div class="main-comment">${it.body}</div>
            <div class="name"> – ${it.name} </div>
          </div> `
        })
    }
}

const handleSubmit = async e => {
    e.preventDefault()
    const name = document.getElementById("yourName").value
    const body = document.getElementById("yourPost").value

    const res = await fetch('https://www.chrischijioke.com/api/benice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({name, body})
    })

    const data = await res.json()
    if(data.err){
        commentAdd.innerHTML = `<p class="error">${data.err}<p>`
        return
    }
    if(data.msg) {
        commentAdd.innerHTML = `<p class="success">Thank you!! Comment added.<p>`
        return setTimeout(
            () => location.reload(),
            3000,
          )
    }

}

window.addEventListener('load', getData)

document.getElementById("btnId").addEventListener("click", handleSubmit)