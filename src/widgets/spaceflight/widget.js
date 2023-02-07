import genericProxyHandler from "utils/proxy/handlers/credentialed";

const widget = {
  api: "https://booster.spaceflight.live/{endpoint}",
  proxyHandler: genericProxyHandler,

  mappings: {
    upcoming: {
      endpoint:
        '?query=query {%0A%20 launches(%0A%20%20%20 limit%3A 1%0A%20%20%20 orderBy%3A {field%3A net%2C direction%3A ASC}%0A%20%20%20 filters%3A [{field%3A status%2C operation%3A not%2C value%3A "TBD"}%2C {field%3A net%2C operation%3A gt%2C date%3A "NOW()"}]%0A%20 ) {%0A%20%20%20 name%0A%20%20%20 net%0A%20%20%20 status%0A%20%20%20 vehicle {%0A%20%20%20%20%20 name%0A%20%20%20 }%0A%20 }%0A}%0A',
    },
  },
};

export default widget;
