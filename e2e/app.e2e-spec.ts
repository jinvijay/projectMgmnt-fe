import { ProjectMgmntFePage } from './app.po';

describe('project-mgmnt-fe App', function() {
  let page: ProjectMgmntFePage;

  beforeEach(() => {
    page = new ProjectMgmntFePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
