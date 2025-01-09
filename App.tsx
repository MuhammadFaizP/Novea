import React, { useState } from "react";
import { BottomNavigation, Provider as PaperProvider } from "react-native-paper";
import LottieView from "lottie-react-native";
import MemberHome from "./screens/Home";
import Profile from "./screens/Profile";
import Settings from "./screens/Detail";
import theme from "./screens/Theme";

type RenderIconProps = {
  route: {
    key: string;
    title: string;
    icon: any;
  };
  focused: boolean;
};

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "home", title: "Home", icon: require("./screens/lottie/home.json") },
    { key: "profile", title: "Profile", icon: require("./screens/lottie/profile.json") },
    { key: "settings", title: "Detail", icon: require("./screens/lottie/detail.json") },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: MemberHome,
    profile: Profile,
    settings: Settings,
  });

  const renderIcon = ({ route, focused }: RenderIconProps) => (
    <LottieView
      source={route.icon}
      autoPlay={focused}
      loop={focused}
      style={{ width: 30, height: 30 }}
    />
  );

  return (
    <PaperProvider theme={theme}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderIcon={renderIcon}
        barStyle={{ backgroundColor: "#eaeaea" }}
      />
    </PaperProvider>
  );
};

export default App;