// Select el
const generatePasswordButton = document.querySelector("#generate-password");
const generatePasswordElement = document.querySelector('#generated-password')

const openCloseGeneratorButton = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#length")
const lettersInput = document.querySelector("#letters")
const numbersInput = document.querySelector("#numbers")
const symbolsInput = document.querySelector("#symbols")
const copyPasswordButton = document.querySelector("#copy-password")

//func

const getletterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

const getletterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
}

const getSymbol = () => {
    const symbols = '[]{}(),.;<>:/?°ºª!@#$%¨&*()-_=+§~^`'

    return symbols[Math.floor(Math.random() * symbols.length)];
}

const generatePass = (getletterLowerCase, getletterUpperCase, getNumber, getSymbol)=>{
    let pass = ""
    const passwordLength = +lengthInput.value;
    const generators = []

    if(lettersInput.checked) generators.push(getletterLowerCase, getletterUpperCase)
    if(numbersInput.checked) generators.push(getNumber)
    if(symbolsInput.checked) generators.push(getSymbol)

    console.log(generators.length);

    if(generators.lenght === 0) return;

    for(let i = 0; i < passwordLength; i += generators.length){
        generators.forEach(()=>{
            const randomValue = generators[Math.floor(Math.random() * generators.length)]()

            pass += randomValue
        })
    }
    pass = pass.slice(0, passwordLength)

    generatePasswordElement.style.display = "block" 
    generatePasswordElement.querySelector("h4").innerText = pass
}

//e

generatePasswordButton.addEventListener("click", (e) => {
    e.preventDefault()
    generatePass(getletterLowerCase, getletterUpperCase, getNumber, getSymbol)
})

openCloseGeneratorButton.addEventListener("click", (e)=>{
    generatePasswordContainer.classList.toggle("hide")
})

copyPasswordButton.addEventListener("click", (e)=>{
    e.preventDefault()

    const password = generatePasswordElement.querySelector("h4").innerText
    navigator.clipboard.writeText(password).then(()=>{
        copyPasswordButton.innerText = "Senha copiada com sucesso!"

        setTimeout(() => {
            copyPasswordButton.innerText = "Copiar"
        }, 1500);
    })
})