import { expect, test } from '../support/fixtures/ge';

test('CT02 - Navegar pelo menu até a editoria Seleção Brasileira', async ({
  gePage,
  page
}) => {
  await test.step('Acessar a home do ge', async () => {
    await gePage.acessarHome();
  });

  await test.step('Abrir o menu e selecionar a editoria', async () => {
    await gePage.navegarPeloMenu('seleção brasileira');
  });

  await test.step('Conferir endereço, título, cabeçalho e notícias da editoria', async () => {
    await expect(page).toHaveURL(
      'https://ge.globo.com/futebol/selecao-brasileira/'
    );
    await expect(page).toHaveTitle(/Seleção Brasileira/i);
    await expect(
      gePage.elements.getEditoriaNoCabecalho('seleção brasileira')
    ).toBeVisible();
    const noticias = gePage.elements.getNoticias('futebol/selecao-brasileira/');
    await expect(noticias.first()).toBeVisible();
    await expect(noticias.first()).not.toBeEmpty();
  });
});
