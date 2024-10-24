import React, { useCallback, useEffect, useRef } from "react";
import { Animated, Easing, Text } from "react-native";

import { AnimatedCircularProgress } from "react-native-circular-progress";

const MIN_TEMP = -25;
const MAX_TEMP = 50;

const ARC_SWEEP_ANGLE = 280;
const ROTATION = ARC_SWEEP_ANGLE / 2 + (360 - ARC_SWEEP_ANGLE);

type CircularProgressProps = {
  progressValue: number;
};

const CircularProgress = ({ progressValue }: CircularProgressProps) => {
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
      arcSweepAngle={ARC_SWEEP_ANGLE}
      rotation={ROTATION}
      size={150}
      width={5}
      padding={10}
      fill={0}
      tintColor="#1db796"
      // tintColorSecondary="#b13c0e"
      lineCap="round"
      backgroundColor="white"
    >
      {() => <Text>{progressValue.toFixed(2)}</Text>}
    </AnimatedCircularProgress>
  );
};

export default CircularProgress;
