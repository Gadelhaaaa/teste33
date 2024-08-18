document.addEventListener('DOMContentLoaded', () => {
    const formCadastroMembro = document.getElementById('form-cadastro-membro');
    const listaMembros = document.getElementById('membros');
    const buscaMembros = document.getElementById('busca');

    const formCadastroPagamento = document.getElementById('form-cadastro-pagamento');
    const listaPagamentos = document.getElementById('pagamentos');
    const buscaPagamentos = document.getElementById('busca-pagamentos');

    function carregarMembros() {
        return JSON.parse(localStorage.getItem('membros')) || [];
    }

    function salvarMembros(membros) {
        localStorage.setItem('membros', JSON.stringify(membros));
    }

    function renderMembros(membros = carregarMembros()) {
        listaMembros.innerHTML = '';
        membros.forEach(membro => {
            const li = document.createElement('li');
            li.textContent = `${membro.id} - ${membro.nome} - ${membro.email} - ${membro.telefone}`;
            li.dataset.id = membro.id;

            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.onclick = () => editarMembro(membro.id);

            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = () => excluirMembro(membro.id);

            li.appendChild(btnEditar);
            li.appendChild(btnExcluir);
            listaMembros.appendChild(li);
        });
    }

    function cadastrarMembro(event) {
        event.preventDefault();
        const nomeMembro = document.getElementById('nome-membro').value;
        const emailMembro = document.getElementById('email-membro').value;
        const telefoneMembro = document.getElementById('telefone-membro').value;
        const idMembro = Date.now();
        const novoMembro = { id: idMembro, nome: nomeMembro, email: emailMembro, telefone: telefoneMembro };

        const membros = carregarMembros();
        membros.push(novoMembro);
        salvarMembros(membros);

        renderMembros();
        formCadastroMembro.reset();
    }

    function editarMembro(id) {
        const membros = carregarMembros();
        const membro = membros.find(m => m.id === id);
        const novoNome = prompt('Edite o nome do membro:', membro.nome);
        const novoEmail = prompt('Edite o email do membro:', membro.email);
        const novoTelefone = prompt('Edite o telefone do membro:', membro.telefone);

        if (novoNome && novoEmail && novoTelefone) {
            membro.nome = novoNome;
            membro.email = novoEmail;
            membro.telefone = novoTelefone;
            salvarMembros(membros);
            renderMembros();
        }
    }

    function excluirMembro(id) {
        let membros = carregarMembros();
        membros = membros.filter(m => m.id !== id);
        salvarMembros(membros);
        renderMembros();
    }

    function buscarMembros() {
        const termoBusca = buscaMembros.value.toLowerCase();
        const membros = carregarMembros().filter(membro =>
            membro.nome.toLowerCase().includes(termoBusca) ||
            membro.email.toLowerCase().includes(termoBusca) ||
            membro.telefone.includes(termoBusca)
        );
        renderMembros(membros);
    }

    function carregarPagamentos() {
        return JSON.parse(localStorage.getItem('pagamentos')) || [];
    }

    function salvarPagamentos(pagamentos) {
        localStorage.setItem('pagamentos', JSON.stringify(pagamentos));
    }

    function renderPagamentos(pagamentos = carregarPagamentos()) {
        listaPagamentos.innerHTML = '';
        pagamentos.forEach(pagamento => {
            const li = document.createElement('li');
            li.textContent = `ID: ${pagamento.id}, Valor: R$${pagamento.valor}, Data: ${pagamento.data}`;
            li.dataset.id = pagamento.id;

            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = () => excluirPagamento(pagamento.id);

            li.appendChild(btnExcluir);
            listaPagamentos.appendChild(li);
        });
    }

    function registrarPagamento(event) {
        event.preventDefault();
        const valorPagamento = document.getElementById('valor-pagamento').value;
        const dataPagamento = document.getElementById('data-pagamento').value;
        const idPagamento = Date.now();
        const novoPagamento = { id: idPagamento, valor: valorPagamento, data: dataPagamento };

        const pagamentos = carregarPagamentos();
        pagamentos.push(novoPagamento);
        salvarPagamentos(pagamentos);

        renderPagamentos();
        formCadastroPagamento.reset();
    }

    function excluirPagamento(id) {
        let pagamentos = carregarPagamentos();
        pagamentos = pagamentos.filter(p => p.id !== id);
        salvarPagamentos(pagamentos);
        renderPagamentos();
    }

    function buscarPagamentos() {
        const termoBusca = buscaPagamentos.value.toLowerCase();
        const pagamentos = carregarPagamentos().filter(pagamento =>
            pagamento.valor.includes(termoBusca) ||
            pagamento.data.includes(termoBusca)
        );
        renderPagamentos(pagamentos);
    }

    if (formCadastroMembro) {
        formCadastroMembro.addEventListener('submit', cadastrarMembro);
        buscaMembros.addEventListener('input', buscarMembros);
    }

    if (formCadastroPagamento) {
        formCadastroPagamento.addEventListener('submit', registrarPagamento);
        buscaPagamentos.addEventListener('input', buscarPagamentos);
    }

    renderMembros();
    renderPagamentos();
});
