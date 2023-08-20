const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const Item = require('../lib/models/Item');

const testUserOne = {
  email: 'testuser@one.com',
  password: 'testuserone',
};

const testUserTwo = {
  email: 'testuser@two.com',
  password: 'testusertwo',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? testUserOne.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...testUserOne, ...userProps });
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('items routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('POST /api/v1/items creates a new item with the current user id', async () => {
    const [agent, user] = await registerAndLogin();
    const newItem = {
      title: 'Never treadmill while eating an apple again.',
      body: 'self-explanatory',
      completed: false
    };
    const res = await agent.post('/api/v1/items').send(newItem);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      title: newItem.title,
      body: newItem.body,
      completed: newItem.completed,
      user_id: user.id
    });
  });

  test('GET /api/v1/items returns all items associated with the authenticated user', async () => {
    const [agent, user] = await registerAndLogin();
    const userTwo = await UserService.create(testUserTwo);
    const userOneItem = await Item.insertItem({
      title: 'Broken whip',
      body: 'Swing by the auto shop and tell Mitchell the mechanic he really shit the bed the last time I brought in my whip.',
      completed: false,
      user_id: user.id
    });
    await Item.insertItem({
      title: 'Mallrats and sugar',
      body: 'Get to blockbuster before they close them all and rent Mallrats, buy Milk Duds, and grab a root beer for Sadie.',
      completed: false,
      user_id: userTwo.id
    });
    const res = await agent.get('/api/v1/items');
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        id: expect.any(String),
        created_at: expect.any(String),
        title: userOneItem.title,
        body: userOneItem.body,
        completed: userOneItem.completed,
        user_id: user.id
      },
    ]);
  });

  test('GET /api/v1/items should return a 401 if not authenticated', async () => {
    const res = await request(app).get('/api/v1/items');
    expect(res.status).toEqual(401);
  });

  test('UPDATE /api/v1/items/:id should update an item', async () => {
    const [agent, user] = await registerAndLogin();
    const item = await Item.insertItem({
      title: 'Broken whip',
      body: 'Swing by the auto shop and tell Mitchell the mechanic he really shit the bed the last time I brought in my whip.',
      completed: false,
      user_id: user.id,
    });
    const res = await agent.put(`/api/v1/items/${item.id}`).send({ ...item,
      body: 'Swing by the auto shop and tell Mitchell the mechanic he really shit the bed the last time I brought in my car.'
    });
    // expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      title: res.body.title,
      body: 'Swing by the auto shop and tell Mitchell the mechanic he really shit the bed the last time I brought in my car.',
      completed: res.body.completed,
      user_id: user.id
    });
  });

  test('DELETE /api/v1/items/:id should delete items for valid user', async () => {
    const [agent, user] = await registerAndLogin();
    const item = await Item.insertItem({
      created_at: expect.any(String),
      title: 'Broken whip',
      body: 'Swing by the auto shop and tell Mitchell the mechanic he really shit the bed the last time I brought in my whip.',
      completed: true,
      user_id: user.id
    });
    const res = await agent.delete(`/api/v1/items/${item.id}`);
    expect(res.statusCode).toBe(200);
    const check = await Item.getItemById(item.id);
    expect(check).toBeNull();
  });

  afterAll(() => {
    pool.end();
  });
});
