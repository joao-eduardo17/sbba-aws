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
            return result.id;
        }
    } catch(error) {
        alert('Erro ao conectar com o servidor');
        return null;
    }
}

async function postCd(nome, genero, preco) {
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