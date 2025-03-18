import { ScrollView } from "react-native";
import "../global.css";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout() {
	return (
		<SafeAreaView className="bg-white">
			<StatusBar style="dark" />
			<ScrollView className="min-h-screen mx-5">
				<QueryClientProvider client={queryClient}>
					<Slot />
				</QueryClientProvider>
			</ScrollView>
		</SafeAreaView>
	);
}
