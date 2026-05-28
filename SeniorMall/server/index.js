import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';
import cartRouter from './routes/cart.js';
import ordersRouter from './routes/orders.js';
import usersRouter from './routes/users.js';
import aiChatRouter from './routes/aiChat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const PORT = Number(process.env.PORT || 3001);

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '2mb' }));

// Static serving for multer uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);
app.use('/api/ai/chat', aiChatRouter);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: '요청한 리소스를 찾을 수 없습니다.', code: 'NOT_FOUND' });
});

// Global error handler — unifies `{ error, code }` shape
app.use((err, _req, res, _next) => {
  // express-validator already returns 400 from routes; this catches throws
  const status = err.status || err.statusCode || 500;
  const code = err.code || (status === 500 ? 'INTERNAL_ERROR' : 'ERROR');
  const message = err.publicMessage || err.message || '서버 오류가 발생했습니다.';

  if (status >= 500) {
    // eslint-disable-next-line no-console
    console.error('[error]', err);
  }

  res.status(status).json({ error: message, code });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[seniormall] API listening on http://localhost:${PORT}`);
});
