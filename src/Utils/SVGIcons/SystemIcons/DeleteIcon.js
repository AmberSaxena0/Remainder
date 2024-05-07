import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export default DeleteIcon = props => {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M1 4.375h18M6.625 1h6.75M16.75 4.375H3.25V19h13.5V4.375z"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
