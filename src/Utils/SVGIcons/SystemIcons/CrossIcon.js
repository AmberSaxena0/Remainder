import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const CrossIcon = props => {
  return (
    <Svg
      width={50}
      height={50}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M16.95 7.05l-9.9 9.9M7.05 7.05l9.9 9.9"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CrossIcon;
