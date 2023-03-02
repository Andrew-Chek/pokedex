import { IdPipe } from './id.pipe';

describe('IdPipe', () => {
  let idPipe: IdPipe;
  beforeEach(() => {
    idPipe = new IdPipe();
  })
  it('transform id with length 1 as expected', () => {
    const newId = idPipe.transform(1);
    expect(newId).toEqual('001');
  })

  it('transform id with length 2 as expected', () => {
    const newId = idPipe.transform(12);
    expect(newId).toEqual('012');
  })

  it('transform id with length 3 as expected', () => {
    const newId = idPipe.transform(100);
    expect(newId).toEqual('100');
  })
});
