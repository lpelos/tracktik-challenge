import { of } from "rxjs";

import SiteRepository from ".";
import TrackTikClient from "../../clients/tracktik";

describe("SiteRepository", () => {
  let repository: SiteRepository;
  let trackTikClientMock: TrackTikClient;

  beforeEach(() => {
    trackTikClientMock = {
      findSite: jest.fn(() => of()),
      listSites: jest.fn(() => of()),
    } as any;

    repository = new SiteRepository({ trackTikClient: trackTikClientMock });
  });

  test("should initialize without crashing", () => {
    expect(repository).toBeTruthy();
  });

  test("#find", () => {
    const siteId = "le-site-id"
    repository.find(siteId);
    expect(trackTikClientMock.findSite).toHaveBeenCalledWith(siteId);
  });

  test("#list", () => {
    repository.list();
    expect(trackTikClientMock.listSites).toHaveBeenCalled();
  });
});
