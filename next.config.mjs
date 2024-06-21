/** @type {import('next').NextConfig} */
const nextConfig = {
    // https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
    output: 'standalone',
    // NOTE: to enable static only next.js hosting set the
    // `output` value above to 'export'
};

export default nextConfig;
