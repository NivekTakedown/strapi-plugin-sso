'use strict';

const path = require('path');
const fs = require('fs');

module.exports = async ({ strapi }) => {
  // Registro de acciones para permisos
  const actions = [
    {
      section: 'plugins',
      displayName: 'Read',
      uid: 'read',
      pluginName: 'webunal-login',
    },
  ];
  await strapi.admin.services.permission.actionProvider.registerMany(actions);

  // Servir imágenes estáticas desde la carpeta assets del plugin
  strapi.server.routes([
    {
      method: 'GET',
      path: '/plugins/webunal-login/assets/:file',
      handler: async (ctx) => {
        const filePath = path.join(__dirname, '../admin/src/assets', ctx.params.file);

        // Validar que el archivo existe y tiene una extensión permitida
        if (fs.existsSync(filePath) && filePath.endsWith('.png')) {
          ctx.type = 'image/png';
          ctx.body = fs.createReadStream(filePath);
        } else {
          ctx.status = 404;
          ctx.body = { error: 'File not found' };
        }
      },
      config: {
        auth: false,
      },
    },
  ]);
};
