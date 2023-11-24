const btn = document.querySelector('#search')
const result = document.querySelector('#result')

btn.addEventListener('click', async function fetchPhoto() {
    const inputText = document.querySelector('#searchInput').value

    if (inputText === '') {
        alert('Escreve alguma coisa burro')
    } else {
        result.innerHTML = ''
        try {
            const response = await fetch(`http://localhost:3000/api/photos?query=${inputText}`)
            const photos = await response.json()
    
            photos.forEach(photo => {
                const URL = photo.urls.regular
    
                const newContainer = document.createElement('div')
                const newIMG = document.createElement('img')
    
                newIMG.src = URL
    
                newContainer.appendChild(newIMG)
                result.appendChild(newContainer)
            })
        } catch (error) {
            console.error('Erro ao buscar fotos: ', error)     
            alert('Ocorreu um erro ao buscar as fotos. Tente novamente')   
        }
    }
})
