/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Optional: helps catch issues early
    swcMinify: true, // Optional: enables minification with SWC for performance
    webpack(config) {
      // Add a custom Webpack rule to handle SVGs
      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,  // This ensures that only .jsx, .tsx files can import SVGs as components
        use: ['@svgr/webpack'], // Use SVGR for transforming SVGs into React components
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  