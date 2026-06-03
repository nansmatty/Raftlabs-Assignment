import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'narayan-general-bucket.s3.ap-south-1.amazonaws.com',
				port: '',
				pathname: '/raftlabs-assignment/**',
			},
		],
	},
};

export default nextConfig;
