import { helloWorld } from '../../../src/core/helloWorld';
describe('helloWorld', () => {
    it('Should return de phrase "Hello world!"', () => {
        const result = helloWorld();
        expect(result).toBe('Hello world!');
    });
});
