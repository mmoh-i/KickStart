import * as user from '../user';

describe('user handler', () => {
    it('should return a user profile', async () => {
        const req = {body: {username: 'hope', password: 'hi'}};
        const res = {json({token}) {
            expect(token).toBeTruthy();
        }};

        await user.createNewUser(req, res);
    }) 
})