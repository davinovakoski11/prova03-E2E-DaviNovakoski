import { expect, test } from '../support/fixtures/ge';

test('CT03 - Consultar a classificação do Brasileirão Série A pelo menu', async ({
  gePage,
  page
}) => {
  const quantidadeDeTimes = 20;

  await test.step('Acessar a home e abrir o Brasileirão pelo menu', async () => {
    await gePage.acessarHome();
    await gePage.navegarPeloMenu('brasileirão');
  });

  await test.step('Conferir a página do campeonato e a seção Tabela', async () => {
    await expect(page).toHaveURL(
      'https://ge.globo.com/futebol/brasileirao-serie-a/'
    );
    await expect(page).toHaveTitle(/Brasileirão Série A/i);
    await expect(gePage.elements.getSecaoTabela()).toBeVisible();
  });

  await test.step('Validar 20 clubes e posições de 1 a 20 em ordem', async () => {
    const linhas = gePage.elements.getLinhasClassificacao();
    await expect(linhas).toHaveCount(quantidadeDeTimes);
    await expect(linhas).toHaveText(
      Array.from(
        { length: quantidadeDeTimes },
        (_, i) => new RegExp(`^${i + 1}\\D`)
      )
    );

    const nomes = gePage.elements.getTabelaClassificacao().getByRole('strong');
    await expect(nomes).toHaveText(Array(quantidadeDeTimes).fill(/\p{L}{3,}/u));
    const clubes = (await nomes.allTextContents()).map(nome => nome.trim());
    expect(new Set(clubes).size, 'Os clubes não devem se repetir').toBe(
      quantidadeDeTimes
    );
  });

  await test.step('Validar colunas, pontuação em ordem e consistência dos dados', async () => {
    await expect(
      gePage.elements.getTabelaPontuacao().getByRole('columnheader')
    ).toHaveText([
      'P',
      'J',
      'V',
      'E',
      'D',
      'GP',
      'GC',
      'SG',
      '%',
      /últ\. jogos/i
    ]);

    const linhas = gePage.elements.getLinhasPontuacao();
    await expect(linhas).toHaveCount(quantidadeDeTimes);
    const dados = (await linhas.allInnerTexts()).map(texto =>
      texto.trim().split(/\s+/).slice(0, 8).map(Number)
    );

    const pontos = dados.map(linha => linha[0]);
    expect(pontos).toEqual([...pontos].sort((a, b) => b - a));

    for (const [indice, linha] of dados.entries()) {
      expect(linha).toHaveLength(8);
      expect(linha.every(Number.isInteger)).toBe(true);
      const [, jogos, vitorias, empates, derrotas, golsPro, golsContra, saldo] =
        linha;
      expect(jogos, `${indice + 1}º: J = V + E + D`).toBe(
        vitorias + empates + derrotas
      );
      expect(saldo, `${indice + 1}º: SG = GP - GC`).toBe(golsPro - golsContra);
    }
  });
});
