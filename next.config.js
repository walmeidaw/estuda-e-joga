/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            { hostname: 'wdc-icon-generator.s3.amazonaws.com' },
            { hostname: 'myday24.gumlet.io' }
        ]
    }
}

module.exports = nextConfig
