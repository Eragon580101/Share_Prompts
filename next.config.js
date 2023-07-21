/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };
    Object.assign(config.resolve.alias, {
      "@mongodb-js/zstd": false,
      "@aws-sdk/credential-providers": false,
      snappy: false,
      aws4: false,
      "mongodb-client-encryption": false,
      kerberos: false,
      "supports-color": false,
    });
    return config;
  },
};

module.exports = nextConfig;
