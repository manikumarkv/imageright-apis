import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';
import {
  addNoteContainer,
  addNoteItem,
  getNotes,
  lockNote,
  setNoteAsDefault,
} from '../../imageright/api/notes';
import { createMockedApi } from '../helpers';

describe('notes API', () => {
  let api: AxiosInstance;
  let mock: MockAdapter;

  beforeEach(() => {
    ({ api, mock } = createMockedApi());
  });

  afterEach(() => mock.reset());

  it('addNoteContainer: POST api/objects/:oid/notes/:category', async () => {
    mock.onPost('api/objects/o-1/notes/general').reply(201, {});

    await addNoteContainer(api, 'o-1', 'general');

    expect(mock.history.post[0].url).toBe('api/objects/o-1/notes/general');
  });

  it('addNoteItem: POST api/objects/:oid/notes with toJSON() body', async () => {
    mock.onPost('api/objects/o-1/notes').reply(201, {});

    const note = { toJSON: () => ({ Text: 'hi' }) };
    await addNoteItem(api, 'o-1', note);

    expect(mock.history.post[0].url).toBe('api/objects/o-1/notes');
    expect(JSON.parse(mock.history.post[0].data)).toEqual({ Text: 'hi' });
  });

  it('getNotes: GET api/objects/:oid/notes/:category with no options', async () => {
    mock.onGet('api/objects/o-1/notes/general').reply(200, []);

    await getNotes(api, 'o-1', 'general');

    expect(mock.history.get[0].url).toBe('api/objects/o-1/notes/general');
  });

  it('getNotes: GET with status, includeHidden, includeDeleted query params', async () => {
    const url = 'api/objects/o-1/notes/general?status=active&includeHidden=true&includeDeleted=true';
    mock.onGet(url).reply(200, []);

    await getNotes(api, 'o-1', 'general', 'active', true, true);

    expect(mock.history.get[0].url).toBe(url);
  });

  it('lockNote: POST api/objects/:oid/notes/:category/lock?version=N', async () => {
    mock.onPost('api/objects/o-1/notes/general/lock?version=3').reply(200, {});

    await lockNote(api, 'o-1', 'general', 3);

    expect(mock.history.post[0].url).toBe('api/objects/o-1/notes/general/lock?version=3');
  });

  it('setNoteAsDefault: POST api/objects/:oid/notes/:cat/:collId/setasdefault', async () => {
    mock.onPost('api/objects/o-1/notes/general/col-1/setasdefault').reply(200, {});

    await setNoteAsDefault(api, 'o-1', 'general', 'col-1');

    expect(mock.history.post[0].url).toBe('api/objects/o-1/notes/general/col-1/setasdefault');
  });
});
