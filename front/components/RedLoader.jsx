import { useEffect } from "react"
import { View, Animated} from "react-native"
import { styled } from "nativewind"

const StyledView = styled(View)
const AnimatedView = Animated.createAnimatedComponent(StyledView)

const Dot = ({ angle, color }) => {
  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start()
  }, [animation])

  return (
    <AnimatedView
      className={`absolute w-3 h-3 rounded-full ${color}`}
      style={{
        transform: [
          {
            rotate: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "360deg"],
            }),
          },
          { translateX: 20 * Math.cos(angle) },
          { translateY: 20 * Math.sin(angle) },
        ],
      }}
    />
  )
}

const RedLoader = () => {
  const colors = ["bg-red-100", "bg-red-200", "bg-red-300", "bg-red-400", "bg-red-500", "bg-red-600", "bg-red-700", "bg-red-800"];

  return (
    <StyledView className="justify-center items-center">
      {colors.map((color, index) => (
        <Dot key={index} angle={(index * 2 * Math.PI) / 8} color={color} />
      ))}
    </StyledView>
  );
}

export default RedLoader;