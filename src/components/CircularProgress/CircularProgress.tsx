import React, { useCallback, useEffect, useRef } from "react";
import { Animated, Easing, Text } from "react-native";

import { AnimatedCircularProgress } from "react-native-circular-progress";

const MIN_TEMP = -40;
const MAX_TEMP = 60;

const CircularProgress = ({ progressValue }: { progressValue: number }) => {
  const progressRef = useRef<AnimatedCircularProgress>(null);

  const animateValue = useCallback((value: number) => {
    const { current } = progressRef;

    if (!current) {
      console.warn("No progress reference");

      return;
    }

    current.animate(value, 500, Easing.quad);
  }, []);

  useEffect(() => {
    const animatedValue = new Animated.Value(progressValue);
    const interpolatedValue = animatedValue.interpolate({
      inputRange: [MIN_TEMP, MAX_TEMP],
      outputRange: [0, 100],
    });

    animateValue(interpolatedValue.__getValue());
  }, [animateValue, progressValue]);

  return (
    <AnimatedCircularProgress
      ref={progressRef}
      size={150}
      width={5}
      backgroundWidth={15}
      padding={10}
      fill={0}
      tintColor="turquoise"
      tintColorSecondary="#c93103"
      lineCap="round"
      backgroundColor="#211eaa"
      arcSweepAngle={300}
      rotation={210}
    >
      {(fill) => <Text>{Math.round(fill)}</Text>}
    </AnimatedCircularProgress>
  );
};

export default CircularProgress;
