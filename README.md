# Atividade — Conserte a página

**Unidade 3 · HTML Semântico: a Base da Acessibilidade**

Esta é a página da loja fictícia **Harmonia Instrumentos Musicais**. Abra `index.html` no navegador: o layout está alinhado, as cores estão certas, os botões clicam. Nenhum cliente que enxerga reclamou.

A loja recebeu uma reclamação de um cliente que usa leitor de tela. Ele não consegue encontrar o conteúdo principal, não sabe para onde os links levam e desistiu do formulário de contato.

**A página tem 34 problemas de semântica e acessibilidade. Sua tarefa é consertá-los.**

---

## O que você vai entregar

1. Um **fork** deste repositório com o `index.html` corrigido.
2. Uma **página publicada no GitHub Pages** mostrando sua versão corrigida.
3. Um **Pull Request** para este repositório, com o link do seu Pages no corpo do PR.

O Pull Request **é** a entrega. O diff dele mostra exatamente o que você mudou  é isso que será avaliado. Ele não será mesclado; será revisado, comentado e fechado.

---

## Passo a passo

### 1. Faça o fork

Clique em **Fork**, no topo desta página. Você vai ficar com uma cópia do repositório na sua conta.

### 2. Traga para o seu computador

```bash
git clone https://github.com/SEU-USUARIO/acessibilidade-unidade3-atividade.git cd acessibilidade-unidade3-atividade
git checkout -b correcao
```

> Nunca trabalhe direto na branch `main`. Trabalhe na branch `correcao`.

### 3. Conserte o `index.html`

Use o [`CHECKLIST.md`](CHECKLIST.md) como guia. Ele tem 7 blocos de verificação, na mesma ordem da aula: apresentação vs. semântica, cabeçalhos, landmarks, tabelas, links e botões, listas e formulários.

**Regras da correção:**

- Você pode acrescentar, trocar e remover tags HTML à vontade.
- Você pode ajustar os seletores do CSS para acompanhar as tags novas.
- **Mantenha o layout**: mesmas cores, mesmas colunas, mesmos cartões, mesma tabela. Trocar `<div>` por `<main>` ou `<td>` por `<th>` não deve reposicionar nada na tela.
- Exceção: algumas correções **acrescentam informação visível** de propósito o aviso "(abre em nova aba)", o texto "(obrigatório)", o `<caption>` da tabela, a borda do `<fieldset>`e mensagens de erro específicas. Essas mudanças são esperadas.
- Não use JavaScript. Não use ARIA onde uma tag HTML nativa já resolve o problema.
  
> Se ao final a página ficou visualmente equivalente e estruturalmente diferente, você entendeu a aula.

### 4. Faça commits pequenos

Um commit por bloco do checklist ajuda muito na hora da revisão:

```bash
git add index.html
git commit -m "Corrige hierarquia de cabecalhos"
```

Sugestão de mensagens: `Adiciona landmarks`, `Corrige textos de link`, `Transforma tabela de layout em CSS Grid`, `Associa labels aos campos do formulario`.

### 5. Envie para o seu fork

```bash
git push -u origin correcao
```

### 6. Publique no GitHub Pages

No **seu fork**: `Settings` → `Pages` → em **Source**, escolha `Deploy from a branch` → selecione a branch **`correcao`** e a pasta **`/ (root)`** → `Save`.

Espere de 1 a 2 minutos e recarregue a página de Settings. O endereço vai aparecer no topo, no formato:

```
https://SEU-USUARIO.github.io/acessibilidade-unidade3-atividade/
```

**Confira que o link abre a sua versão corrigida** antes de continuar.

Se você não tem certeza de nenhum destes passos, veja o [`GUIA-GIT-E-PAGES.md`](GUIA-GIT-E-PAGES.md), que tem os comandos comentados e o caminho pelo site do GitHub.

### 7. Abra o Pull Request

No seu fork, clique em **Contribute** → **Open pull request**.

- **Base:** `main` deste repositório (o do professor)
- **Compare:** a sua branch `correcao`

O corpo do PR já vem com um formulário. Preencha, principalmente:

