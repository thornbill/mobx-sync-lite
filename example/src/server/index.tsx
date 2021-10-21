import Fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import { config } from 'mobx-sync-lite';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from '../shared/App';
import { RootStore } from '../shared/store';

// Note: this is required to override ignore decorators for some important
// store node/field when you render template by use JSON.stringify.
config({ ssr: true });

const fastify = Fastify({
  logger: {
    prettyPrint: true,
  },
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../client'),
});

fastify.get('/', function (request, reply) {
  const store = new RootStore();

  reply.type('text/html; charset=utf-8').send(`<!doctype html>
<html>
<body>
<div id="root">${renderToStaticMarkup(<App />)}</div>
<script>
// this is the initial state will be loaded by trunk
var __INITIAL_STATE__ = ${JSON.stringify(store)}
</script>
<script src="/index.js"></script>
</body>
</html>`);
});

fastify.listen(process.env.PORT || 3000, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
