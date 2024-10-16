interface GetCollectionDataResponse {
  'data': {
    'id': number,
    'model': 'collection',
    'name': string,  // Название коллекции
    'description': {
      'type': 'doc',
      'content':  (blockquote | paragpaph | image | orderedList | bulletList)[]
    },
    'attachments': {
      'filename': string,  // file code with extension
      'name': string,  // file code
      'extension': string,
      'width': number,
      'height': number,
      'url': string  // /uploads/collections{collection_id}/{filename}
    }[],
    'type': 'titles' | 'character' | 'peaple',
    'views': number,
    'favorites_count': number,
    'items_count': number,
    'comments_count': number,
    'votes': {
      'up': number,
      'down': number,
      'user': null | 0 | 1
    },
    'user': {
      'id': number,
      'username': string,
      'avatar': {
        'filename': string,  // file code with extension
        'url': string  // https://cover.imglib.info/uploads/users/{user_id}/{filename}
      },
      'last_online_at': null
    },
    'user_id': number,
    'site_id': 1 | 2 | 3 | 4 | 5,
    'created_at': string,
    'updated_at': string,
    'subscription': {
      'is_subscribed': boolean,
      'source_type': 'collection',
      'source_id': number,  // collection_id
      'relation': null
    },
    'spoiler': boolean,
    'interactive': boolean,
    'adult': boolean,
    'blocks': {
      'collections_id': number,  // collection_id
      'uuid': string,  // code
      'name': string,  // Название группы
      'items': {
        'item_type': 'anime' | 'manga' | 'character' | 'peaple',
        'ited_id': number,
        'comment': string,
        'related': {
          'id': number,  // title_id
          'name': string,
          'rus_name': string | null,
          'eng_name': string | null,
          'slug': string,
          'slug_url': string,
          'cover': {
            'filename': string,
            'thumbnail': string | null,
            'default': string | null,
            'md': string | null
          },
          'ageRestriction': {
            'id': number,
            'label': string
          } | null,
          'site': 1 | 2 | 3 | 4 | 5,
          'type': {
            'id': number,
            'label': string
          } | null,
          'model': 'anime' | 'manga',
          'status': {
            'id': number,
            'label': string
          }
          'releaseDateString': string,
          'shiki_rate': null
        } | {
          'id': number,
          'slug': string,
          'slug_url': string,
          'model': 'people',
          'name': string,
          'rus_name': string,
          'alt_name': string,
          'cover': {
            'filename': string,
            'thumbnail': string | null,
            'default': string | null,
            'md': string | null
          },
          'subscription': {
            'is_subscribed': boolean,
            'source_type': 'people',
            'source_id': number,
            'relation': null
          },
          'confirmed': boolean,
          'user_id': number,
          'titles_count_details': {
            '1': number,
            '2': number,
            '3': number,
            '4': number,
            '5': number
          },
          'stats': {
            'value': number,
            'formatted': string,
            'short': string,
            'label': string,
            'tag': string
          }[]
        } | {
          'id': number,
          'slug': string,
          'slug_url': string,
          'model': 'character',
          'cover': {
            'filename': string,
            'thumbnail': string | null,
            'default': string | null,
            'md': string | null
          },
          'name': string,
          'rus_name': string,
          'subscription': {
            'is_subscribed': boolean,
            'source_type': 'character',
            'source_id': number,
            'relation': null
          }
        }
      }[]
    }[]
  }
}

interface blockquote {
  'type': 'blockquote',
  'content': paragpaph[]
}

interface paragpaph {
  'type': 'paragraph',
  'attrs': {
    'textAlign'?: 'left' | 'center' | 'right'
  },
  'content': (text | hardBreak)[]
}

interface image {
  'type': 'image',
  'attrs': {
    'description': string,
    'images': {
      'image': string
    }[]
  }
}

interface hardBreak {
  'type': 'hardBreak'
}

interface orderedList {
  'type': 'orderedList',
  'attrs': {
    'start': 1
  }
  'content': listItem[]
}

interface bulletList {
  'type': 'bulletList',
  'content': listItem[]
}

interface listItem {
  'type': 'listItem',
  'content': paragpaph[]
}

interface text {
  'type': 'text',
  'marks': (bold | italic | underline | strike)[],
  'text': string
}

interface bold {
  'type': 'bold'
}

interface italic {
  'type': 'italic'
}

interface underline {
  'type': 'underline'
}

interface strike {
  'type': 'strike'
}
