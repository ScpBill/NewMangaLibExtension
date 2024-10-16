interface GetCollectionsDataResponse {
  'data': {
    'id': number,
    'model': 'collection',
    'name': string,
    'type': 'titles' | 'character' | 'people',
    'views': number,
    'favorites_count': number,
    'items_count': number,
    'comments_count': number,
    'votes': {
      'up': number,
      'down': number,
      'user': null | 0 | 1
    },
    'user_id': number,
    'site_id': 1 | 2 | 3 | 4 | 5,
    'created_at': string,
    'updated_at': string,
    'spoiler': boolean,
    'interactive': boolean,
    'adult': boolean,
    'previews': {
      'filename': string,
      'thumbnail': string,
      'default': string,
      'md': string
    }[]
  }[],
  'links': {
    'first': string,
    'last': string,
    'prev': string | null,
    'next': string | null
  },
  'meta': {
    'current_page': number,
    'from': number,
    'last_page': number,
    'links': {
      'url': string | null,
      'label': string,
      'active': boolean
    }[],
    'path': string,
    'per_page': number,
    'to': number,
    'total': number
  }
}
