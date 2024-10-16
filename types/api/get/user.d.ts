interface GetUserDataResponse {
  'data': {
    'id': number,
    'username': string,
    'avatar': {
      'filename': string,
      'url': string
    },
    'last_online_at': string,
    'teams': [],
    'permissions': {
      'id': number,
      'name': string
    }[],
    'roles': [],
    'metadata': {
      'auth_domains': {
        '1': string | null,
        '2': string | null,
        '3': string | null,
        '4': string | null,
        '5': string | null
      }
    }
  }
}
