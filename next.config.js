/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost']
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg?$/,
      oneOf: [
        {
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                prettier: false,
                svgo: true,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
      ],
    });
    return config;
  },
}


// module.exports = {

//   webpack(config, options) {
//     config.module.rules.push({
//       test: /\.svg?$/,
//       oneOf: [
//         {
//           use: [
//             {
//               loader: '@svgr/webpack',
//               options: {
//                 prettier: false,
//                 svgo: true,
//                 svgoConfig: {
//                   plugins: [{ removeViewBox: false }],
//                 },
//                 titleProp: true,
//               },
//             },
//           ],
//           issuer: {
//             and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
//           },
//         },
//       ],
//     });
//     return config;
//   },
// };