- o **link do seu GitHub Pages**;
- a lista dos problemas que você corrigiu, agrupados pelos 7 blocos;
- por que cada troca melhora a experiência de quem usa tecnologia assistiva.

Pronto. A entrega está feita.

---

## Verificação automática

Assim que o PR abrir, um teste automático roda sobre a sua página e publica um relatório. Para ver: aba **Checks** do seu PR → **Acessibilidade** → abra o resumo do job.

O relatório traz validação de HTML e uma varredura WCAG 2.1 AA com o axe-core. Use como apoio mas leia com atenção o que vem a seguir.

Na versão original desta página, as duas ferramentas juntas apontam **menos da metade** dos 34 problemas. O axe encontra 6 tipos de problema; o validador de HTML, 15 erros de sintaxe. Nenhum dos dois percebe:

- textos de link sem sentido isolado ("clique aqui", "saiba mais")
- `<div>` fazendo papel de botão, inalcançável pelo teclado
- lista simulada com `<br>` em vez de `<ul>`
- tabela usada para layout
- `<td>` estilizado no lugar de `<th scope>`
- `<caption>` ausente
- grupo de campos sem `<fieldset>`/`<legend>`
- `<b>`/`<i>`/`<u>` onde cabia `<strong>`/`<em>`/`<ins>`
- texto alternativo que existe mas não descreve nada útil
- mensagens de erro genéricas como "Erro."

**Um relatório limpo não significa que a página está correta.** Essa é, aliás, uma das lições mais importantes da unidade: acessibilidade não se resolve rodando uma ferramenta. O checklist continua sendo o guia.

---

## Como você será avaliado

| Faixa        | Critério                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------- |
| Insuficiente | Menos de 10 itens corrigidos, ou mudanças apenas no CSS                                             |
| Suficiente   | Cabeçalhos e landmarks corrigidos (blocos 2 e 3)                                                    |
| Bom          | Acrescenta links, listas e tabela (blocos 4, 5 e 6)                                                 |
| Excelente    | Formulário completo com `fieldset`/`legend`, `required` e mensagens de erro programáticas (bloco 7) |

Achar 15 problemas com boa justificativa vale mais do que listar 30 sem explicar nenhum. A
justificativa entra no corpo do PR.

---

## Como testar o que você corrigiu

1. **Só com o teclado.** Percorra a página inteira com Tab.
   Você alcança e ativa todos os controles?
   O foco fica visível?
   Na versão original, os dois botões "Adicionar ao carrinho" são inalcançáveis descobrir por quê já resolve um dos 34 problemas.
3. **Com leitor de tela.** No NVDA (gratuito, Windows): `H` pula entre cabeçalhos, `Insert + F7` abre a lista de elementos com as abas Links, Cabeçalhos e     Landmarks, `T` pula entre tabelas, `F` entre campos de formulário. Compare a lista de elementos antes e depois da sua correção.
   No macOS, o VoiceOver (`Cmd + F5`) tem o rotor em `VO + U`.
4. **Validador do W3C.** <https://validator.w3.org/nu/>
5. **Comparação visual.** Abra a original e a sua versão em abas lado a lado.

---

## Como testar a preferência de movimento

Abra `index.html` no navegador e altere a preferência do sistema:

- **Windows 11:** Configurações → Acessibilidade → Efeitos visuais → Efeitos de animação.
- **Windows 10:** Configurações → Facilidade de Acesso → Tela → Mostrar animações no Windows.

| Configuração do sistema | Comportamento esperado |
| --- | --- |
| Animações ativadas | O banner aparece com fade-in ao carregar; os cards aumentam discretamente ao passar o mouse ou focar seus botões; o carrossel troca de categoria com uma transição de opacidade. |
| Animações desativadas (`prefers-reduced-motion: reduce`) | O banner aparece imediatamente; os cards mantêm o tamanho; o carrossel troca de categoria sem transição. |

