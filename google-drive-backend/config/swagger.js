// Extended: https://swagger.io/specification/#infoObject
module.exports = {
  swaggerDefinition: {
    info: {
      // API informations (required)
      title: 'ImageKit API', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'Assignment APIs', // Description (optional)
      contact: {
        name: 'Shubham Jain',
        email: 'er.sjain28@gmail.com',
      },
      servers: ['http://localhost:3000'],
    },
    schemes: ['http', 'https'],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },

  // API Routes Path
  apis: ['./controller/**/docs/*.js'],
};
