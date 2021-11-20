import { getEndpointUrl } from '../api';

test('generates the end point to master correctly:', () => {
  const workspaceId = 'workspaceId';
  const url = getEndpointUrl(workspaceId);
  expect(url).toBe(`https://api.8base.com/${workspaceId}`);
});

test('generates the end point to an environment correctly:', () => {
  const workspaceId = 'workspaceId';
  const environmentName = 'main';
  const url = getEndpointUrl(workspaceId, environmentName);
  expect(url).toBe(`https://api.8base.com/${workspaceId}_${environmentName}`);
});
