let dados = JSON.parse(localStorage.getItem('dados')) || [];
let atual = null;
let editando = false;

function salvar() {
    // Check if form exists (Admin only)
    if (!document.getElementById('componente')) return;

    const item = {
        componente: document.getElementById('componente').value,
        bancada: document.getElementById('bancada').value,
        restaurado: document.getElementById('restaurado').value,
        data: document.getElementById('data').value,
        problema: document.getElementById('problema').value,
        urgencia: document.getElementById('urgencia').value
    };

    if (editando) {
        dados[atual] = item;
        editando = false;
    } else {
        dados.push(item);
    }

    localStorage.setItem('dados', JSON.stringify(dados));
    render();
    fechar();
}

function render() {
    const lista = document.getElementById('lista');
    if (!lista) return;
    lista.innerHTML = '<h2>Status de Manutenção</h2>';

    dados.forEach((d, i) => {
        const div = document.createElement('div');
        let classe = 'card urgencia-' + d.urgencia;
        if (d.restaurado === 'sim') classe = 'card restaurado';

        div.className = classe;
        let label = d.restaurado === 'sim' ? '✔ Restaurado' : d.urgencia;

        div.innerHTML = `${d.componente} <span>${label}</span>`;
        div.onclick = () => abrir(i);
        lista.appendChild(div);
    });
}

function abrir(i) {
    atual = i;
    const d = dados[i];
    document.getElementById('mComp').innerText = d.componente;
    document.getElementById('mDados').innerText = 
          `Bancada: ${d.bancada}\n` +
          `${d.restaurado === 'sim' ? 'Status: Restaurado\n' : ''}` +
          `Data: ${d.data}\n` +
          `Problema: ${d.problema}\n` +
          `Urgência: ${d.urgencia}`;
    document.getElementById('modal').style.display = 'flex';
}

function fechar() {
    document.getElementById('modal').style.display = 'none';
}

function excluir() {
    if (confirm("Deseja realmente excluir?")) {
        dados.splice(atual, 1);
        localStorage.setItem('dados', JSON.stringify(dados));
        fechar();
        render();
    }
}

function editar() {
    const d = dados[atual];
    // Fill form only if it exists
    if (document.getElementById('componente')) {
        document.getElementById('componente').value = d.componente;
        document.getElementById('bancada').value = d.bancada;
        document.getElementById('restaurado').value = d.restaurado;
        document.getElementById('data').value = d.data;
        document.getElementById('problema').value = d.problema;
        document.getElementById('urgencia').value = d.urgencia;
        editando = true;
        fechar();
    }
}

render();
