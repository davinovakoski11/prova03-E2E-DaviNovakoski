import { test } from '../support/fixtures/ge';

test('CT01 - Abrir uma notícia pela página inicial e conferir a matéria', async ({
  gePage
}) => {
  await test.step('Acessar a home e verificar que há notícias disponíveis', async () => {
    await gePage.acessarHome();
  });

  const urlDaNoticia =
    await test.step('Abrir a primeira notícia do feed', async () => {
      return gePage.abrirPrimeiraNoticia();
    });

  await test.step('Conferir endereço selecionado, título e data de publicação da notícia', async () => {
    await gePage.validarMateria(urlDaNoticia);
  });
});
