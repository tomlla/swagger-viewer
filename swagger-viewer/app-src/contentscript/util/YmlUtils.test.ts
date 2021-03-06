import { convertToObject } from "./YmlUtils"

describe("convertToObject", () => {
  it("null", () => {
    // ## Arrange ##
    const src = null
    // ## Act ##
    const result = convertToObject(src as any)
    // ## Assert ##
    expect(result).toMatchInlineSnapshot(`null`)
  })

  it("empty string", () => {
    // ## Arrange ##
    const src = ``
    // ## Act ##
    const result = convertToObject(src)
    // ## Assert ##
    expect(result).toMatchInlineSnapshot(`null`)
  })

  it("no swagger string", () => {
    // ## Arrange ##
    const src = `any string literal`
    // ## Act ##
    const result = convertToObject(src)
    // ## Assert ##
    expect(result).toMatchInlineSnapshot(`null`)
  })

  it("yaml string", () => {
    // ## Arrange ##
    const src = `
swagger: "2.0"
info:
  title: Simple API overview
paths:
  /:
    get:
      operationId: listVersionsv2
      produces:
      - application/json
      responses:
        "200":
          description: |-
            200 300 response
consumes:
- application/json
`
    // ## Act ##
    const result = convertToObject(src)
    // ## Assert ##
    expect(result).toMatchInlineSnapshot(`
      Object {
        "consumes": Array [
          "application/json",
        ],
        "info": Object {
          "title": "Simple API overview",
        },
        "paths": Object {
          "/": Object {
            "get": Object {
              "operationId": "listVersionsv2",
              "produces": Array [
                "application/json",
              ],
              "responses": Object {
                "200": Object {
                  "description": "200 300 response",
                },
              },
            },
          },
        },
        "swagger": "2.0",
      }
    `)
  })

  it("json string", () => {
    // ## Arrange ##
    const src = `
{
  "a": "a",
  "b": 2,
  "cc": null,
}
`
    // ## Act ##
    const result = convertToObject(src)
    // ## Assert ##
    expect(result).toMatchInlineSnapshot(`
      Object {
        "a": "a",
        "b": 2,
        "cc": null,
      }
    `)
  })
})
