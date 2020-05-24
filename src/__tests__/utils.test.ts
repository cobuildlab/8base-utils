import { getMessageFromGraphQLError } from '../utils';

describe('getMessageFromGraphQLError', () => {
  it('should return the message if found in the graphql error', () => {
    const errorBody = `
      The following Graph QL Error occurred {
         "message": "Boom something exploded"
      }
    `;
    const error = new Error(errorBody);
    const message = getMessageFromGraphQLError(error);
    expect(message).toBe('Boom something exploded');
  });

  it('should return the raw message if found in the graphql error', () => {
    const errorBody = `
      The following Graph QL Error occurred {
         "raw": {
            "message": "this exploded"
         }
      }
    `;
    const error = new Error(errorBody);
    const message = getMessageFromGraphQLError(error);
    expect(message).toBe('this exploded');
  });

  it('should return the error message if no graphql message was found', () => {
    const errorBody = `Boom!! Oh no`;
    const error = new Error(errorBody);
    const message = getMessageFromGraphQLError(error);
    expect(message).toBe('Boom!! Oh no');
  });
});
