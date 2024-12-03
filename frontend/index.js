const caminho = 'http://localhost:3000/cds';

async function getCds() {
    try {
        const response = await fetch(`${caminho}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if(response.ok) {
            return result;
        }
    } catch(error) {
        alert('Erro ao conectar com o servidor');
        return null;
    }
}

async function postCds(nome, genero, preco) {
    try {
        const response = await fetch(`${caminho}/post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                genero: genero,
                preco: preco
            })
        });

        const result = await response.json();

        if(result.ok) {
            alert(result.message || 'CD cadastrado com sucesso!')
        } else {
            alert(result.message || 'Erro ao cadastrar o CD')
        }
    } catch(error) {
        alert('Erro ao conectar com o servidor');
        console.log(error);
    }
}

async function putCd(id, nome, genero, preco) {
    try {
        const response = await fetch(`${caminho}/${id}`, {
            method: 'PUT',
            headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                genero: genero,
                preco: preco
            })
        });

        const result = await response.json();

        if(result.ok) {
            alert(result.message || 'Dados atualizados com sucesso!')
        } else {
            alert(result.message || 'Erro ao atualizar dados do CD')
        }
    } catch(error) {
        alert('Erro ao conectar com o servidor');
        console.log(error);
    }
}

async function deleteCd(id) {
    try {
        const response = await fetch(`${caminho}/${id}`, {
            method: 'DELETE',
            headers: {
                    'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if(result.ok) {
            alert(result.message || 'Dados atualizados com sucesso!')
        } else {
            alert(result.message || 'Erro ao atualizar dados do CD')
        }
    } catch(error) {
        alert('Erro ao conectar com o servidor');
        console.log(error);
    }
}

const inputs = document.querySelector("#inputs").children;
const cadastro = document.querySelector("#cadastro");
const altera = document.querySelector("#altera");
const deleta = document.querySelector("#deleta");
const tabela = document.querySelector("#tabela");

let cds = [];

async function encherGravadora() {
    cds = await getCds();

    if (!cds) return;

    tabela.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Gênero</th>
            <th>Preço</th>
        </tr>`
    cds.forEach(cd => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cd.id}</td>
            <td>${cd.nome}</td>
            <td>${cd.genero}</td>
            <td>${cd.preco}</td>
        `;
        tabela.appendChild(tr);
    });
}

cadastro.addEventListener("click", async () => {
    const nome = inputs[1].value;
    const genero = inputs[2].value;
    const preco = inputs[3].value;
    await postCds(nome, genero, preco);
    inputs[0].value = ''
    inputs[1].value = ''
    inputs[2].value = ''
    inputs[3].value = ''
    encherGravadora();
});

altera.addEventListener("click", async () => {
    const id = inputs[0].value;
    const nome = inputs[1].value;
    const genero = inputs[2].value;
    const preco = inputs[3].value;
    await putCd(id, nome, genero, preco);
    inputs[0].value = ''
    inputs[1].value = ''
    inputs[2].value = ''
    inputs[3].value = ''
    encherGravadora();
});

deleta.addEventListener("click", async () => {
    const id = inputs[0].value;
    await deleteCd(id);
    inputs[0].value = ''
    inputs[1].value = ''
    inputs[2].value = ''
    inputs[3].value = ''
    encherGravadora();
});

cds.forEach(cd => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td> ${cd.id} </td>
    <td> ${cd.nome} </td>
    <td> ${cd.genero} </td>
    <td> ${cd.preco} </td>`
    tabela.appendChild(tr);
});

encherGravadora();
