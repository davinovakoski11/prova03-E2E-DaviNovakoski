import { Locator } from '@playwright/test';
import BaseElements from './BaseElements';

export default class GeElements extends BaseElements {
  getBotaoAceitarCookies(): Locator {
    return this.page.getByRole('button', { name: 'Prosseguir', exact: true });
  }

  getBotaoMenu(): Locator {
    return this.page.getByRole('button', { name: 'Menu', exact: true }).first();
  }

  getMenuNavegacao(): Locator {
    return this.page.getByRole('navigation');
  }

  getLinkDoMenu(nome: string): Locator {
    return this.getMenuNavegacao().getByRole('link', {
      name: nome,
      exact: true
    });
  }

  getEditoriaNoCabecalho(nome: string): Locator {
    return this.page
      .getByRole('banner')
      .getByRole('link', { name: nome, exact: true });
  }

  getNoticias(caminho = ''): Locator {
    return this.page
      .getByRole('main')
      .getByRole('heading', { level: 2 })
      .getByRole('link')
      .and(
        this.page.locator(
          `a[href^="https://ge.globo.com/${caminho}"][href*="/noticia/"]`
        )
      );
  }

  getTituloMateria(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  getDataPublicacao(): Locator {
    return this.page.getByRole('main').getByRole('time').first();
  }

  getSecaoTabela(): Locator {
    return this.page.getByRole('article').filter({
      has: this.page.getByRole('heading', { name: 'Tabela', exact: true })
    });
  }

  getTabelaClassificacao(): Locator {
    return this.getSecaoTabela()
      .getByRole('table')
      .filter({
        has: this.page.getByRole('columnheader', {
          name: 'Classificação',
          exact: true
        })
      });
  }

  getTabelaPontuacao(): Locator {
    return this.getSecaoTabela()
      .getByRole('table')
      .filter({
        has: this.page.getByRole('columnheader', { name: 'P', exact: true })
      });
  }

  getLinhasClassificacao(): Locator {
    return this.getTabelaClassificacao()
      .getByRole('rowgroup')
      .nth(1)
      .getByRole('row');
  }

  getLinhasPontuacao(): Locator {
    return this.getTabelaPontuacao()
      .getByRole('rowgroup')
      .nth(1)
      .getByRole('row');
  }
}
