const usercardTemplate = document.querySelector('[data-user-template]');
const usercardcontainer = document.querySelector('[data-user-cards-container]')
const searchinput = document.querySelector('[data-search]');


let users = [] ;
searchinput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    console.log(users);
    users.forEach(user  => {
        const isvisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value);
        user.element.classList.toggle("hide",!isvisible);
        
    });
})



fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(data => {
    
   users = data.map(user => {
        
        const card = usercardTemplate.content.cloneNode(true).children[0];
        console.log(user);
        const header = card.querySelector("[data-header]");
        const body   = card.querySelector("[data-body]");

        header.textContent = user.name;
        
        body.textContent = user.email;
        
        usercardcontainer.append(card)
        return {
            name:user.name , email:user.email , element:card }

        
    });
    
});

