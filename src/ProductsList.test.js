import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import store from './store';
import ProductsList from './ProductsList';

Enzyme.configure({ adapter: new Adapter() })

describe('ProductsList', () => {
    it('maps store props and actions correctly with initial state', () => {
        const wrapper = shallow(
            <ProductsList store={store} />,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