Recarregue a página para conferir o banner em cada configuração. Para testar o carrossel,
selecione Guitarras, Baterias ou Teclados. Com o teclado, use Tab para chegar ao grupo,
as setas para trocar de categoria e Tab novamente para acessar o link do slide selecionado.
O carrossel avança somente por escolha do usuário. Confira também os temas claro e escuro
e uma janela estreita. Ao terminar, restaure a configuração original de animações do sistema.

A regra CSS responde à mudança de preferência sem exigir recarga. A recarga serve para
repetir a animação de entrada do banner. Consulte a
[documentação de `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
para os caminhos em outros sistemas operacionais.

---

## Cadastro acessível — Parte 1

O formulário saiu da página inicial e está em [`contato.html`](contato.html), acessível
pelo menu **Contato** e pelo link ao final da home. As duas páginas usam `styles.css`,
mantendo os temas claro e escuro e a preferência de movimento reduzido.

Esta etapa acrescenta `cadastro.js` para atender à validação em tempo real. A restrição
de JavaScript da atividade original continua atendida na página inicial.

O cadastro é uma **demonstração local**: não cria contas, não faz requisições de envio
e não grava os dados em cookies, `localStorage` ou `sessionStorage`. O botão confirma
somente a validade dos campos. Sem JavaScript, o envio fica desativado e há uma explicação visível.

Todos os campos têm labels explícitos; os grupos usam `fieldset` e `legend`.
As instruções e mensagens estão associadas com `aria-describedby`, os erros usam
`aria-invalid` e regiões `aria-live="polite"`. Após a primeira saída do campo, a validação durante a digitação aguarda
uma pausa de 350 ms para evitar anúncios a cada tecla; ao sair do campo ou enviar,
a conferência é imediata. Alterar a senha também confere novamente sua confirmação.

### Parte 2 — Validação com feedback acessível

Ao tentar enviar, o resumo no topo do formulário usa `role="alert"`, recebe foco
e apresenta links para cada campo com erro. Ao corrigir um campo, sua mensagem e
`aria-invalid` são removidos, e o resumo é atualizado. Sem erros, o resumo é ocultado.

Teste automatizado de interação: `node .github/scripts/testar-validacao.mjs`.
Requer Playwright e Chromium instalados; a variável `CHROME_PATH` permite usar
um navegador Chromium disponível na máquina.

Para conferir a atividade:

1. Envie o formulário vazio: o foco deve ir para o resumo dos sete campos obrigatórios.
2. Ative um link do resumo: o campo correspondente deve receber foco.
3. Experimente e-mail inválido, CPF com dígitos incorretos, nascimento no futuro,
   senha sem letra ou número e confirmação diferente. Corrija cada valor e confira
   que a mensagem e o estado de erro desaparecem.
4. Deixe telefone, gênero, interesses e origem vazios: eles são opcionais.
   Quando preenchido, o telefone deve incluir DDD e ter 10 ou 11 dígitos, com +55 opcional.
5. Percorra tudo por Tab e Shift+Tab; use setas nos rádios e no select e Espaço nas caixas.
   O campo honeypot não deve aparecer nem entrar na ordem de foco.
6. Aceite os termos e complete os campos obrigatórios: a mensagem deve informar
   que o formulário está válido e que os dados não foram enviados ou armazenados.
7. Confira os temas claro e escuro, uma tela estreita e, quando disponível,
   um leitor de tela como NVDA ou VoiceOver.

A verificação do CPF confere formato e dígitos verificadores; não consulta a Receita Federal.
O honeypot bloqueia a validação local quando preenchido. Em uma futura integração,
o servidor também precisará validar os campos e tratar o honeypot.

Referências: [instruções de formulário](https://www.w3.org/WAI/tutorials/forms/instructions/)
e [notificações de validação](https://www.w3.org/WAI/tutorials/forms/notifications/) da WAI/W3C.

---

## Prazo e dúvidas

Prazo: **09/09/2026**.

Dúvidas sobre a atividade: abra uma **issue** neste repositório. Dúvidas sobre Git e GitHub Pages:
Comece pelo [`GUIA-GIT-E-PAGES.md`](GUIA-GIT-E-PAGES.md).


