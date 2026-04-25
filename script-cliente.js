let dados = JSON.parse(localStorage.getItem('dados')) || [];
let atual = null;
let editando = false;

function salvar() {
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
	abrir(dados.length - 1);
}

function render() {
	const lista = document.getElementById('lista');
	lista.innerHTML = '';

	dados.forEach((d, i) => {
		const div = document.createElement('div');

		let classe = 'card urgencia-' + d.urgencia;
		if (d.restaurado === 'sim') {
			classe = 'card restaurado';
		}

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
	      `Bancada: ${d.bancada}
	      ${d.restaurado === 'sim' ? 'Status: Restaurado\n' : ''}Data: ${d.data}
	      Problema: ${d.problema}
	      Urgência: ${d.urgencia}`;
	document.getElementById('modal').style.display = 'flex';
}

function fechar() {
	document.getElementById('modal').style.display = 'none';
}

function excluir() {
	dados.splice(atual,1);
	localStorage.setItem('dados', JSON.stringify(dados));
	fechar();
	render();
}

function editar() {
	const d = dados[atual];

	document.getElementById('componente').value = d.componente;
	document.getElementById('bancada').value = d.bancada;
	document.getElementById('restaurado').value = d.restaurado;
	document.getElementById('data').value = d.data;
	document.getElementById('problema').value = d.problema;
	document.getElementById('urgencia').value = d.urgencia;

	editando = true;
	fechar();
}

render();
