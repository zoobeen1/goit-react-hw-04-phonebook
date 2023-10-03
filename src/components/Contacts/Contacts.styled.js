import { Box } from '../common';

export const List = ({ children, ...props }) => {
  return (
    <Box {...props} as="ul" p="0px">
      {children}
    </Box>
  );
};
export const ListItem = ({ children }) => {
  return (
    <Box
      as="li"
      display="flex"
      justifyContent="space-between"
      fontWeight="500"
      mb="3px"
      p="3px"
      background="#e0e0e0e8"
      borderRadius="normal"
    >
      {children}
    </Box>
  );
};
