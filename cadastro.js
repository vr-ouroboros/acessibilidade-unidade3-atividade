(() => {
  'use strict';

  const form = document.getElementById('cadastro');
  const fields = [...form.querySelectorAll('[data-validar]')];
  const summary = document.getElementById('resumo-erros');
  const summaryTitle = document.getElementById('resumo-erros-titulo');
  const errorList = document.getElementById('lista-erros');
  const status = document.getElementById('cadastro-status');
  const password = document.getElementById('senha');
  const confirmation = document.getElementById('confirmacao');
  const touched = new Set();
  const timers = new Map();
  const errors = new Map();
  const labels = {
    nome: 'Nome completo',
    email: 'E-mail',
    cpf: 'CPF',
    nascimento: 'Data de nascimento',
    telefone: 'Telefone',
    senha: 'Senha',
    confirmacao: 'Confirmação de senha',
    termos: 'Aceite dos termos',
  };
  let submitted = false;

  function today() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function validCPF(value) {
    if (!/^(?:\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(value)) return false;
    const digits = value.replace(/\D/g, '');
    if (/^(\d)\1{10}$/.test(digits)) return false;
    for (const length of [9, 10]) {
      let sum = 0;
      for (let index = 0; index < length; index++) {
        sum += Number(digits[index]) * (length + 1 - index);
      }
      const remainder = sum % 11;
      const checkDigit = remainder < 2 ? 0 : 11 - remainder;
      if (checkDigit !== Number(digits[length])) return false;
    }
    return true;
  }

  function validationMessage(field) {
    if (field.id === 'termos') return field.checked ? '' : 'Leia e aceite os termos para continuar.';
    const value = field.type === 'password' ? field.value : field.value.trim();
    if (field.id === 'nascimento') {
      field.max = today();
      if (field.validity.badInput) return 'Informe uma data de nascimento completa e válida.';
    }
    if (!value) return field.required ? `Preencha o campo ${labels[field.id].toLowerCase()}.` : '';
    switch (field.id) {
      case 'nome':
        return /\p{L}/u.test(value) ? '' : 'Informe seu nome completo, usando letras.';
      case 'email':
        return field.validity.typeMismatch ? 'Informe um e-mail no formato nome@exemplo.com.' : '';
      case 'cpf':
        return validCPF(value) ? '' : 'Informe um CPF válido com 11 dígitos, como 000.000.000-00.';
      case 'nascimento':
        return field.validity.rangeOverflow ? 'A data de nascimento não pode estar no futuro.' : '';
      case 'telefone': {
        if (!/^[\d\s()+.-]+$/.test(value)) return 'Informe DDD e telefone com 10 ou 11 dígitos; o código +55 é opcional.';
        let digits = value.replace(/\D/g, '');
        if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) digits = digits.slice(2);
        return /^[1-9]\d{9,10}$/.test(digits) ? '' : 'Informe DDD e telefone com 10 ou 11 dígitos; o código +55 é opcional.';
      }
      case 'senha':
        return [...value].length >= 8 && /\p{L}/u.test(value) && /\d/.test(value)
          ? '' : 'Use pelo menos 8 caracteres, incluindo uma letra e um número.';
      case 'confirmacao':
        return value === password.value ? '' : 'As senhas precisam ser iguais. Confira a confirmação.';
      default:
        return '';
    }
  }

  function validate(field) {
    const message = validationMessage(field);
    const error = document.getElementById(`erro-${field.id}`);
    // Update live regions only when the message changes, without exposing entered values.
    if (error.textContent !== message) error.textContent = message;
    field.setCustomValidity(message);
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      errors.set(field.id, message);
    } else {
      field.removeAttribute('aria-invalid');
      errors.delete(field.id);
    }
  }

  function updateSummary() {
    if (!submitted) return;
    errorList.replaceChildren();
    summary.hidden = errors.size === 0;
    summaryTitle.textContent = `Revise ${errors.size} ${errors.size === 1 ? 'campo' : 'campos'}`;
    for (const field of fields) {
      if (!errors.has(field.id)) continue;
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${field.id}`;
      link.textContent = `${labels[field.id]}: ${errors.get(field.id)}`;
      link.addEventListener('click', () => field.focus());
      item.append(link);
      errorList.append(item);
    }
  }

  function validateChangedField(field) {
    clearTimeout(timers.get(field.id));
    timers.delete(field.id);
    validate(field);
    if (field === password && touched.has(confirmation.id)) validate(confirmation);
    updateSummary();
  }

  for (const field of fields) {
    field.addEventListener('blur', () => {
      touched.add(field.id);
      validateChangedField(field);
    });
  }

  form.addEventListener('input', (event) => {
    status.textContent = '';
    const field = event.target;
    if (!fields.includes(field) || event.isComposing || !touched.has(field.id)) return;
    clearTimeout(timers.get(field.id));
    // Allow a brief typing pause before announcing validation feedback.
    timers.set(field.id, setTimeout(() => validateChangedField(field), 350));
  });

  form.addEventListener('change', (event) => {
    status.textContent = '';
    if (!fields.includes(event.target)) return;
    touched.add(event.target.id);
    validateChangedField(event.target);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    for (const timer of timers.values()) clearTimeout(timer);
    timers.clear();
    status.textContent = '';
    if (document.getElementById('website').value.trim()) {
      status.textContent = 'Não foi possível validar este formulário. Atualize a página e tente novamente.';
      status.focus();
      return;
    }
    submitted = true;
    for (const field of fields) {
      touched.add(field.id);
      validate(field);
    }
    updateSummary();
    if (errors.size) {
      summary.focus();
      return;
    }
    status.textContent = 'Formulário válido. Esta demonstração não envia nem armazena seus dados.';
    status.focus();
  });

  document.getElementById('nascimento').max = today();
  // Enable submit only after its local-only handler is installed.
  form.noValidate = true;
  document.getElementById('cadastro-enviar').disabled = false;
})();
