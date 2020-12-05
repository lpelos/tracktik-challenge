import { of } from "rxjs";

import FIND_SITE_RESPONSE from "../../__fixtures__/find-site-response.fixture";
import HttpClient, { HttpResponse } from "../http";
import LIST_SITES_RESPONSE from "../../__fixtures__/list-sites-response.fixture";
import SiteData from "../../data-types/site-data";
import TrackTikClient from "./tracktik.client";

describe("TrackTikClient", () => {
  const host = "https//example.com";

  let httpClientMock: HttpClient;
  let client: TrackTikClient;

  beforeEach(() => {
    httpClientMock = { get: jest.fn(() => of()) } as any;
    client = new TrackTikClient({ host, httpClient: httpClientMock });
  });

  test("should initialize without crashing", () => {
    expect(client).toBeTruthy();
  });

  describe("site APIs", () => {
    describe("#findSite", () => {
      const json = FIND_SITE_RESPONSE;
      const siteId = json.id;

      beforeEach(() => {
        httpClientMock.get = jest.fn(() =>
          of({
            body: FIND_SITE_RESPONSE,
            header: {},
            status: 200,
          } as HttpResponse)
        );
      });

      test("resquest", () => {
        client.findSite(siteId);

        expect(httpClientMock.get).toHaveBeenCalledWith({
          url: `${host}/sites/${siteId}`,
        });
      });

      test("response", (done) => {
        client.findSite(siteId).subscribe((resp) => {
          const site: SiteData = {
            address: {
              city: json.address.city,
              country: json.address.country,
              state: json.address.state,
              street: json.address.street,
              zipCode: json.address.zipCode,
            },
            contact: {
              address: {
                city: json.contacts.main.address.city,
                country: json.contacts.main.address.country,
                state: json.contacts.main.address.state,
                street: json.contacts.main.address.street,
                zipCode: json.contacts.main.address.zipCode,
              },
              email: json.contacts.main.email,
              id: json.contacts.main.id,
              jobTitle: json.contacts.main.jobTitle,
              name: [
                json.contacts.main.firstName,
                json.contacts.main.lastName,
              ].join(" "),
              phoneNumber: json.contacts.main.phoneNumber,
            },
            id: siteId,
            images: json.images,
            title: json.title,
          };

          expect(resp).toEqual(site);
          done();
        });
      });
    });

    describe("#listSites", () => {
      beforeEach(() => {
        httpClientMock.get = jest.fn(() =>
          of({
            body: LIST_SITES_RESPONSE,
            header: {},
            status: 200,
          } as HttpResponse)
        );
      });

      test("resquest", () => {
        client.listSites();

        expect(httpClientMock.get).toHaveBeenCalledWith({
          url: `${host}/sites`,
        });
      });

      test("response", (done) => {
        client.listSites().subscribe((resp) => {
          resp.forEach((resp, i) => {
            const json = LIST_SITES_RESPONSE[i];
            const site: SiteData = {
              address: {
                city: json.address.city,
                country: json.address.country,
                state: json.address.state,
                street: json.address.street,
                zipCode: json.address.zipCode,
              },
              contact: {
                address: {
                  city: json.contacts.main.address.city,
                  country: json.contacts.main.address.country,
                  state: json.contacts.main.address.state,
                  street: json.contacts.main.address.street,
                  zipCode: json.contacts.main.address.zipCode,
                },
                email: json.contacts.main.email,
                id: json.contacts.main.id,
                jobTitle: json.contacts.main.jobTitle,
                name: [
                  json.contacts.main.firstName,
                  json.contacts.main.lastName,
                ].join(" "),
                phoneNumber: json.contacts.main.phoneNumber,
              },
              id: json.id,
              images: json.images,
              title: json.title,
            };

            expect(resp).toEqual(site);
          });

          done();
        });
      });
    });
  });
});
