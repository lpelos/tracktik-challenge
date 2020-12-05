import { Observable } from "rxjs";

import SiteData from "../../data-types/site-data";
import TrackTickClient from "../../clients/tracktik/tracktik.client";

//#region Typings

interface SiteRepositoryDependencies {
  trackTikClient: TrackTickClient;
}

//#endregion Typings

export class SiteRepository {
  private trackTikClient: TrackTickClient;

  constructor({ trackTikClient }: SiteRepositoryDependencies) {
    this.trackTikClient = trackTikClient;
  }

  find(id: SiteData["id"]): Observable<SiteData> {
    return this.trackTikClient.findSite(id);
  }

  list(): Observable<SiteData[]> {
    return this.trackTikClient.listSites();
  }
}

export default SiteRepository;
