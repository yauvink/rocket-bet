
import { keyframes } from '@chakra-ui/react';

const velocityKeyFrames = keyframes`
0% { background-position: center bottom; }
50% { background-position: center center; }
100% { background-position: center top; }
`;

const flyingKeyFrames = keyframes`
0% { background-position: center 50%; }
50% { background-position: center 80%; }
100% { background-position: center 50%; }
`;

export const velocityAnimation = `${velocityKeyFrames} 0.5s linear 0s infinite normal forwards`;
export const flyingAnimation = `${flyingKeyFrames} 1s ease-in-out 0s infinite normal`;
