import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Le mutualisé OVH derrière l'API WordPress répond en 500 sous la charge
	// concurrente des workers de build par défaut : on la limite à 1.
	experimental: {
		cpus: 1,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "chierchia.fr",
			},
			{
				protocol: "https",
				hostname: "content.chierchia.fr",
			},
		],
	},
};

export default nextConfig;
