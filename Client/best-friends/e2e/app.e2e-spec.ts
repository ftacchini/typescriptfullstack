import { BestFriendsPage } from './app.po';

describe('best-friends App', function() {
  let page: BestFriendsPage;

  beforeEach(() => {
    page = new BestFriendsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
