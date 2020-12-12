import { Observable } from "rxjs";

import TrackTikClient from "../../clients/tracktik/tracktik.client";
import UserData from "../../data-types/user-data";

//#region Typings

interface UserRepositoryDependencies {
  trackTikClient: TrackTikClient;
}

//#endregion Typings

export class UserRepository {
  private trackTikClient: TrackTikClient;

  constructor({ trackTikClient }: UserRepositoryDependencies) {
    this.trackTikClient = trackTikClient;
  }

  getCurrent(): Observable<UserData | undefined> {
    return this.trackTikClient.getCurrentUser();
  }
}

export default UserRepository;
