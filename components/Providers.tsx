"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import { store } from "@/store";

const client = new QueryClient();

const Providers = ({ children }: { children: Readonly<React.ReactNode> }) => {
	return (
		<QueryClientProvider client={client}>
			<Provider store={store}>{children}</Provider>
		</QueryClientProvider>
	);
};

export default Providers;
