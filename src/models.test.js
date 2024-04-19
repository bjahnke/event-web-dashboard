import { jest } from '@jest/globals'
import { JSDOM } from 'jsdom'
import { InputHandler } from './models'

describe('InputHandler', () => {
  let doc

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><div id="input1"></div><div id="input2"></div>')
    doc = dom.window.document
  })

  describe('updateModel', () => {
    it('should fetch input values and create a new InputHandler instance', () => {
      const expectedModel = { input1: 'value1', input2: 'value2' }
      const initialModel = { input1: '', input2: '' }

      doc.getElementById = jest.fn().mockImplementation((id) => {
        if (id === 'input1') {
          return { value: 'value1' }
        } else if (id === 'input2') {
          return { value: 'value2' }
        }
      })

      const handler = new InputHandler(doc, initialModel)
      const actualModel = handler.updateModel()

      expect(actualModel).toEqual(expectedModel)
    })
  })
})
