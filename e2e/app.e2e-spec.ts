import { FrontendTccPage } from './app.po';

describe('frontend-tcc App', () => {
  let page: FrontendTccPage;

  beforeEach(() => {
    page = new FrontendTccPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
