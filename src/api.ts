export const getEndpointUrl = (
  workspaceId: string,
  environment = 'Master',
  endpoint = 'https://api.8base.com',
): string => {
  const baseEndpoint = `${endpoint}/${workspaceId}`;
  if (environment === 'Master') {
    return baseEndpoint;
  }
  return `${baseEndpoint}_${environment}`;
};
