import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import { Provider as ArmadaProvider } from "./src/context/ArmadaContext";
import { Provider as FleetProvider } from "./src/context/FleetContext";
import { Provider as AdmiralProvider } from "./src/context/AdmiralContext";
import IndexScreen from "./src/screens/IndexScreen";
import SpaceDockScreen from "./src/screens/SpaceDockScreen";
import FleetCreateScreen from "./src/screens/FleetCreateScreen";
import FleetDetailScreen from "./src/screens/FleetDetailScreen";
import BattleScreen from "./src/screens/BattleScreen";

import AdmiralHeader from "./src/components/AdmiralHeader";

const navigator = createStackNavigator({
  Index: IndexScreen,
  SpaceDock: SpaceDockScreen,
  FleetCreate: FleetCreateScreen,
  FleetDetail: FleetDetailScreen,
  Battle: BattleScreen,
},
{
  initialRouteName: "Index",
  defaultNavigationOptions: ({navigation}) => {
    const {routeName} = navigation.state;
    return {
      title: "Holographic Display",
      // have admiralheader only display on routes that are not named "Index"
      headerTitle: () => ( routeName !== "Index" ? <AdmiralHeader /> : null ),
    }
  }
}
);

const App = createAppContainer(navigator);

export default () => {
  return <AdmiralProvider>
    <ArmadaProvider>
      <FleetProvider>
        <App />
      </FleetProvider>
    </ArmadaProvider>
  </AdmiralProvider>
}