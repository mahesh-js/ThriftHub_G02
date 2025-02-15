/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cloud.appwrite.io', // Appwrite storage domain
                pathname: '**', // Allows all paths under cloud.appwrite.io
            },
        ],
    },
};
export default nextConfig;
import Image from 'next/image';

<Image
    src="https://cloud.appwrite.io/v1/storage/buckets/{bucketId}/files/{fileId}/view?project={projectId}"
    alt="Product Image"
    width={300}
    height={200}
/>