import { IsUniqueEmail } from './is-unique-email';

describe('IsUniqueEmail', () => {
  it('should create an instance', () => {
    const directive = new IsUniqueEmail();
    expect(directive).toBeTruthy();
  });
});
