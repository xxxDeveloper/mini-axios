import cookie from '../../src/helpers/cookie';

describe('helpers:cookie', () => {
  test('should read cookies', () => {
    document.cookie = 'name=xxx'
    expect(cookie.read('name')).toBe('xxx')
  })

  test('should return null if cookie name is not exist', () => {
    document.cookie = 'name=xxx'
    expect(cookie.read('xxx')).toBeNull()
  })
})
