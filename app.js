const btnLoad = document.getElementById("btnLoad");
const textLoad = document.getElementById("textLoad")

btnLoad.addEventListener('click', () => loadUsers());

async function loadUsers() {
    btnLoad.disabled = true;
    textLoad.classList.add("active");
    const response = await fetch("https://gp-js-test.herokuapp.com/pizza");
    const allUsers = await response.json();
    const activeUsers = allUsers.party.filter(item => item.eatsPizza);
    renderElementCircle(activeUsers);
    AmountUsers(allUsers.party.length, activeUsers.length);

    btnLoad.disabled = false;
    textLoad.classList.remove("active");
}

function renderElementCircle(activeUsers) {
    const divParts = document.getElementById("parts");
    divParts.style.background = `conic-gradient(${calcPartOfCircle(activeUsers)})`;
    
}

function randomColor() {
    return `#${Math.floor(Math.random() * (999999 - 100000) + 100000)}`;
}

function calcPartOfCircle(activeUsers) {
    const part = 100 / activeUsers.length;
    let strBackground = '';
    for(let i = 0; i < activeUsers.length; i++) {
        const color = randomColor();
        if(i === 0) {
            strBackground += `${color} ${part}% 0%, `; 
        } else {
            strBackground += `${color} ${part * i}% ${part * (i + 1)}% ${ (i + 1) === activeUsers.length ? '' : ',' }`;
        }
    }
    return strBackground;
}

function AmountUsers(amount, amountActive) {
    const info = document.getElementById('info');
    info.innerHTML = `participants: ${amount} pizza eaters: ${amountActive}`;
}



