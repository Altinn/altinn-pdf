// Baseurls for platform
export var baseUrls = {
    local: "http://host.docker.internal:5010",
    at21: "https://platform.at21.altinn.cloud",
    at22: "https://platform.at22.altinn.cloud",
    at23: "https://platform.at23.altinn.cloud",
    at24: "https://platform.at24.altinn.cloud",
    yt01: "https://ttd.apps.yt01.altinn.cloud",
  };
  
  //Get values from environment
  const environment = __ENV.env.toLowerCase();
  export let baseUrl = baseUrls[environment] + '/ttd/new-pdf-load-test/api/';
  
