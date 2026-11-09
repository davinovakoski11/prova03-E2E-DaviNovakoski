import { expect } from '@playwright/test';
import GeElements from '../elements/GeElements';
import BasePage from './BasePage';

export default class GePage extends BasePage {
  readonly elements = new GeElements(this.page);

  async preparar(): Promise<void> {
    const aceitarCookies = this.elements.getBotaoAceitarCookies();
    await this.page.addLocatorHandler(aceitarCookies, async () => {
      await aceitarCookies.click();
    });
  }

  async acessarHome(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveURL('https://ge.globo.com/');
    await expect(this.page).toHaveTitle(/ge\.globo/i);
    await expect(this.elements.getBotaoMenu()).toBeVisible();
    await expect(this.elements.getNoticias().first()).toBeVisible();
  }

  async navegarPeloMenu(nome: string): Promise<void> {
    await this.elements.getBotaoMenu().click();
    await expect(this.elements.getMenuNavegacao()).toBeVisible();
    await this.elements.getLinkDoMenu(nome).click();
  }

  async abrirPrimeiraNoticia(caminho = ''): Promise<string> {
    const noticia = this.elements.getNoticias(caminho).first();
    await expect(noticia).toBeVisible();
    await expect(noticia).not.toBeEmpty();
    const url = await noticia.getAttribute('href');
    if (!url) {
      throw new Error('A notícia escolhida deve ter um endereço');
    }
    await noticia.click();
    return url;
  }

  async validarMateria(urlSelecionada: string): Promise<void> {
    await expect(this.page).toHaveURL(urlSelecionada);
    await expect(this.elements.getTituloMateria()).toBeVisible();
    await expect(this.elements.getTituloMateria()).not.toBeEmpty();
    await expect(this.elements.getDataPublicacao()).toBeVisible();
  }
}
