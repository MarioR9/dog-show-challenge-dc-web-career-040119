console.log('connected')

document.addEventListener('DOMContentLoaded', () => {
fetchDogs()

})

function fetchDogs(){
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(dogs => dogs.forEach(addDogsToDom))
}


function addDogsToDom(dog){
    let table = document.querySelector('#table-body')
        let tr = document.createElement('tr')   
            tr.id = dog.id
        let tdName = document.createElement('td')
            tdName.innerText = dog.name
        let tdBreed = document.createElement('td')
            tdBreed.innerText = dog.breed
        let tdSex = document.createElement('td')
            tdSex.innerText = dog.sex
        let tdEdit = document.createElement('button')
            tdEdit.innerText = "Edit Dog"
            tdEdit.addEventListener('click',function(){
                console.log("clicked")
             nameInput = document.querySelector('#dog-form').name.value = dog.name
             breedInput = document.querySelector('#dog-form').breed.value = dog.breed
             sexInput = document.querySelector('#dog-form').sex.value = dog.sex
             form = document.querySelector('#dog-form').dataset.dog = dog.id
             editDog()
            })
            
         table.append(tr)
         tr.append(tdName,tdBreed,tdSex,tdEdit)   
                
}

function editDog(){
   
    formBtn = document.querySelector('#dog-form')
    formBtn.addEventListener('submit', function(e){
        e.preventDefault()    
        let inputName = document.querySelector('#dog-form').name.value
        let inputBreed = document.querySelector('#dog-form').breed.value
        let inputSex = document.querySelector('#dog-form').sex.value 
        let id = parseInt(event.currentTarget.dataset.dog)
        //  console.log("submiting" +" "+ inputName + " "+ inputBreed +" "+  inputSex + " "+ id)
    fetch(`http://localhost:3000/dogs/${id}`,{
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: inputName,
            breed: inputBreed,
            sex: inputSex
            
          })
        })
    .then(response => response.json())
    .then(newDog => {
        console.log("submiting new dog" + "" +newDog)
        
    })    
        })
}

