import chai from 'chai';
import chaiHttp from 'chai-http';
import {versionServer} from './version.server';
import * as packageVersion from '../../../package.json';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Version Server', () => {
    it('should exist', () => {
        expect(versionServer).exist;
    });

    it('should return current version', () => {
       return chai.request(versionServer).get('/version')
           .then(res => {
              chai.expect(res.text).to.eql(packageVersion.version);
           });
    });
});