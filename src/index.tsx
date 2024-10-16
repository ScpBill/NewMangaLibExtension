const Data = {
  lastEpisodeId: null,
  lastEpisodeData: null,
  lastAnimeSlugUrl: null,
  lastAnimeEpisodes: null,
};


export class Api {
  getEpisodeDataById(id: number) {
    if (Data.lastEpisodeId === id) {
      return Data.lastEpisodeData;
    }
  }
  getAnimeEpisodesBySlugUrl(slug_url: string) {
    if (Data.lastAnimeSlugUrl === slug_url) {
      return Data.lastAnimeEpisodes;
    }
  }
}


(function (history) {
  const pushState = history.pushState;
  const replaceState = history.replaceState;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history.pushState = function (data: any, unused: string, url?: string | URL | null) {
    pushState.call(history, data, unused, url);
    window.dispatchEvent(new Event('UrlChange'));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history.replaceState = function (data: any, unused: string, url?: string | URL | null | undefined) {
    replaceState.call(history, data, unused, url);
    window.dispatchEvent(new Event('UrlChange'));
  };
})(window.history);


(function () {
  const open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (
    this: XMLHttpRequest,
    method: string,
    url: string | URL,
    async: boolean = true,
    username?: string | null,
    password?: string | null,
  ) {
    if (/^https:\/\/api\.mangalib\.me\/api\/?/.test(url.toString())) {
      this.addEventListener('readystatechange', function () {
        if (this.readyState !== 4) return;
        window.dispatchEvent(new CustomEvent('ApiResponseLoaded', { detail: { type: 'url', url, response: this.response } }));
      });
    }
    open.call(this, method, url, async, username, password);
  };
})();
