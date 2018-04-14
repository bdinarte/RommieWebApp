import { RommiewebappPage } from './app.po';

describe('rommiewebapp App', function() {
  let page: RommiewebappPage;

  beforeEach(() => {
    page = new RommiewebappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
