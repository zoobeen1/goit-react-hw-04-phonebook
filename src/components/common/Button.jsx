import { Box } from '.';
import PropTypes from 'prop-types';
export const Button = ({ children, ...props }) => {
  return (
    <Box
      as="button"
      mt={2}
      bg="button_color"
      color="light_text"
      border="normal"
      borderRadius="normal"
      px={3}
      py={2}
      {...props}
    >
      {children}
    </Box>
  );
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
};
