import { useAuth } from "@clerk/clerk-expo"
import { Redirect } from "expo-router"
import 'react-native-get-random-values';



function Home() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/(root)/(tabs)/home'} />
  }
  return <Redirect href="/(auth)/welcome"/>
  
}

export default Home
