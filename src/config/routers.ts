export const routerPath = {
  home: '/',
  organization: {
    index: '/organization',
    name: (userName: string) => `/organization/${userName}`,
  },
};
