import QUERY from './query';
import MUTATION from './mutation';

// Map your functions to http events here
const RESOURCE_MAP = {
  ...QUERY,
  ...MUTATION,
};

const formatResult = (r) => {
  // Assign "pk" as "id" to match GraphQL schema
  let result = r;
  if (!result.id && result.pk) {
    result.id = result.pk;
  }

  // For arrays, check all pk's
  if (typeof result === 'object' && result.length) {
    result = result.map((i) => {
      if (!i.id && i.pk) {
        i.id = i.pk;
      }
      return i;
    });
  }

  return r;
};

// eslint-disable-next-line import/prefer-default-export
export async function request(event) {
  return Promise.resolve()
    .then(async () => {
      if (event.field && typeof RESOURCE_MAP[event.field] !== 'undefined') {
        console.log('PROCESSING EVENT', event.field);
        console.log(event);
        const resource = RESOURCE_MAP[event.field];

        const result = formatResult(await resource(event));

        console.log('RETURNING', result);
        return result;
      }
      console.log('UNKNOWN EVENT', event);
      return [];
    });
}

