window.addEventListener('load', () => {
    const form = document.querySelector("#newPlayerForm")
    const input =document.querySelector("#newPlayer")
    const list_el = document.querySelector("#players")
    let players = JSON.parse(localStorage.getItem('players')) || [];

    const savePlayers = () => {
        localStorage.setItem('players', JSON.stringify(players));
    }

    const loadPlayers = () => {
        players.forEach(player => {
            const player_el = createPlayerElement(player);
            list_el.appendChild(player_el);
        });
    }

// Pelaajan nimen syöttäminen
// Syöttökenttien sisältö tarkistaa tyhjän sisällön varalta
// Syöttökenttien pitää vielä tarkistaa liian pitkä sisältö

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const player = input.value;

        if (!player) {
            alert("Please enter name");
            return;
        }

        players.push({ name: player});
        savePlayers();

        const player_el = createPlayerElement({ name: player});
        list_el.appendChild(player_el);
        form.reset();

    });

// tulostetaan pelaaja:

    const createPlayerElement = (player) => {
        const player_el = document.createElement("div");
        player_el.classList.add("player");
    
        const player_content_el = document.createElement("div");
        player_content_el.classList.add("content");
    
        player_el.appendChild(player_content_el);
    
        const player_input_el = document.createElement("input");
        player_input_el.classList.add("text");
        player_input_el.type = "text";
        player_input_el.value = player.name;
        player_input_el.setAttribute("readonly", "readonly");
    
        player_content_el.appendChild(player_input_el);
    
// tulostetaan pelaajalle laskuri
    
        const counter_el = document.createElement("div");
        counter_el.classList.add("counter");
        counter_el.innerText = player.counter || "0";

        const decrement_el = document.createElement("button");
        decrement_el.classList.add("decrement");
        decrement_el.innerHTML = "-";

        const increment_el = document.createElement("button");
        increment_el.classList.add("increment");
        increment_el.innerHTML = "+";
          
        player_content_el.appendChild(counter_el);

        counter_el.appendChild(decrement_el);
        counter_el.appendChild(increment_el);

// tulostetaan pelaajalle poista ja lisää napit
    
        const player_actions_el = document.createElement("div");
        player_actions_el.classList.add("actions");
    
        const player_edit_el = document.createElement("button");
        player_edit_el.classList.add("edit");
        player_edit_el.innerHTML = "Rename";
    
        const player_delete_el = document.createElement("button");
        player_delete_el.classList.add("delete");
        player_delete_el.innerHTML = "Delete";
    
        player_actions_el.appendChild(player_edit_el);
        player_actions_el.appendChild(player_delete_el);
    
        player_el.appendChild(player_actions_el);

// vähennä ja lisää pisteitä kaavat

        decrement_el.addEventListener('click', () => {
            let counter_value = parseInt(counter_el.innerText);
            counter_value--;
            counter_el.innerText = counter_value.toString();
            player.counter = counter_value; 
            savePlayers(); 
        });
    
        increment_el.addEventListener('click', () => {
            let counter_value = parseInt(counter_el.innerText);
            counter_value++;
            counter_el.innerText = counter_value.toString();
            player.counter = counter_value; 
            savePlayers(); 
        });

// nimeä uudelleen

        player_edit_el.addEventListener('click', () => {
            if (player_edit_el.innerText.toLowerCase() == "rename") {
                player_input_el.removeAttribute("readonly");
                player_input_el.focus();
                player_edit_el.innerText = "Save";
            } else {
                player_input_el.setAttribute("readonly", "readonly");
                player_edit_el.innerText = "Rename";
                player.name = player_input_el.value;
                savePlayers();
            }
    
        });

// poista pelaaja

        player_delete_el.addEventListener('click', () => {
            const confirmDelete = confirm(`Are you sure you want to delete ${player.name}?`);
            if (confirmDelete) {
                const index = players.indexOf(player);
                if (index > -1) {
                    players.splice(index, 1);
                }
                list_el.removeChild(player_el);
                savePlayers();
            }
        });

//

        return player_el;
        
    } // pelaajan tulostamisen loppu

    loadPlayers();

});