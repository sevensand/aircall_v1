export const navigation = {
  navigation: [
    {
      _id: 1,
      path: "/",
      exact: true,
      label: "All Calls"
    },
    {
      _id: 2,
      path: "/archive",
      exact: true,
      label: "All Archive"
    }
  ]

};

export const getNavigation = () => {
  return navigation;
};
