import { Private } from './util'

describe('transformObject', () => {
  it('should transform object with nested keys', () => {
    const obj = {
      'parent.child': 'value',
      'parent.anotherChild': 'anotherValue',
      singleKey: 'singleValue'
    }

    const expected = {
      parent: {
        child: 'value',
        anotherChild: 'anotherValue'
      },
      singleKey: 'singleValue'
    }

    const result = Private.InputTranslator.nestDotKeys(obj)

    expect(result).toEqual(expected)
  })

  it('should return the same object if there are no nested keys', () => {
    const obj = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    }

    const result = Private.InputTranslator.nestDotKeys(obj)

    expect(result).toEqual(obj)
  })
})
