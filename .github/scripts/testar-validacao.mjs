import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const browser = await chromium.launch(process.env.CHROME_PATH
  ? { executablePath: process.env.CHROME_PATH } : {});
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(resolve('contato.html')).href);
  const email = page.locator('#email');
  await email.fill('invalido');
  await page.waitForTimeout(450);
  assert.equal(await email.getAttribute('aria-invalid'), null, 'A primeira validação deve aguardar a saída do campo.');
  await email.press('Tab');
  assert.equal(await email.getAttribute('aria-invalid'), 'true');
  assert.match(await email.getAttribute('aria-describedby'), /\berro-email\b/);
  assert.ok(await page.locator('#erro-email').textContent());
  assert.equal(await page.locator('#resumo-erros').isVisible(), false);

  await page.locator('#cadastro-enviar').click();
  const summary = page.locator('#resumo-erros');
  assert.equal(await summary.getAttribute('role'), 'alert');
  assert.equal(await summary.isVisible(), true);
  assert.equal(await summary.evaluate(el => el === document.activeElement), true);
  assert.equal(await summary.locator('a').count(), 7);
  await summary.locator('a[href="#email"]').click();
  assert.equal(await email.evaluate(el => el === document.activeElement), true);
  await email.fill('pessoa@example.com');
  await page.waitForFunction(() => !document.querySelector('#email').hasAttribute('aria-invalid'));
  assert.equal(await page.locator('#erro-email').textContent(), '');
  assert.equal(await summary.locator('a[href="#email"]').count(), 0);

  await page.locator('#nome').fill('Maria Silva');
  await page.locator('#cpf').fill('529.982.247-25');
  await page.locator('#nascimento').fill('2000-01-01');
  await page.locator('#senha').fill('Segredo123');
  await page.locator('#confirmacao').fill('Segredo123');
  await page.locator('#termos').check();
  await page.locator('#cadastro-enviar').click();
  assert.equal(await summary.isVisible(), false);
  assert.equal(await page.locator('[aria-invalid="true"]').count(), 0);
  assert.match(await page.locator('#cadastro-status').textContent(), /Formulário válido/);
  console.log('Validação: blur, associação de erros, alerta, links, correção e envio válido verificados.');
} finally {
  await browser.close();
}
