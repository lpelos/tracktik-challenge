import { of } from "rxjs";

import TrackTikClient from "../../clients/tracktik";
import UserRepository from "./user.repository";

describe("UserRepository", () => {
  let repository: UserRepository;
  let trackTikClientMock: TrackTikClient;

  beforeEach(() => {
    trackTikClientMock = { getCurrentUser: jest.fn(() => of()) } as any;
    repository = new UserRepository({ trackTikClient: trackTikClientMock });
  });

  test("should initialize without crashing", () => {
    expect(repository).toBeTruthy();
  });

  test("#getCurrent", () => {
    repository.getCurrent();
    expect(trackTikClientMock.getCurrentUser).toBeCalled();
  });
});
