
import { test, expect, APIRequestContext } from '@playwright/test';

const API_BASE_URL = 'https://simple-books-api.click';

let api: APIRequestContext;
let accessToken: string;
let orderId: string;
let bookId: number;

test.beforeAll(async ({ playwright }) => {
  api = await playwright.request.newContext({
    baseURL: API_BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  });
});

test.afterAll(async () => {
  await api.dispose();
});

test.describe.serial('Simple Books API Automation', () => {

 
  test('GET - Verify API status', async () => {
    const response = await api.get('/status');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.status).toBe('OK');
  });

 
  test('GET - Retrieve books', async () => {
    const response = await api.get('/books', {
      params: {
        type: 'fiction',
        limit: 10,
      },
    });

    expect(response.status()).toBe(200);

    const books: {
      id: number;
      available: boolean;
      name: string;
    }[] = await response.json();

    expect(books.length).toBeGreaterThan(0);

    const selectedBook = books.find(
      (book) => book.available
    );

    expect(selectedBook).toBeDefined();

    if (!selectedBook) {
      throw new Error('No available book found');
    }

    bookId = selectedBook.id;
  });

  
  test('GET - Retrieve a single book', async () => {
    const response = await api.get(`/books/${bookId}`);

    expect(response.status()).toBe(200);

    const book = await response.json();

    expect(book.id).toBe(bookId);
    expect(book.name).toBeTruthy();
  });

 
  test('POST - Register API client', async () => {
    const clientEmail =
      `playwright_${Date.now()}@example.com`;

    const response = await api.post('/api-clients/', {
      data: {
        clientName: 'Playwright Automation',
        clientEmail,
      },
    });

    expect(response.status()).toBe(201);

    const body: { accessToken: string } =
      await response.json();

    expect(body.accessToken).toBeTruthy();

    accessToken = body.accessToken;
  });

  
  test('POST - Reject order without token', async () => {
    const response = await api.post('/orders', {
      data: {
        bookId,
        customerName: 'Test User',
      },
    });

    expect(response.status()).toBe(401);
  });

 
  test('POST - Submit a book order', async () => {
    const response = await api.post('/orders', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        bookId,
        customerName: 'Playwright Test User',
      },
    });

    expect(response.status()).toBe(201);

    const body: { orderId: string } =
      await response.json();

    expect(body.orderId).toBeTruthy();

    orderId = body.orderId;
  });

 
  test('GET - Retrieve all orders', async () => {
    const response = await api.get('/orders', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.status()).toBe(200);

    const orders: {
      id: string;
      bookId: number;
      customerName: string;
    }[] = await response.json();

    expect(Array.isArray(orders)).toBeTruthy();

    const createdOrder = orders.find(
      (order) => order.id === orderId
    );

    expect(createdOrder).toBeDefined();
  });

 
  test('GET - Verify order details', async () => {
    const response = await api.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.status()).toBe(200);

    const order = await response.json();

    expect(order.id).toBe(orderId);
    expect(order.bookId).toBe(bookId);
    expect(order.customerName).toBe('Playwright Test User');
  });

  
  test('PATCH - Update order details', async () => {
    const response = await api.patch(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        customerName: 'Updated Playwright User',
      },
    });

    expect(response.status()).toBe(204);
  });

  
  test('GET - Verify updated order', async () => {
    const response = await api.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.status()).toBe(200);

    const order = await response.json();

    expect(order.customerName).toBe('Updated Playwright User');
  });

 
  test('DELETE - Delete order', async () => {
    const response = await api.delete(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.status()).toBe(204);
  });

  // GET: Verify deleted order
  test('GET - Verify deleted order returns 404', async () => {
    const response = await api.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    expect(response.status()).toBe(404);
  });
});
