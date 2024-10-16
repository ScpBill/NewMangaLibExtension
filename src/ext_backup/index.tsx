import React from 'react';
import { waitForDOMLoading } from '../utils';
import { createRoot } from 'react-dom/client';
import DownloadSVG from '../svgs/download.svg';
import HistorySVG from '../svgs/history.svg';
// import { getRandomValues } from 'crypto';


function convertData(response: GetCollectionDataResponse | undefined = undefined): string {
  const data = response?.data ?? collection_data!.data;
  return JSON.stringify({
    'type': data.type,
    'description': data.description,
    'name': data.name,
    'blocks': data.blocks.map((block) => ({
      // 'uuid': getRandomValues(new Uint8Array(16)).toString(),
      'uuid': block.uuid,
      'name': block.name,
      'items': block.items.map((item, index) => ({
        'item_id': item.ited_id,
        'item_type': item.item_type,
        'comment': item.comment,
        'order': index+1,
      })),
    })),
    'interactive': data.interactive,
    'private': false,
    'spoiler': data.spoiler,
    'adult': data.adult,
    'attachments': data.attachments.map((attachment) => ({
      'name': attachment.name,
      'extension': attachment.extension,
    })),
  });
}


async function generateCollectionsBlob(): Promise<Blob> {
  const data = [];
  for (let offset = 1; ; offset += 1) {
    const response_list = await (await fetch(`https://api.mangalib.me/api/collections?page=${offset}&sort_by=newest&sort_type=desc&subscriptions=0&user_id=${user_data!.id}`)).json() as GetCollectionsDataResponse;
    for (const collection of response_list.data) {
      const response_item = await (await fetch(`https://api.mangalib.me/api/collections/${collection.id}`)).json() as GetCollectionDataResponse;
      data.push(convertData(response_item));
    }
    if (!response_list.links.next) break;
  }
  return new Blob([`{"data":[${data.join(',')}]}`]);
}


let collection_data: GetCollectionDataResponse | undefined;
let user_data: { username: string, id: number } | undefined;
let collections_blob: Blob | undefined;


waitForDOMLoading().then(() => {
  mainObserver.observe(document, { childList: true, subtree: true });
});


window.addEventListener('UrlChange', () => {
  if (/^\/ru\/collections\/\d+/.test(document.location.pathname)) {
    waitForDOMLoading().then(() => {
      collectionObserver.observe(document, { childList: true, subtree: true });
    });
  }
  collectionObserver.disconnect();
});

window.addEventListener('ApiResponseLoaded', async (event: Event) => {
  if (event instanceof CustomEvent && event.detail.type === 'url') {
    if (/^https:\/\/api.mangalib.me\/api\/collections\/\d+$/.test(event.detail.url.toString())) {
      collection_data = event.detail.response as GetCollectionDataResponse;
    }
    if (/^https:\/\/api.mangalib.me\/api\/auth\/me$/.test(event.detail.url.toString())) {
      user_data = (event.detail.response as GetUserDataResponse).data;
      collections_blob = await generateCollectionsBlob();
    }
  }
});


const mainObserver = new MutationObserver(async (mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.type !== 'childList') continue;
    for (const node of mutation.addedNodes) {

      // Check that is needed node
      if (!(node instanceof Element && node.className.includes('dropdown-menu'))) continue;
      if (node.querySelector('div > div.menu-list > a.menu-item > div.menu-item__text > div > span')?.textContent !== 'Мой профиль ') continue;

      if (!user_data) {
        user_data = JSON.parse(localStorage.getItem('auth')!)['auth'];
        collections_blob = await generateCollectionsBlob();
      }

      const mainContainer = Array.from(node.querySelectorAll('div > div.menu')).at(-1)!;
      const menuContainer = document.createElement('div');
      menuContainer.setAttribute('class', 'menu');
      const container = document.createElement('div');
      container.setAttribute('class', 'menu-list');
      const divider = document.createElement('div');
      divider.setAttribute('class', 'divider is-default');
      divider.setAttribute('style', 'margin: 0px;');
      const importCollection = document.createElement('div');
      importCollection.setAttribute('class', 'menu-item');
      const exportCollection = document.createElement('a');
      exportCollection.setAttribute('class', 'menu-item');
      exportCollection.setAttribute('download', `Коллекции пользователя «${user_data!.username.replace(/[/\\?%*:|"<>]/g, '-')}».json`);
      exportCollection.setAttribute('href', URL.createObjectURL(collections_blob!));
      container.appendChild(divider);
      // container.appendChild(importCollection);
      container.appendChild(exportCollection);
      menuContainer.appendChild(container);
      mainContainer.before(menuContainer);
      mainContainer.before(divider);

      const rootImportCollection = createRoot(importCollection);
      rootImportCollection.render(
        <>
          <HistorySVG/>
          <div className='menu-item__text'>
            Загрузить коллекции
          </div>
        </>,
      );

      const rootExportCollection = createRoot(exportCollection);
      rootExportCollection.render(
        <>
          <DownloadSVG/>
          <div className='menu-item__text'>
            Скачать коллекции
          </div>
        </>,
      );
    }
  }
});


const collectionObserver = new MutationObserver((mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.type !== 'childList') continue;
    for (const node of mutation.addedNodes) {

      // Check that is needed node
      if (!(node instanceof Element && node.className.includes('dropdown-menu'))) continue;
      if (node.querySelector('div.menu > div.menu-list > div.menu-item > div.menu-item__text')?.textContent !== 'Взять за основу') continue;

      const blob = new Blob([convertData()], { type: 'text/plain' });
      const container = node.querySelector('div.menu-list')!;
      const divider = document.createElement('div');
      divider.setAttribute('class', 'divider is-default');
      divider.setAttribute('style', 'margin: 0px;');
      const menu_item = document.createElement('a');
      menu_item.setAttribute('class', 'menu-item');
      menu_item.setAttribute('download', `Коллекция «${collection_data!.data.name.replace(/[/\\?%*:|"<>]/g, '-')}».json`);
      menu_item.setAttribute('href', URL.createObjectURL(blob));
      container.appendChild(divider);
      container.appendChild(menu_item);

      // Render component
      const root = createRoot(menu_item);
      root.render(
        <>
          <DownloadSVG/>
          <div className='menu-item__text'>
            Скачать
          </div>
        </>,
      );
    }
  }
});
